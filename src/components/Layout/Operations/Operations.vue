<template>
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
            <el-dropdown-item @click.native="openDialog('primitive', 'add')">
              添加普通资源</el-dropdown-item
            >
            <el-dropdown-item @click.native="openDialog('group', 'add')">
              添加组资源</el-dropdown-item
            >
            <el-dropdown-item @click.native="openDialog('clone', 'add')">
              添加克隆资源</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button
        @click="openDialog('edit', 'edit')"
        id="edit"
        class="operations"
        :disabled="showEdit"
      >
        <i class="iconfont icon-bianji2"></i>
        编辑
      </el-button>
      <el-button
        :disabled="showStart"
        @click="operate('start')"
        id="start"
        class="operations"
      >
        <i class="iconfont icon-kaishi"></i>
        启动
      </el-button>
      <el-button
        :disabled="showButtons"
        @click="operate('stop')"
        id="stop"
        class="operations"
      >
        <i class="iconfont icon-tingzhi1"></i>
        停止
      </el-button>
      <el-button
        :disabled="showButtons"
        @click="operate('cleanup')"
        id="cleanup"
        class="operations"
      >
        <i class="iconfont icon-yijianqingli"></i>
        清理
      </el-button>
      <el-button
        :disabled="showMigrate"
        @click="operate('migrate')"
        id="migrate"
        class="operations"
      >
        <i class="iconfont icon-qianchu"></i>
        迁移
      </el-button>
      <el-button
        :disabled="showUnmigrate"
        @click="operate('unmigrate')"
        id="unmigrate"
        class="operations"
      >
        <i class="iconfont icon-qianru"></i>
        回迁
      </el-button>
      <el-popconfirm @confirm="deleteItem" title="确定删除资源吗？">
        <template #reference>
          <el-button :disabled="showButtons" class="operations">
            <i class="iconfont icon-shanchukai"></i>
            删除
          </el-button>
        </template>
      </el-popconfirm>
      <el-dropdown>
        <el-button :disabled="showButtons" class="el-dropdown-link operations">
          <i class="iconfont icon-guanxitu"></i>
          关系
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span @click="handleClickRelation('location')">资源位置</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleClickRelation('colocation')">资源协同</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleClickRelation('order')">资源顺序</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button
        class="operations"
        @click.native="getResources"
      >
        <i class="iconfont icon-shuaxin"></i>
        刷新
      </el-button>
    </el-row>
    <dialogs ref="ezDialog" @refresh="getResources"></dialogs>

    <!-- migrate -->
    <el-dialog
      title="迁移资源"
      :visible.sync="disableMigrateDialog"
      width="600px"
      top="15vh"
      class="location"
      :before-close="resetMigrate"
    >
      <el-form :model="migrate" label-width="160px">
        <el-form-item label="资源名称:">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item label="迁移至节点:">
          <el-select v-model="migrate.to_node">
            <el-option
              v-for="item in nodeLists"
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
          <el-input style="width: 56%" v-model="migrate.period">
            <template slot="append">小时</template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetMigrate">取 消</el-button>
          <el-button type="primary" @click="updateMigrate">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- location -->
    <el-dialog
      title="资源位置"
      :visible.sync="rscLocationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscLocation" label-width="160px">
        <el-form-item label="资源名称:">
          <span class="block">{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item
          v-for="(node, level) in rscLocation"
          :key="level"
          :label="level"
        >
          <el-select
            v-model="rscLocation[level]"
            multiple
            @change="handleLocationChange($event)"
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
          <el-button @click="rscLocationVisible = false">取 消</el-button>
          <el-button type="primary" @click="locates">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- colocation -->
    <el-dialog
      title="资源协同"
      :visible.sync="rscColocationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscColocation" label-width="160px">
        <el-form-item label="资源名称:">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item label="同节点资源:">
          <el-select
            v-model="rscColocation.same_node"
            multiple
            @change="handleCOChange($event)"
            @remove-tag="handleCORemoveTag"
          >
            <el-option
              v-for="item in resources_id"
              :key="item.id"
              :label="item.id"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="互斥节点资源:">
          <el-select
            v-model="rscColocation.diff_node"
            multiple
            @change="handleCOChange($event)"
            @remove-tag="handleCORemoveTag"
          >
            <el-option
              v-for="item in resources_id"
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
          <el-button @click="rscColocationVisible = false">取 消</el-button>
          <el-button type="primary" @click="coordination">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- order -->
    <el-dialog
      title="资源顺序"
      :visible.sync="rscOrderVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscOrder" label-width="160px">
        <el-form-item label="资源名称:">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item label="前置资源:">
          <el-select
            v-model="rscOrder.before_rscs"
            multiple
            @change="handleCOChange($event)"
            @remove-tag="handleCORemoveTag"
          >
            <el-option
              v-for="item in resources_id"
              :key="item.id"
              :label="item.id"
              :value="item.id"
              :disabled="item.disabled"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后置资源:">
          <el-select
            v-model="rscOrder.after_rscs"
            multiple
            @change="handleCOChange($event)"
            @remove-tag="handleCORemoveTag"
          >
            <el-option
              v-for="item in resources_id"
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
          <el-button @click="rscOrderVisible = false">取 消</el-button>
          <el-button type="primary" @click="orders">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  easyRequest,
  updateMigrates,
  updateUnmigrates,
  deleteItems,
  getResourceRelation,
  updateLocations,
  updateOrder,
  updateCoordination,
} from "@/api/homeTable";
import Dialogs from "@/components/Dialogs/Dialogs";
export default {
  props: ["nodeLists"],
  data() {
    return {
      disableDialog: false,
      disableMigrateDialog: false,
      chosenItem: {},
      migrate: {
        is_force: false,
        period: "",
        to_node: "",
      },
      resources_id: [],
      rscLocationVisible: false,
      rscColocationVisible: false,
      rscOrderVisible: false,
      rscLocation: {},
      rscColocation: {},
      rscOrder: {},
      nodeList: [],
    };
  },
  computed: {
    showEdit() {
      return !this.$store.state.itemChose;
    },
    showStart() {
      if (this.chosenItem.id && this.chosenItem.status !== "Running") {
        return false;
      } else {
        return true;
      }
    },
    showButtons() {
      if (this.chosenItem.id) {
        return false;
      } else {
        return true;
      }
    },
    showMigrate() {
      if (
        this.chosenItem &&
        this.chosenItem.status == "Running" &&
        this.chosenItem.type !== "clone"
      ) {
        return false;
      } else {
        return true;
      }
    },
    showUnmigrate() {
      if (
        this.chosenItem &&
        this.chosenItem.status == "Running" &&
        this.chosenItem.type !== "clone" &&
        this.chosenItem.allow_unmigrate
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  components: {
    Dialogs,
  },
  created() {},
  methods: {
    getNodeList() {
      let _this = this;
      _this.nodeList = JSON.parse(JSON.stringify(_this.nodeLists));
      console.log(_this.nodeList);
      this.$forceUpdate();
    },
    handleClickRelation(str) {
      let _this = this;
      _this.getNodeList();
      //判断传来的值是否与tableData的id相同，相同置为disabled
      function getSelectChildrenData(data) {
        _this.resources_id = [];
        for (const item of _this.$store.state.rscs) {
          if (item.id == data.rsc_id) {
            continue;
          }
          _this.resources_id.push({
            id: item.id,
          });
        }
        for (const key in data) {
          if (key == "rsc_id" || data[key].length == 0) continue;
          for (let i in data[key]) {
            for (const j in _this.resources_id) {
              if (i == _this.resources_id[j].id) {
                _this.resources_id[j].disabled = true;
              }
            }
          }
        }
      }

      let url = "/resources/" + _this.chosenItem.id + "/relations/" + str;

      getResourceRelation(url).then((res) => {
        switch (str) {
          case "colocation":
            _this.rscColocation = res.data.data;
            getSelectChildrenData(_this.rscColocation);
            // _this.rscColocation = colocation;
            _this.rscColocationVisible = true;
            break;
          case "order":
            _this.rscOrder = res.data.data;
            //  if(_this.rscOrder){           getSelectChildrenData(_this.rscOrder);}
            _this.rscOrderVisible = true;
            break;
          default:
            let key = "";
            for (let item in _this.nodeList) {
              if (item === "0") {
                key = "Master Node";
              } else {
                key = `Slave ${item}`;
              }
              _this.rscLocation[key] = [];
            }
            //将从接口获取到的值赋给rscLocation
            if (res.data.node_level) {
              res.data.node_level.map((item) => {
                for (const key in _this.rscLocation) {
                  if (item.level === key) {
                    _this.rscLocation[key].push(item.node);
                  }
                }
                //循环遍历node是否与nodeList的id相同，相同则置nodeList为disable
                for (const i in _this.nodeList) {
                  if (item.node === _this.nodeList[i].id) {
                    _this.nodeList[i].disabled = true;
                  }
                }
              });
            }

            _this.rscLocationVisible = true;
            break;
        }
      });
    },
    openDialog(type, action) {
      this.$refs.ezDialog.handleDialogOpen(type, action);
    },
    getResources() {
      this.$emit("refreshData");
    },
    handleOperation(data) {
      this.chosenItem = {};
      this.chosenItem = data;
    },
    operate(action) {
      let _this = this;
      if (action == "migrate") {
        _this.disableMigrateDialog = true;
      } else {
        let req = "/resources/" + this.chosenItem.id + "/" + action;
        easyRequest(req).then(() => {
          this.$message({
            type: "success",
            message: "resource" + action + "success",
          });
        });
      }
    },
    updateMigrate() {
      let _this = this;
      let url = "/resources/" + _this.chosenItem.id + "/migrate";
      updateMigrates(url, _this.migrate).then(() => {
        _this.disableMigrateDialog = false;
        _this.getResources();
        this.$message({
          type: "success",
          message: "resource migrate success",
        });
      });
    },
    updateUnmigrate() {
      let _this = this;
      let url = "/resources/" + _this.chosenItem.id + "/unmigrate";
      updateUnmigrates(url).then(() => {
        _this.disableMigrateDialog = false;
        _this.getResources();
        this.$message({
          type: "success",
          message: "resource unmigrate success",
        });
      });
    },
    deleteItem() {
      let _this = this;
      let url = "/resources/" + _this.chosenItem.id + "/delete";
      deleteItems(url).then(() => {
        _this.getResources();
        this.$message({
          type: "success",
          message: "resource delete success",
        });
      });
    },
    handleLocationChange(node) {
      let arr = [...node];

      for (let i in arr) {
        for (let j in this.nodeList) {
          if (arr[i] == this.nodeList[j].id) {
            this.nodeList[j].disabled = true;
          }
        }
      }

      this.$forceUpdate(); //必须要有强制更新，必然检测不到选中的值
    },
    handleCOChange(option) {
      let arr = [...option];

      for (let i in arr) {
        for (let j in this.resources_id) {
          if (arr[i] == this.resources_id[j].id) {
            this.resources_id[j].disabled = true;
          }
        }
      }
    },
    handleLocationRemoveTag(option) {
      for (let i in this.nodeList) {
        if (option == this.nodeList[i].id) {
          this.nodeList[i].disabled = false;
        }
      }
    },
    handleCORemoveTag(option) {
      for (let i in this.resources_id) {
        if (option == this.resources_id[i].id) {
          this.resources_id[i].disabled = false;
        }
      }
    },
    locates() {
      let _this = this;
      let location = {};
      location.node_level = [];
      location.rsc_id = _this.chosenItem.id;

      for (const key in _this.rscLocation) {
        location[key] = _this.rscLocation[key];
        if (_this.rscLocation[key].length == 0) {
          continue
        } else if(_this.rscLocation[key].length >= 1) {
          location.node_level.push({
            level: key,
            node: _this.rscLocation[key],
          });
        } else {

        }
      }

      let url = "/resources/" + _this.chosenItem.id + "/location";
      updateLocations(url, location).then(() => {
        _this.rscLocationVisible = false;
        _this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    coordination() {
      let _this = this;
      let url = "/resources/" + _this.chosenItem.id + "/colocation";
      updateCoordination(url, _this.rscColocation).then(() => {
        _this.rscColocationVisible = false;
        _this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    orders() {
      let _this = this;
      let url = "/resources/" + _this.chosenItem.id + "/order";
      updateOrder(url, _this.rscOrder).then(() => {
        _this.rscOrderVisible = false;
        _this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    deleteMetaTag(value) {
      let _this = this;
      delete _this.addForm.meta_attributes[value];
    },
    deleteInsTag(value) {
      let _this = this;
      console.log(_this.addForm.instance_attributes);
      delete _this.addForm.instance_attributes[value];
      console.log(_this.addForm.instance_attributes);
    },
    reset() {
      this.nodeList = [];
    },
    resetMigrate() {
      this.migrate = {
        is_force: false,
        period: "",
        to_node: "",
      };
     this.disableMigrateDialog = false
    },
  },
};
</script>

<style lang="scss">
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
</style>