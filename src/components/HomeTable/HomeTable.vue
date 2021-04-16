+<template>
  <div class="data-operate">
    <div class="button-group">
      <el-row>
        <!-- add -->
        <el-dropdown>
          <el-button class="el-dropdown-link operations" style="float='left'"
            >添加</el-button
          >
          <template #dropdown>
            <el-dropdown-menu placement="bottom-end">
              <el-dropdown-item @click.native="openAddDialog"
                >添加普通资源</el-dropdown-item
              >
              <el-dropdown-item @click.native="openGroupDialog"
                >添加组资源</el-dropdown-item
              >
              <el-dropdown-item @click.native="openClongDialog"
                >添加克隆资源</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- operations -->
        <div class="easy-operation">
          <el-button
            :disabled="showEdit"
            @click="operate('edit', radio)"
            id="edit"
            class="operations"
            >编辑
          </el-button>
          <el-button
            :disabled="showButtons && showme"
            @click="operate('start', radio)"
            id="start"
            class="operations"
            >启动
          </el-button>
          <el-button
            :disabled="showButtons && showme"
            @click="operate('stop', radio)"
            id="stop"
            class="operations"
            >停止
          </el-button>
          <el-button
            :disabled="showButtons"
            @click="operate('cleanup', radio)"
            id="cleanup"
            class="operations"
            >清理
          </el-button>
          <el-button
            :disabled="true"
            @click="operate('migrate', radio)"
            id="migrate"
            class="operations"
            >迁移
          </el-button>
          <el-button
            :disabled="true"
            @click="operate('unmigrate', radio)"
            id="unmigrate"
            class="operations"
            >回迁
          </el-button>
        </div>

        <!-- <el-dialog
          title="编辑资源"
          :visible.sync="disableEditDialog"
          width="650px"
          :modal-append-to-body="false"
        >
          <el-tabs v-if="chosenSrc" v-model="activeName">
            <el-tab-pane label="基本" name="first">
              <el-form ref="form" :model="editForm" class="edit-panel">
                <el-form-item label="资源名称">
                  <el-input
                    size="mini"
                    disabled
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="device">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="directory">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="fstype">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="组内资源">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
                <el-form-item label="克隆对象">
                  <el-input
                    size="mini"
                    v-if="chosenSrc.id"
                    v-model="chosenSrc.id"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="元属性" name="second">
              <el-form ref="form" :model="form">
                <el-form-item>
                  <el-switch
                    v-model="backupHeartBeat"
                    inactive-text="启用备用心跳"
                  >
                  </el-switch>
                </el-form-item>
                <el-form-item label="节点心跳IP-ns187:">
                  <el-input
                    :disabled="!backupHeartBeat"
                    v-model="form.hbaddrs2[0].ip"
                  ></el-input>
                </el-form-item>
                <el-form-item label="节点心跳IP-ns188:">
                  <el-input
                    :disabled="!backupHeartBeat"
                    v-model="form.hbaddrs2[1].ip"
                  ></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="disableEditDialog = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
          </span>
        </el-dialog> -->

        <!-- delete -->
        <el-popconfirm title="确定删除资源吗？">
          <template #reference>
            <el-button :disabled="showButtons" class="operations"
              >删除</el-button
            >
          </template>
        </el-popconfirm>

        <!-- relations -->
        <el-dropdown>
          <el-button :disabled="showButtons" class="el-dropdown-link operations"
            >关系</el-button
          >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <span @click="locationVisible = true">资源位置</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="colocationVisible = true">资源协同</span>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="orderVisible = true">资源顺序</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="operations" style="float: right" @click="dataLoading"
          >刷新</el-button
        >
      </el-row>
    </div>

    <!-- main table -->
    <el-table
      :data="tableData"
      row-key="id"
      :tree-props="{ children: 'subrscs', hasChildren: 'hasChildren' }"
      :header-cell-style="{ 'background-color': '#fafafa' }"
      :row-style="{ height: '60px' }"
      ref="singleTable"
      highlight-current-row
      @row-click="showRow"
      height="750"
    >
      <el-table-column width="40"> </el-table-column>
      <el-table-column label="选择" width="60">
        <template slot-scope="scope">
          <el-radio class="radio" v-model="radio" :label="scope.row.id">
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column sortable prop="id" label="资源名"> </el-table-column>
      <el-table-column sortable prop="status" label="状态">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="scope.row.status"
            placement="top"
          >
            <span><i class="iconfont icon-zhuangtai">&#xe7df;</i></span>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="type" label="资源类型"> </el-table-column>
      <el-table-column sortable prop="svc" label="服务"> </el-table-column>
      <template v-for="(item, index) in nodeList">
        <el-table-column :key="index">
          <template #header>
            <el-tooltip
              class="item"
              effect="dark"
              :content="item.status"
              placement="top"
            >
              <span>&#xe7df;</span>
            </el-tooltip>

            <span>{{ item.id }}</span>
          </template>
          <template slot-scope="scope">
            <template v-for="count in scope.row.running_node.length">
              {{
                scope.row.running_node[count - 1] == item.id
                  ? scope.row.running_node[count - 1]
                  : ""
              }}
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- dialogs -->
    <!-- basic add -->
    <el-dialog
      class="basicAddDialog"
      title="创建资源"
      :visible.sync="disableAddDialog"
      width="30%"
    >
      <el-form v-model="addForm" :rules="addingRules" ref="addForm">
        <el-tabs class="button-tabs">
          <el-tab-pane class="tab-panels" label="基本">
            <div>
              <el-form-item label="资源名称" prop="name">
                <!-- <span class="labels"> 资源名称： </span> -->
                <span>
                  <el-input class="block" v-model="addForm.name"></el-input>
                </span>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="资源类型" prop="type">
                <!-- <span class="labels"> 资源类型： </span> -->
                <span>
                  <el-cascader
                    class="cascader dropdowns selections"
                    v-model="addForm.type"
                    :options="metas"
                    :props="{ expandTrigger: 'hover' }"
                    @change="addRscSelected"
                  ></el-cascader>
                </span>
              </el-form-item>
            </div>
            <div v-show="addForm.type" class="invi-panels">
              <!-- <div class="panel-contents"> -->
              <!-- <span class="labels"> device: </span> -->
              <el-form-item label="device" prop="device">
                <el-input v-model="addForm.device" class="block"></el-input>
              </el-form-item>
              <!-- </div>
              <div class="panel-contents"> -->
              <el-form-item label="directory" prop="directory">
                <!-- <span class="labels"> directory: </span> -->
                <el-input class="block" v-model="addForm.directory"></el-input>
              </el-form-item>
              <!-- </div> -->
              <!-- <div class="panel-contents"> -->
              <el-form-item label="fstype" prop="fstype">
                <!-- <span class="labels"> fstype: </span> -->
                <el-input class="block" v-model="addForm.fstype"></el-input>
                <!-- </div> -->
              </el-form-item>
            </div>
          </el-tab-pane>

          <el-tab-pane class="tab-panels" v-if="addForm.type" label="实例属性">
            <div>
              <span class="labels"> 需要修改的实例属性： </span>
              <span class="block" v-if="metaAttris">
                <el-select
                  v-model="addForm.instanceAttris"
                  multiple
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    v-for="item in instanceAttris"
                    :key="item.key"
                    :label="item.key"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </span>
            </div>
          </el-tab-pane>

          <el-tab-pane class="tab-panels" label="元属性">
            <div>
              需要修改的元属性：
              <span class="block" v-if="metaAttris">
                <el-select
                  v-model="addForm.metaAttris"
                  multiple
                  placeholder="请选择"
                  @change="setMetaAttris"
                >
                  <el-option
                    v-for="item in metaAttris"
                    :key="item.key"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </span>
            </div>
            <!-- <div v-if="addForm.metaAttris"> -->
            <div v-for="item in addForm.metaAttris" :key="item.key">
              <span>{{ metaAttris[item].name }}</span>
              <span>
                <el-input></el-input>
              </span>
            </div>
            <!-- </div> -->
          </el-tab-pane>

          <el-tab-pane class="tab-panels" v-if="addForm.type" label="操作属性">
            <div>
              需要修改的操作属性：
              <span class="block" v-if="metaAttris">
                <el-select
                  v-model="addForm.operationAttris"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in operationAttris"
                    :key="item.key"
                    :label="item.key"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </span>
            </div>
          </el-tab-pane>
          <span class="hometable-dialog-footer">
            <el-button @click="disableAddDialog = false">取 消</el-button>
            <el-button type="primary" @click="disableAddDialog = false"
              >确 定</el-button
            >
          </span>
        </el-tabs>
      </el-form>
    </el-dialog>

    <!-- group add -->
    <el-dialog
      class="basicAddDialog"
      title="创建资源"
      :visible.sync="disableGroupAddDialog"
      width="40%"
    >
      <el-tabs class="button-tabs">
        <el-tab-pane class="tab-panels" label="基本">
          <div class="panel-contents">
            <span class="labels"> 资源名称： </span>
            <span class="block">
              <el-input v-model="addForm.name"></el-input>
            </span>
          </div>
          <div class="panel-contents">
            <span class="labels"> 资源类型： </span>
            <span class="block">
              <el-cascader
                v-model="addForm.type"
                :options="metas"
                :props="{ expandTrigger: 'hover' }"
                @change="addRscSelected"
              ></el-cascader>
            </span>
          </div>
        </el-tab-pane>

        <el-tab-pane class="tab-panels" label="元属性">
          <div>
            需要修改的元属性：
            <span class="block" v-if="metaAttris">
              <el-select
                v-model="addForm.metaAttris"
                multiple
                placeholder="请选择"
                @change="setMetaAttris"
              >
                <el-option
                  v-for="item in metaAttris"
                  :key="item.key"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <!-- <div v-if="addForm.metaAttris"> -->
          <div v-for="item in addForm.metaAttris" :key="item.key">
            <span>{{ metaAttris[item].name }}</span>
            <span>
              <el-input></el-input>
            </span>
          </div>
          <!-- </div> -->
        </el-tab-pane>

        <span class="hometable-dialog-footer">
          <el-button @click="disableGroupAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="disableGroupAddDialog = false"
            >确 定</el-button
          >
        </span>
      </el-tabs>
    </el-dialog>

    <!-- clone add -->
    <el-dialog
      class="basicAddDialog"
      title="创建资源"
      :visible.sync="disableCloneDialog"
      width="40%"
    >
      <el-tabs class="button-tabs">
        <el-tab-pane class="tab-panels" label="基本">
          <div class="panel-contents">
            <span class="labels"> 资源名称： </span>
            <span class="block">
              <el-input v-model="addForm.name"></el-input>
            </span>
          </div>
          <div class="panel-contents">
            <span class="labels"> 资源类型： </span>
            <span class="block">
              <el-cascader
                v-model="addForm.type"
                :options="metas"
                :props="{ expandTrigger: 'hover' }"
                @change="addRscSelected"
              ></el-cascader>
            </span>
          </div>
        </el-tab-pane>

        <el-tab-pane class="tab-panels" label="元属性">
          <div>
            需要修改的元属性：
            <span class="block" v-if="metaAttris">
              <el-select
                v-model="addForm.metaAttris"
                multiple
                placeholder="请选择"
                @change="setMetaAttris"
              >
                <el-option
                  v-for="item in metaAttris"
                  :key="item.key"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </span>
          </div>
          <!-- <div v-if="addForm.metaAttris"> -->
          <div v-for="item in addForm.metaAttris" :key="item.key">
            <span>{{ metaAttris[item].name }}</span>
            <span>
              <el-input></el-input>
            </span>
          </div>
          <!-- </div> -->
        </el-tab-pane>

        <span class="hometable-dialog-footer">
          <el-button @click="disableGroupAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="disableGroupAddDialog = false"
            >确 定</el-button
          >
        </span>
      </el-tabs>
    </el-dialog>

    <!-- location -->
    <el-dialog
      title="资源位置"
      :visible.sync="locationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="location" label-width="100px">
        <el-form-item label="资源名称:">
          <span>{{ radio }}</span>
        </el-form-item>
        <el-form-item label="Master Node:">
          <el-select
            v-model="location.masterNode"
            multiple
            @change="handleLocationChange"
            @remove-tag="handleLocationRemoveTag"
          >
            <el-option
              v-for="item in nodeList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Slave 1:">
          <el-select
            v-model="location.slave1"
            multiple
            @change="handleLocationChange"
            @remove-tag="handleLocationRemoveTag"
          >
            <el-option
              v-for="item in nodeList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="locationVisible = false">取 消</el-button>
          <el-button type="primary" @click="locationVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- coordination -->
    <el-dialog
      title="资源位置"
      :visible.sync="colocationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="colocation" label-width="100px">
        <el-form-item label="资源名称:">
          <span>{{ radio }}</span>
        </el-form-item>
        <el-form-item label="同节点资源:">
          <el-select v-model="colocation.same_node" multiple>
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="互斥节点资源:">
          <el-select v-model="colocation.diff_node" multiple>
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="colocationVisible = false">取 消</el-button>
          <el-button type="primary" @click="colocationVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>

    <!-- order -->
    <el-dialog
      title="资源位置"
      :visible.sync="orderVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="order" label-width="100px">
        <el-form-item label="资源名称:">
          <span>{{ radio }}</span>
        </el-form-item>
        <el-form-item label="前置资源:">
          <el-select v-model="order.before_rscs" multiple>
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后置资源:">
          <el-select v-model="order.after_rscs" multiple>
            <el-option
              v-for="item in tableData"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="orderVisible = false">取 消</el-button>
          <el-button type="primary" @click="orderVisible = false"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getResource,
  getDrdbStatus,
  easyRequest,
  getMetas,
  getMetaAttris,
  getInstanceAttris,
  getOperationAttris,
} from "@/api/homeTable";
import { getNodes } from "@/api/node";
import Vue from "vue";
export default {
  data() {
    return {
      radio: "",
      tableData: [],
      nodeList: [],
      drdbStatus: "",
      disableEditDialog: false,
      disableMigrateDialog: false,
      disableGroupAddDialog: false,
      disableCloneDialog: false,
      chosenSrc: {},
      activeName: "first",
      disableAddDialog: false,
      addForm: {},
      metas: [],
      metaAttris: [],
      operationAttris: [],
      instanceAttris: [],
      addingRules: {
        name: [{ required: true, message: "请输入资源名称", trigger: "blur" }],

        type: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
        device: [{ required: true, message: "请输入device", trigger: "blur" }],
        directory: [
          { required: true, message: "请输入directory", trigger: "blur" },
        ],
        fstype: [{ required: true, message: "请输入fstype", trigger: "blur" }],
      },

      locationVisible: false,
      colocationVisible: false,
      orderVisible: false,
      location: {
        masterNode: [],
        slave1: [],
      },
      colocation: {
        same_node: [],
        diff_node: [],
      },
      order: {
        before_rscs: [],
        after_rscs: [],
      },
      showme:false
    };
  },
  computed: {
    //TODO: specify the conditions of showing each button
    showButtons() {
      let _this = this;
      if (_this.radio) {
        return false;
      } else {
        return true;
      }
    },
    showEdit() {
      let _this = this;
      if (
        !_this.chosenSrc.type ||
        _this.chosenSrc.id == "ms-drbd" ||
        _this.chosenSrc.id == "drbd-ps:0" ||
        _this.chosenSrc.id == "drbd-ps:1"
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    let _this = this;
    this.dataLoading();
  },
  methods: {
    setMetaAttris(value) {
      Vue.set(this.addForm, this.addForm.metaAttris, value);
    },
    showRow(row) {
      let _this = this;
      _this.radio = row.id;
      _this.chosenSrc = row;
    },
    dataLoading() {
      let _this = this;
      getResource().then((res) => {
        _this.tableData = res.data.data;
      }).catch((err)=>{
        console.log('错误');
         console.log(err.response.status)
         if (err.response.status==403) {
           localStorage.removeItem('userLogin');
           this.$router.push({path:'/login'})
         }
      });
      getNodes().then((res) => {
        _this.nodeList = res.data.data;
      });
      getDrdbStatus().then((res) => {
        _this.drdbStatus = res.data.data;
      });
    },
    openAddDialog() {
      let _this = this;
      _this.addForm = {};
      getMetas().then((res) => {
        _this.metas = res.data.data;
        _this.disableAddDialog = true;
      });
      getMetaAttris("primitive").then((res) => {
        _this.metaAttris = res.data.data;
      });
      getInstanceAttris("primitive").then((res) => {
        _this.instanceAttris = res.data.instanceAttris;
      });
      getOperationAttris("primitive").then((res) => {
        _this.operationAttris = res.data.operationAttris;
      });
    },
    openGroupDialog() {
      let _this = this;
      _this.addForm = {};
      getMetas().then((res) => {
        _this.metas = res.data.metas;
        _this.disableGroupAddDialog = true;
      });
      getMetaAttris("group").then((res) => {
        _this.metaAttris = res.data.metaAttris;
      });
      getInstanceAttris().then((res) => {
        _this.instanceAttris = res.data.instanceAttris;
      });
      getOperationAttris().then((res) => {
        _this.operationAttris = res.data.operationAttris;
      });
    },
    openClongDialog() {
      let _this = this;
      _this.addForm = {};
      getMetas().then((res) => {
        _this.metas = res.data.metas;
        _this.disableCloneDialog = true;
      });
      getMetaAttris("clone").then((res) => {
        _this.metaAttris = res.data.metaAttris;
      });
      getInstanceAttris().then((res) => {
        _this.instanceAttris = res.data.instanceAttris;
      });
      getOperationAttris().then((res) => {
        _this.operationAttris = res.data.operationAttris;
      });
    },
    addRscSelected() {
      let _this = this;
      console.log(_this.addForm);
      //todo : update add form
    },
    openDialog(action) {
      let _this = this;
      if (action == "edit") {
        _this.disableEditDialog = true;
        if (_this.chosenSrc.type === "group") {
          getGroupInfo(_this.chosenSrc.id).then((res) => {
            _this.groupInfo = res.data;
          });
        }
      } else {
        _this.disableMigrateDialog = true;
      }
    },
    //operations
    operate(action, radio) {
      let _this = this;
      //todo: transfer into encapsulation model
      let req = "resources/" + radio + "/" + action;
      if (action == "edit" || action == "migrate") {
        _this.openDialog(action);
      } else {
        console.log("ez");
        easyRequest(req).then(() => {
          this.$message({
            type: "success",
            message: "resource" + action + "success",
          });
        });
      }
    },
    // 将选中的node设置为disabled
    handleLocationChange(option) {
      let arr = [...option];
      for (let i in arr) {
        for (let j in this.nodeList) {
          if (arr[i] == this.nodeList[j].id) {
            this.nodeList[j].disabled = true;
          }
        }
      }
    },
    //将移除的node设置为可选
    handleLocationRemoveTag(option) {
      for (let i in this.nodeList) {
        if (option == this.nodeList[i].id) {
          this.nodeList[i].disabled = false;
        }
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.data-operate {
  margin: 20px 10px 0px 0px;
  .el-dialog {
    .button-tabs {
      .tab-panels {
        .block {
          float: right;
          flex: 0 0 auto;
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          width: auto;
          margin-right: 60px;
          .el-input-number.is-controls-right .el-input__inner {
            text-align: left;
          }
        }
        .cascader.dropdowns.selections {
          width: 208px;
          float: right;
          flex: 0 0 auto;
          display: block;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          margin-right: 60px;
        }
        .panel-contents {
          margin-bottom: 5px;
          display: flex;
          justify-content: space-around;
          .labels {
            float: left;
            flex: 0 0 auto;
            display: block;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 20%;
            text-align: end;

            .el-icon-question {
              font-size: 16px;
            }
          }
          .el-input {
            width: 170px;
          }
        }
      }
    }
    .el-input {
      width: auto;
    }

    .hometable-dialog-footer {
      margin-top: 40px;
      display: flex;
      justify-content: center;
    }
  }
  .button-group {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 10px;
    .el-row {
      .el-dropdown {
        float: left;
      }
      .el-button {
        float: left;
        height: 40px;
        margin: 0 10px;
      }
    }
  }
  .location {
    text-align: left;
    .el-form {
      margin-left: 60px;
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
  .el-table {
    .el-table-column {
      color: #2b2b2b;
      background: #ccc;
    }
    .el-table-column th {
      padding: 16px 8px;
    }
  }
}
.edit-panel {
  .el-input {
    width: 200px;
  }
}
</style>