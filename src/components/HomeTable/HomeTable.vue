+<template>
  <div class="data-operate">
    <div class="button-group">
      <el-row>
        <!-- add -->
        <el-dropdown>
          <el-button class="el-dropdown-link operations" style="float='left'">
            <i class="iconfont icon-icon-test"></i>
            添加
          </el-button>
          <template #dropdown>
            <el-dropdown-menu placement="bottom-end">
              <el-dropdown-item @click.native="openAddDialog">
                添加普通资源</el-dropdown-item
              >
              <el-dropdown-item @click.native="openGroupDialog">
                添加组资源</el-dropdown-item
              >
              <el-dropdown-item @click.native="openCloneDialog">
                添加克隆资源</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- operations -->
        <div class="easy-operation">
          <el-button
            :disabled="true"
            @click="operate('edit', radio)"
            id="edit"
            class="operations"
          >
            <i class="iconfont icon-bianji2"></i>
            编辑
          </el-button>
          <el-button
            :disabled="showStart"
            @click="operate('start', radio)"
            id="start"
            class="operations"
          >
            <i class="iconfont icon-kaishi"></i>
            启动
          </el-button>
          <el-button
            :disabled="showButtons"
            @click="operate('stop', radio)"
            id="stop"
            class="operations"
          >
            <i class="iconfont icon-tingzhi1"></i>
            停止
          </el-button>
          <el-button
            :disabled="showButtons"
            @click="operate('cleanup', radio)"
            id="cleanup"
            class="operations"
          >
            <i class="iconfont icon-yijianqingli"></i>
            清理
          </el-button>
          <el-button
            :disabled="showMigrate"
            @click="operate('migrate', radio)"
            id="migrate"
            class="operations"
          >
            <i class="iconfont icon-qianchu"></i>
            迁移
          </el-button>
          <el-button
            :disabled="showUnmigrate"
            @click="operate('unmigrate', radio)"
            id="unmigrate"
            class="operations"
          >
            <i class="iconfont icon-qianru"></i>
            回迁
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
        <el-popconfirm @confirm="deleteItem" title="确定删除资源吗？">
          <template #reference>
            <el-button :disabled="showButtons" class="operations">
              <i class="iconfont icon-shanchukai"></i>
              删除
            </el-button>
          </template>
        </el-popconfirm>

        <!-- relations -->
        <el-dropdown>
          <el-button
            :disabled="showButtons"
            class="el-dropdown-link operations"
          >
            <i class="iconfont icon-guanxitu"></i>
            关系
          </el-button>
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
        <el-button class="operations" style="float: right" @click="dataLoading">
          <i class="iconfont icon-shuaxin"></i>
          刷新
        </el-button>
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
      height="80vh"
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
            :content="
              scope.row.status_message && scope.row.status === 'Not Running'
                ? 'Failed'
                : scope.row.status
            "
            placement="top"
          >
            <i
              class="iconfont icon-B"
              v-if="
                scope.row.status == 'Running' ||
                scope.row.status == 'running(Master)' ||
                scope.row.status == 'running(Slave)'
              "
              style="color: green"
            >
            </i>
            <i
              class="iconfont icon-B"
              v-else-if="scope.row.status == 'Unmanaged'"
              style="color: gold"
            >
            </i>
            <i
              class="iconfont icon-B"
              v-else-if="
                scope.row.status == 'Failed' ||
                scope.row.status == 'Stop Failed' ||
                (scope.row.status == 'Not Running' &&
                  scope.row.status_message != '')
              "
              style="color: red"
            >
            </i>
            <i
              class="iconfont icon-B"
              v-else-if="scope.row.status == 'Not Running'"
              style="color: '#999'"
            >
            </i>
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
              <i
                :style="{ color: item.is_dc ? 'green' : 'red' }"
                class="iconfont icon-host"
              ></i>
            </el-tooltip>
            <span>{{ item.id }}</span>
          </template>

          <template slot-scope="scope" v-if="scope.row.running_node">
            <template v-for="count in scope.row.running_node.length">
              <span
                v-show="scope.row.running_node[count - 1] == item.id"
                :key="count"
                style="color: green"
                class="iconfont icon-B"
              >
              </span>
            </template>

            <template v-for="location in scope.row.location">
              {{ location.node == item.id ? location.level : "" }}
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
      width="46%"
    >
      <el-form
        v-model="addForm"
        :rules="addingRules"
        ref="addForm"
        label-width="200px"
      >
        <el-tabs class="button-tabs">
          <el-tab-pane class="tab-panels" label="基本">
            <el-form-item label="资源名称" prop="id">
              <!-- <span class="labels"> 资源名称： </span> -->.
              {{addForm.id}}
              <el-input class="block" v-model="addForm.id"></el-input>
            </el-form-item>
            <el-form-item label="资源类型" prop="type">
              <!-- <span class="labels"> 资源类型： </span> -->
              <el-cascader
                class="block"
                v-model="addForm.type"
                :options="metas"
                :props="{ expandTrigger: 'hover' }"
                @change="addRscTypeSelected"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane
            class="tab-panels"
            v-if="addForm.type"
            label="实例属性"
            label-width="200px"
          >
            <el-row>
              <span class="modify-label"> 需要修改的实例属性： </span>
              <span class="block" v-if="metaAttris">
                <el-select
                  v-model="instance_attributes"
                  multiple
                  placeholder="请选择"
                  class="block"
                >
                  <!-- -->
                  <el-option
                    v-for="item in instanceAttris"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </span>
            </el-row>
            <div v-if="instance_attributes">
              <div v-for="(item, key) in instance_attributes" :key="key">
                <el-row>
                  <span class="modify-label">{{
                    instance_attributes[key]
                  }}</span>
                  <span>
                    <el-input
                      class="block"
                      v-if="InsTypes[instance_attributes[key]] == 'string'"
                      v-model="
                        addForm.instance_attributes[instance_attributes[key]]
                      "
                      @input="forceUpdate"
                    ></el-input>
                    <el-switch
                      class="block"
                      v-if="InsTypes[instance_attributes[key]] == 'boolean'"
                      v-model="
                        addForm.instance_attributes[instance_attributes[key]]
                      "
                      @input="forceUpdate"
                    ></el-switch>
                    <el-input-number
                      class="block"
                      v-if="InsTypes[instance_attributes[key]] == 'integer'"
                      v-model="
                        addForm.instance_attributes[instance_attributes[key]]
                      "
                      @input="forceUpdate"
                    ></el-input-number>
                  </span>
                </el-row>
              </div>
            </div>
          </el-tab-pane>

          <el-tab-pane class="tab-panels" label="元属性">
            <el-row>
              <label class="modify-label">需要修改的元属性: </label>
              <span v-if="metaAttris">
                <el-select
                  class="block"
                  v-model="meta_attributes"
                  multiple
                  placeholder="请选择"
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
            </el-row>
            <!-- <div v-if="addForm.metaAttris"> -->
            <el-row v-if="meta_attributes">
              <div v-for="(item, key) in meta_attributes" :key="key">
                <el-row>
                  <span class="modify-label">{{ meta_attributes[key] }}</span>
                  <span>
                    <el-input
                      class="block"
                      v-if="metaAttrTypes[meta_attributes[key]] == 'string'"
                      v-model="addForm.meta_attributes[meta_attributes[key]]"
                      @input="forceUpdate"
                    ></el-input>
                    <el-switch
                      class="block"
                      :active-value="true"
                      v-if="metaAttrTypes[meta_attributes[key]] == 'boolean'"
                      v-model="addForm.meta_attributes[meta_attributes[key]]"
                      @input="forceUpdate"
                    ></el-switch>
                    <el-input-number
                      class="block"
                      v-if="metaAttrTypes[meta_attributes[key]] == 'integer'"
                      v-model="addForm.meta_attributes[meta_attributes[key]]"
                      @input="forceUpdate"
                    ></el-input-number>
                  </span>
                </el-row>
              </div>
            </el-row>
            <!-- </div> -->
          </el-tab-pane>

          <el-tab-pane class="tab-panels" v-if="false" label="操作属性">
            <el-row>
              <span class="modify-label">需要修改的操作属性：</span>
              <span class="block" v-if="metaAttris && operationAttris">
                <el-select
                  class="block"
                  v-model="addSelectedAttris.actions"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in operationAttris"
                    :key="item.name"
                    :label="item.name"
                    :value="item"
                    @click.native="setActions(item)"
                  >
                  </el-option>
                </el-select>
              </span>
            </el-row>

            <!-- <el-table :data="addForm.actions">
              <el-table-column prop="name" label="name">
                
              </el-table-column>
              <el-table-column
                prop="interval"
                label="interval"
              ></el-table-column>
              <el-table-column
                prop="start-delay"
                label="start-delay"
              ></el-table-column>
              <el-table-column prop="timeout" label="timeout"></el-table-column>
              <el-table-column prop="role" label="role"></el-table-column>
              <el-table-column prop="on-fail" label="on-fail">
              </el-table-column>
            </el-table> -->
          </el-tab-pane>
          <span class="hometable-dialog-footer">
            <el-button @click="disableAddDialog = false">取 消</el-button>
            <el-button type="primary" @click="addItem">确 定</el-button>
          </span>
        </el-tabs>
      </el-form>
    </el-dialog>

    <!-- group add -->
    <el-dialog
      class="basicAddDialog"
      title="创建资源"
      :visible.sync="disableGroupAddDialog"
      width="46%"
    >
      <el-tabs class="button-tabs">
        <el-tab-pane class="tab-panels" label="基本">
          <el-row>
            <span class="modify-label"> 资源名称:</span>
            <el-input class="block" v-model="addForm.id"></el-input>
          </el-row>
          <el-row>
            <span class="modify-label">组内资源：</span>

            <el-select
              class="block"
              v-model="addForm.rscs"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in noGroup"
                :key="item.key"
                :label="item.id"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-row>
        </el-tab-pane>

        <el-tab-pane class="tab-panels" label="元属性">
          <el-row>
            <label class="modify-label">需要修改的元属性: </label>
            <span v-if="metaAttris">
              <el-select
                class="block"
                v-model="meta_attributes"
                multiple
                placeholder="请选择"
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
          </el-row>
          <!-- <div v-if="addForm.metaAttris"> -->
          <el-row v-if="meta_attributes">
            <div v-for="(item, key) in meta_attributes" :key="key">
              <el-row>
                <span class="modify-label">{{ meta_attributes[key] }}</span>
                <span>
                  <el-input
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'string'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'boolean'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    :active-value="true"
                    @input="forceUpdate"
                  ></el-switch>
                  <el-input-number
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'integer'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input-number>
                  <el-input
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'enum'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                </span>
              </el-row>
            </div>
          </el-row>
          <!-- </div> -->
        </el-tab-pane>

        <span class="hometable-dialog-footer">
          <el-button @click="disableGroupAddDialog = false">取 消</el-button>
          <el-button type="primary" @click="addItem">确 定</el-button>
        </span>
      </el-tabs>
    </el-dialog>

    <!-- clone add -->
    <el-dialog
      class="basicAddDialog"
      title="创建资源"
      :visible.sync="disableCloneDialog"
      width="46%"
    >
      <el-tabs class="button-tabs">
        <el-tab-pane class="tab-panels" label="基本">
          <el-row>
            <span class="modify-label"> 资源名称:</span>
            <el-input class="block" disabled v-model="addForm.id"></el-input>
          </el-row>
          <el-row>
            <span class="modify-label">克隆对象：</span>

            <el-select
              class="block"
              v-model="addForm.rsc_id"
              placeholder="请选择"
              @change="setCloneRscId"
            >
              <el-option
                v-for="item in tableData"
                :key="item.key"
                :label="item.id"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-row>
        </el-tab-pane>

        <el-tab-pane class="tab-panels" label="元属性">
          <el-row>
            <label class="modify-label">需要修改的元属性: </label>
            <span v-if="metaAttris">
              <el-select
                class="block"
                v-model="meta_attributes"
                multiple
                placeholder="请选择"
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
          </el-row>
          <!-- <div v-if="addForm.metaAttris"> -->
          <el-row v-if="meta_attributes">
            <div v-for="(item, key) in meta_attributes" :key="key">
              <el-row>
                <span class="modify-label">{{ meta_attributes[key] }}</span>
                <span>
                  <el-input
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'string'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                  <el-switch
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'boolean'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    :active-value="true"
                    @input="forceUpdate"
                  ></el-switch>
                  <el-input-number
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'integer'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input-number>
                  <el-input
                    class="block"
                    v-if="metaAttrTypes[meta_attributes[key]] == 'enum'"
                    v-model="addForm.meta_attributes[meta_attributes[key]]"
                    @input="forceUpdate"
                  ></el-input>
                </span>
              </el-row>
            </div>
          </el-row>
          <!-- </div> -->
        </el-tab-pane>

        <span class="hometable-dialog-footer">
          <el-button @click="disableCloneDialog = false">取 消</el-button>
          <el-button type="primary" @click="addItem">确 定</el-button>
        </span>
      </el-tabs>
    </el-dialog>
    <!-- migrate  -->
    <el-dialog
      title="迁移资源"
      :visible.sync="disableMigrateDialog"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="migrate" label-width="100px">
        <el-form-item label="资源名称:">
          <span>{{ radio }}</span>
        </el-form-item>
        <el-form-item label="迁移至节点:">
          <el-select v-model="migrate.to_node">
            <el-option
              v-for="item in nodeList"
              :key="item.id"
              :label="item.id"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="强制迁移:">
          <el-switch v-model="migrate.is_force"> </el-switch>
        </el-form-item>
        <el-form-item label="有效期:">
          <el-input v-model="migrate.period">
            <template slot="append">小时</template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="colocationVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateMigrate">确 定</el-button>
        </span>
      </template>
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
          <span class="block">{{ radio }}</span>
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

        <template v-for="(item, index) in nodeList">
          <el-form-item
            :key="index"
            v-show="item.status != 'Master'"
            :label="'Slave' + ' ' + index"
          >
            <el-select
              v-show="index == 1"
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
            <el-select
              v-show="index == 2"
              v-model="location.slave2"
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
        </template>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="locationVisible = false">取 消</el-button>
          <el-button type="primary" @click="locates">确 定</el-button>
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
          <el-button type="primary" @click="coordination"
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
          <el-button type="primary" @click="orders"
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
  // getDrdbStatus,
  easyRequest,
  getMetas,
  getMetaAttris,
  getAttris,
  addItems,
  deleteItems,
  updateMigrates,
  updateUnmigrates,
  updateCoordination,
  updateLocations,
  updateOrder
} from "@/api/homeTable";
import { getNodes } from "@/api/node";
import Vue from "vue";
export default {
  data() {
    return {
      groupForm: {
        id: "",
        category: "group",
        rscs: [],
        instance_attributes: {},
      },
      radio: "",
      tableData: [],
      nodeList: [],
      noGroup: [],
      // drdbStatus: "",
      disableEditDialog: false,
      disableMigrateDialog: false,
      disableGroupAddDialog: false,
      disableCloneDialog: false,
      chosenSrc: {},
      activeName: "first",
      disableAddDialog: false,
      instance_attributes: [],
      meta_attributes: [],
      addForm: {
         id:'',
        meta_attributes: {},
        instance_attributes: {},
      },
      addSelectedAttris: {
        actions: [],
        instance_attributes: [],
      },
      metas: [],
      metaAttris: [],
      operationAttris: [],
      instanceAttris: [],
      addingRules: {
        id: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        // type: [{ required: true, message: "请输入资源类型", trigger: "blur" }],
      },

      locationVisible: false,
      colocationVisible: false,
      orderVisible: false,
      location: {
        masterNode: [],
        slave1: [],
        node_level: [],
      },
      colocation: {
        same_node: [],
        diff_node: [],
      },
      order: {
        before_rscs: [],
        after_rscs: [],
      },
      showme: false,
      InsTypes: {},
      metaAttrTypes: {},
      migrate: {
        is_force: false,
        period: "",
        to_node: "",
      },
    };
  },
  computed: {
    //TODO: specify the conditions of chosenSrc is chlild
    showButtons() {
      let _this = this;
      if (_this.radio) {
        return false;
      } else {
        return true;
      }
    },
    showStart() {
      let _this = this;
      if (_this.chosenSrc && _this.chosenSrc.status !== "Running") {
        return false;
      } else {
        return true;
      }
    },

    showMigrate() {
      let _this = this;
      if (
        _this.chosenSrc &&
        _this.chosenSrc.status == "Running" &&
        _this.chosenSrc.type !== "clone"
      ) {
        return false;
      } else {
        return true;
      }
    },
    showUnmigrate() {
      let _this = this;
      if (
        _this.chosenSrc &&
        _this.chosenSrc.status == "Running" &&
        _this.chosenSrc.type !== "clone" &&
        _this.chosenSrc.allow_unmigrate
      ) {
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
    if (
      localStorage.getItem("refresh") &&
      localStorage.getItem("refresh") !== 0
    ) {
      window.setInterval(() => {
        setTimeout(_this.dataLoading(), 0);
      }, localStorage.getItem("refresh") * 1000);
    }
  },
  watch: {
    instance_attributes: {
      deep: true,
      handler(val, oldVal) {
        let _this = this;
        for (let j = 0; j < val.length; j++) {
          if (
            !_this.addForm.instance_attributes[val[j]] &&
            _this.addForm.instance_attributes[val[j]] !== ""
          ) {
            _this.addForm.instance_attributes[val[j]] = "";
          }
        }
      },
    },
    meta_attributes: {
      deep: true,
      handler(val, oldVal) {
        let _this = this;
        for (let j = 0; j < val.length; j++) {
          if (
            !_this.addForm.meta_attributes[val[j]] &&
            _this.addForm.meta_attributes[val[j]] !== ""
          ) {
            _this.addForm.meta_attributes[val[j]] = "";
          }
        }
      },
    },
  },

  methods: {
    //设置基础添加的元属性
    setCloneRscId(value) {
      let _this = this;
      _this.addForm.id = _this.addForm.rsc_id + "-clone";
    },
    showRow(row) {
      let _this = this;
      _this.radio = row.id;
      _this.chosenSrc = row;
    },
    setActions(value) {
      //  _this.addForm.actions
      // todo:把action转为表格
    },
    dataLoading() {
      let _this = this;

      getResource()
        .then((res) => {
          _this.tableData = res.data.data;
          _this.tableData.forEach((item) => {
            if (!item.subrscs) {
              _this.noGroup.push(item);
            }
          });
        })
        .catch((err) => {
          if (err.response.status == 403) {
            localStorage.removeItem("userLogin");
            this.$router.push({ path: "/login" });
          }
        });
      getNodes().then((res) => {
        _this.nodeList = res.data.data;
      });
      // getDrdbStatus().then((res) => {
      //   _this.drdbStatus = res.data.data;
      // });
    },
    openAddDialog() {
      let _this = this;
      (_this.activeName = "first"),
        (_this.addForm = {
          id:'',
          category: "primitive",
          meta_attributes: {},
          instance_attributes: {},
        });
      _this.InsTypes = {};
      _this.instance_attributes = [];
      _this.meta_attributes = [];
      getMetas().then((res) => {
        _this.metas = res.data.data;
        let types = _this.metas;
        let options = [];
        const toOption = (item) => ({ value: item, label: item });
        Object.keys(types).forEach((key) => {
          let item = {};
          item.value = key;
          item.label = key;
          let value = types[key];
          if (Array.isArray(value)) {
            item.children = value.map(toOption);
          } else {
            let children = [];
            Object.keys(value).forEach((k) => {
              let itemInner = {};
              itemInner.value = k;
              itemInner.label = k;
              let v = value[k];
              if (Array.isArray(v)) {
                itemInner.children = v.map(toOption);
              }
              children.push(itemInner);
            });
            item.children = children;
          }

          options.push(item);
        });
        _this.disableAddDialog = true;
        _this.metas = options;
      });
      getMetaAttris("primitive").then((res) => {
        _this.metaAttris = res.data.data;
        for (let i in _this.metaAttris) {
          _this.metaAttrTypes[_this.metaAttris[i].name] =
            _this.metaAttris[i].content.type;
        }
      });
    },
    openGroupDialog() {
      let _this = this;
      (_this.activeName = "first"),
        (_this.addForm = {
          category: "group",
          meta_attributes: {},
        });
      _this.meta_attributes = [];
      getMetas().then((res) => {
        _this.metas = res.data.metas;
        _this.disableGroupAddDialog = true;
      });
      getMetaAttris("group").then((res) => {
        _this.metaAttris = res.data.data;
        for (let i in _this.metaAttris) {
          _this.metaAttrTypes[_this.metaAttris[i].name] =
            _this.metaAttris[i].content.type;
        }
      });
    },
    openCloneDialog() {
      let _this = this;
      (_this.activeName = "first"),
        (_this.addForm = {
          category: "clone",
          meta_attributes: {},
        });
      _this.meta_attributes = [];
      getMetas().then((res) => {
        _this.metas = res.data.metas;
        _this.disableCloneDialog = true;
      });
      getMetaAttris("clone").then((res) => {
        _this.metaAttris = res.data.data;
        for (let i in _this.metaAttris) {
          _this.metaAttrTypes[_this.metaAttris[i].name] =
            _this.metaAttris[i].content.type;
        }
      });
    },
    // 根据选择的类型请求action和parameters
    addRscTypeSelected(value) {
      let _this = this;
      _this.instanceAttris = [];
      _this.operationAttris = [];
      _this.InsTypes = {};
      _this.instance_attributes = [];
      _this.addForm.instance_attributes = {};
      delete _this.addForm.class;
      delete _this.addForm.provider;
      delete _this.addForm.type;

      if (value) {
        if (value[0]) {
          if (value[2]) {
            let url = "/metas/" + value[0] + "/" + value[2] + "/" + value[1];
            getAttris(url).then((res) => {
              _this.instanceAttris = res.data.data.parameters;
              _this.operationAttris = res.data.data.actions;
              for (let i in _this.instanceAttris) {
                _this.InsTypes[_this.instanceAttris[i].name] =
                  _this.instanceAttris[i].content.type;
              }
            });
            _this.addForm.class = value[0];
            _this.addForm.provider = value[1];
            _this.addForm.type = value[2];
          } else {
            let url = "/metas/" + value[0] + "/" + value[1];
            getAttris(url).then((res) => {
              _this.instanceAttris = res.data.parameters;
              _this.operationAttris = res.data.actions;
              for (let i in _this.instanceAttris) {
                _this.InsTypes[_this.instanceAttris[i].name] =
                  _this.instanceAttris[i].content.type;
              }
              _this.addForm.class = value[0];
              _this.addForm.provider = value[1];
            });
          }
        }
      }

      //todo : update add form
    },
    // 编辑按钮的dialog
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
    forceUpdate() {
      this.$forceUpdate();
    },
    addItem() {
      let _this = this;

      console.log("addForm");
      console.log(_this.addForm);
      for (let i in _this.addForm.instance_attributes) {
        if (_this.addForm.instance_attributes[i] == "")
          _this.addForm.instance_attributes[i] = true;
      }
      for (let i in _this.addForm.meta_attributes) {
        if (_this.addForm.meta_attributes[i] == "")
          _this.addForm.meta_attributes[i] = true;
      }
      addItems(_this.addForm).then((res) => {
        this.$message({
          type: "success",
          message: "resource adding success",
        });
        _this.disableAddDialog = false;
        _this.disableGroupAddDialog = false;
        _this.disableCloneDialog = false;
        _this.dataLoading();
      });
    },
    deleteItem() {
      let _this = this;
      let url = "/resources/" + _this.radio + "/delete";
      deleteItems(url).then(() => {
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "resource delete success",
        });
      });
    },
    updateMigrate() {
      let _this = this;
      _this.disableMigrateDialog = false;
      let url = "/resources/" + _this.radio + "/migrate";
      updateMigrates(url, _this.migrate).then(() => {
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "resource migrate success",
        });
      });
    },
    updateUnmigrate() {
      let _this = this;
      let url = "/resources/" + _this.radio + "/unmigrate";
      updateUnmigrates(url).then(() => {
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "resource unmigrate success",
        });
      });
    },
    locates() {
      let _this = this;
      for (let i in _this.location.masterNode) {
        _this.location.node_level.push({
          level: "Master Node",
          node: _this.location.masterNode[i],
        });
      }
      for (let i in _this.location.slave1) {
        _this.location.node_level.push({
          level: "Slave 1",
          node: _this.location.slave1[i],
        });
      }
      for (let i in _this.location.slave2) {
        _this.location.node_level.push({
          level: "Slave 2",
          node: _this.location.slave2[i],
        });
      }
      let url = "/resources/" + _this.radio + "/location";
      updateLocations(url, _this.location).then(() => {
        _this.locationVisible = false;
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    coordination() {
      let _this = this;
      _this.colocation.rsc_id = _this.radio;
      let url = "/resources/" + _this.radio + "/colocation";
      updateCoordination(url, _this.colocation).then(() => {
        _this.colocationVisible = false;
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    orders() {
      let _this = this;
      _this.order.rsc_id = _this.radio;
      let url = "/resources/" + _this.radio + "/order";
      updateOrder(url, _this.order).then(() => {
        _this.orderVisible = false;
        _this.dataLoading();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
  },
};
</script>

<style scoped lang='scss'>
.data-operate {
  .el-dialog {
    .button-tabs {
      .tab-panels {
        .block {
          float: left;
          width: 260px;
        }
        .el-row {
          margin-bottom: 20px;
        }
        .modify-label {
          float: left;
          line-height: 40px;
          width: 200px;
          text-align: right;
          margin-right: 10px;
        }
        .panel-contents {
          margin-bottom: 5px;
          display: flex;
          justify-content: space-around;
          .labels {
            float: left;
            width: 20%;
            text-align: right;

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
      float: right;
    }
  }
  .button-group {
    border-bottom: 1px solid #e4e4e4;
    padding: 10px;
    background: #fff;
    .el-row {
      .el-dropdown {
        float: left;
      }
      .el-button {
        float: left;
        height: 40px;
        margin: 0 6px;
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