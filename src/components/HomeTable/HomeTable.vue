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
              <el-dropdown-item>添加普通资源</el-dropdown-item>
              <el-dropdown-item>添加组资源</el-dropdown-item>
              <el-dropdown-item>添加克隆资源</el-dropdown-item>
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
            :disabled="showButtons"
            @click="operate('start', radio)"
            id="start"
            class="operations"
            >启动
          </el-button>
          <el-button
            :disabled="showButtons"
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
            :disabled="showButtons"
            @click="operate('migrate', radio)"
            id="migrate"
            class="operations"
            >迁移
          </el-button>
          <el-button
            :disabled="showButtons"
            @click="operate('unmigrate', radio)"
            id="unmigrate"
            class="operations"
            >回迁
          </el-button>
        </div>










































        <el-dialog
          title="编辑资源"
          :visible.sync="disableEditDialog"
          width="650px"
          :modal-append-to-body="false"
        >
          <el-tabs v-if="chosenSrc" v-model="activeName">
            <el-tab-pane label="基本" name="first">
              <el-form ref="form" :model="editForm" class="edit-panel">
                <el-form-item label="资源名称">
                  <el-input size="mini" disabled v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="资源类型">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="device">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="directory">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="fstype">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="组内资源">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
                <el-form-item label="克隆对象">
                  <el-input size="mini"  v-if="chosenSrc.id" v-model="chosenSrc.id"></el-input>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- <el-tab-pane label="元属性" name="second">
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
            </el-tab-pane> -->
          </el-tabs>
          <span slot="footer" class="dialog-footer">
            <el-button @click="disableEditDialog = false">取 消</el-button>
            <el-button type="primary" >确 定</el-button>
          </span>
        </el-dialog>


















































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
              <el-dropdown-item>资源位置</el-dropdown-item>
              <el-dropdown-item>资源协同</el-dropdown-item>
              <el-dropdown-item>资源顺序</el-dropdown-item>
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
            <span>图标</span>
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
              <span>图标</span>
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
  </div>
</template>

<script>
import { getResource, getDrdbStatus, easyRequest } from "@/api/homeTable";
import { getNodes } from "@/api/node";
export default {
  data() {
    return {
      radio: "",
      tableData: [],
      nodeList: [],
      drdbStatus: "",
      disableEditDialog: false,
      disableMigrateDialog: false,
      chosenSrc: {},
      activeName:"first"
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
    showRow(row) {
      let _this = this;
      _this.radio = row.id;
      _this.chosenSrc = row;
      console.log(row);
    },
    dataLoading() {
      let _this = this;
      getResource().then((res) => {
        console.log(res.data);
        _this.tableData = res.data.resource;
      });
      getNodes().then((res) => {
        _this.nodeList = res.data.nodelist;
      });
      getDrdbStatus().then((res) => {
        _this.drdbStatus = res.data.drdbStatus;
      });
    },
    openDialog(action) {
      let _this = this;
      if (action == "edit") {
        _this.disableEditDialog = true;
        if (_this.chosenSrc.type==="group") {
          getGroupInfo(_this.chosenSrc.id).then((res)=>{
            _this.groupInfo=res.data
          })
        }
      } else {
        _this.disableMigrateDialog = true;
      }
    },
    //operations
    operate(action, radio) {
      let _this = this;
      //todo: transfer into encapsulation model
      let req = "/api/v1/haclusters/1/resources/" + radio + "/" + action;
      if (action == "edit" || action == "migrate") {
        _this.openDialog(action);
      } else {
        console.log("ez");
        easyRequest(req);
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.data-operate {
  margin: 20px 10px 0px 0px;

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
.edit-panel{
  .el-input{
    width: 200px;
  }
}
</style>