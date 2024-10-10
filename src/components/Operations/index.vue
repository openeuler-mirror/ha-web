<template>
  <div class="button-group">
    <el-row>
      <!-- add -->
      <el-dropdown>
        <el-button class="el-dropdown-link operations" style="float:'left'">
          <i class="iconfont icon-icon-test"></i>
          {{ $t("operations.add") }}
        </el-button>
        <template #dropdown>
          <el-dropdown-menu placement="bottom-end">
            <el-dropdown-item @click.native="openDialog('primitive', 'add')">
              {{ $t("operations.primitive") }}</el-dropdown-item
            >
            <el-dropdown-item @click.native="openDialog('group', 'add')">
              {{ $t("operations.group") }}</el-dropdown-item
            >
            <el-dropdown-item @click.native="openDialog('clone', 'add')">
              {{ $t("operations.clone") }}</el-dropdown-item
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
        {{ $t("operations.edit") }}
      </el-button>
      <el-button
        :disabled="showStart"
        @click="operate('start')"
        id="start"
        class="operations"
      >
        <i class="iconfont icon-kaishi"></i>
        {{ $t("operations.start") }}
      </el-button>
      <el-button
        :disabled="showButtons"
        @click="operate('stop')"
        id="stop"
        class="operations"
      >
        <i class="iconfont icon-tingzhi1"></i>
        {{ $t("operations.stop") }}
      </el-button>
      <el-button
        :disabled="showButtons"
        @click="operate('cleanup')"
        id="cleanup"
        class="operations"
      >
        <i class="iconfont icon-yijianqingli"></i>
        {{ $t("operations.cleanup") }}
      </el-button>
      <el-button
        :disabled="showMigrate"
        @click="operate('migrate')"
        id="migrate"
        class="operations"
      >
        <i class="iconfont icon-qianchu"></i>
        {{ $t("operations.migrate") }}
      </el-button>
      <el-button
        :disabled="showUnmigrate"
        @click="operate('unmigrate')"
        id="unmigrate"
        class="operations"
      >
        <i class="iconfont icon-qianru"></i>
        {{ $t("operations.unmigrate") }}
      </el-button>
      <el-popconfirm
        :confirm-button-text="$t('common.confirm')"
        :cancel-button-text="$t('common.cancel')"
        @confirm="deleteItem"
        :title="$t('operations.confirmDelete')"
      >
        <template #reference>
          <el-button :disabled="showButtons" class="operations">
            <i class="iconfont icon-shanchukai"></i>
            {{ $t("operations.delete") }}
          </el-button>
        </template>
      </el-popconfirm>
      <el-dropdown>
        <el-button
          :disabled="!(chosenItem.id && chosenItem.type !== 'clone')"
          class="el-dropdown-link operations"
        >
          <i class="iconfont icon-guanxitu"></i>
          {{ $t("operations.relation") }}
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <span @click="handleClickRelation('location')">
                {{ $t("operations.location") }}</span
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleClickRelation('colocation')">
                {{ $t("operations.coop") }}</span
              >
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click="handleClickRelation('order')">
                {{ $t("operations.order") }}</span
              >
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button class="operations" @click.native="getResources">
        <i class="iconfont icon-shuaxin"></i>
        {{ $t("operations.refresh") }}
      </el-button>
    </el-row>
    <dialogs
      ref="ezDialog"
      @refresh="getResources"
      @cleanSelecting="cleanSelets"
    ></dialogs>

    <!-- migrate -->
    <el-dialog
      :title="$t('operations.migrateRsc')"
      :visible.sync="disableMigrateDialog"
      width="600px"
      top="15vh"
      class="location"
      :before-close="resetMigrate"
    >
      <el-form :model="migrate" label-width="160px">
        <el-form-item :label="$t('operations.rscName')">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item :label="$t('operations.toNode')">
          <el-select v-model="migrate.to_node" :no-data-text="$t('operations.noRes')">
            <el-option
              v-for="item in migrateNodes"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('operations.force')">
          <el-switch v-model="migrate.is_force"> </el-switch>
        </el-form-item>
        <el-form-item :label="$t('operations.validity')">
          <el-input style="width: 56%" v-model="migrate.period">
            <template slot="append">{{$t('operations.hour')}}</template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetMigrate">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="updateMigrate">{{$t('common.confirm')}}</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- location -->
    <el-dialog
      :title="$t('operations.location')"
      :visible.sync="rscLocationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscLocation" label-width="160px">
        <el-form-item :label="$t('operations.rscName')">
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
             :placeholder="$t('common.pleaseSelect')"
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
          <el-button @click="rscLocationVisible = false">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="locates">{{$t('common.confirm')}}</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- colocation -->
    <el-dialog
      :title="$t('operations.coop')"
      :visible.sync="rscColocationVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscColocation" label-width="160px">
        <el-form-item :label="$t('operations.rscName')">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item :label="$t('operations.samenode')">
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
        <el-form-item :label="$t('operations.diffnode')">
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
          <el-button @click="rscColocationVisible = false">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="coordination">{{$t('common.confirm')}}</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- order -->
    <el-dialog
      :title="$t('operations.order')"
      :visible.sync="rscOrderVisible"
      width="600px"
      top="15vh"
      class="location"
    >
      <el-form :model="rscOrder" label-width="160px">
        <el-form-item :label="$t('operations.rscName')">
          <span>{{ chosenItem.id }}</span>
        </el-form-item>
        <el-form-item :label="$t('operations.front')">
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
        <el-form-item :label="$t('operations.back')">
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
          <el-button @click="rscOrderVisible = false">{{$t('common.cancel')}}</el-button>
          <el-button type="primary" @click="orders">{{$t('common.confirm')}}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  easyRequest,
  updateMigrates,
  deleteItems,
  getResourceRelation,
  updateLocations,
  updateOrder,
  updateCoordination,
} from "@/api/homeTable";
import Dialogs from "@/views/Dialogs";
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
      migrateNodes: [], //可迁移节点
      resources_id: [], //可选资源id
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
      return !this.chosenItem.id;
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
      this.nodeList = JSON.parse(JSON.stringify(this.nodeLists));
      this.$forceUpdate();
    },
    handleClickRelation(str) {
      this.getNodeList();

      //判断传来的值是否与tableData的id相同，相同置为disabled
      function getSelectChildrenData(data) {
        this.resources_id = [];
        for (const item of this.$store.state.rscs) {
          if (item.id == data.rsc_id || item.type == "clone") {
            continue;
          }
          this.resources_id.push({
            id: item.id,
          });
        }
        for (const key in data) {
          if (key == "rsc_id" || data[key].length == 0) continue;
          for (let i in data[key]) {
            for (const j in this.resources_id) {
              if (data[key][i] == this.resources_id[j].id) {
                this.resources_id[j].disabled = true;
              }
            }
          }
        }
      }

      // let url = "/resources/" + this.chosenItem.id + "/relations/" + str;
      getResourceRelation({ id: this.chosenItem.id, action: str }).then((res) => {
        switch (str) {
          case "colocation":
            this.rscColocation = res.data.data;
            getSelectChildrenData(this.rscColocation);
            // this.rscColocation = colocation;
            this.rscColocationVisible = true;
            break;
          case "order":
            this.rscOrder = res.data.data;
            if (this.rscOrder) {
              getSelectChildrenData(this.rscOrder);
            }
            this.rscOrderVisible = true;
            break;
          default:
            let key = "";
            for (let item in this.nodeList) {
              if (item === "0") {
                key = "Master Node";
              } else {
                key = `Slave ${item}`;
              }
              this.rscLocation[key] = [];
            }
            //将从接口获取到的值赋给rscLocation
            if (res.data.data.node_level) {
              res.data.data.node_level.map((item) => {
                for (const key in this.rscLocation) {
                  if (item.level === key) {
                    this.rscLocation[key].push(item.node);
                  }
                }
                //循环遍历node是否与nodeList的id相同，相同则置nodeList为disable
                for (const i in this.nodeList) {
                  if (item.node === this.nodeList[i].id) {
                    this.nodeList[i].disabled = true;
                  }
                }
              });
            }
            this.rscLocationVisible = true;
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
      if (data) {
        this.chosenItem = {};
        this.chosenItem = data;
      } else {
        this.chosenItem = {};
        this.$forceUpdate();
      }
    },
    operate(action) {
      if (action == "migrate") {
        this.migrate = {
          is_force: false,
          period: "",
          to_node: "",
        };
        this.migrateNodes = []; //清空上次存储的值，以免造成数据重复

        //因为不点击当前行chosenItem不会更新最新数据，所以该方法更新choseItem
        this.$store.state.rscs.forEach((item) => {
          if (item.id == this.chosenItem.id) {
            this.chosenItem = item;
          }
        });
        //选中的数据的running_node有值，则该值不可作为迁移的节点
        this.nodeLists.forEach((item) => {
          if (this.chosenItem.running_node.indexOf(item.id) == -1) {
            this.migrateNodes.push(item.id);
          }
        });
        this.disableMigrateDialog = true;
      } else {
        let data = {};
        data.id = this.chosenItem.id;
        data.action = action;
        // let req = "/resources/" + this.chosenItem.id + "/" + action;

        easyRequest(data).then(() => {
          this.getResources();
          this.$message({
            type: "success",
            message: "resource " + action + " success",
          });
        });
      }
    },
    updateMigrate() {
      // let url = "/resources/" + this.chosenItem.id + "/migrate";
      let id = this.chosenItem.id;
      let data = this.migrate;

      updateMigrates({id, data}).then(() => {
        this.disableMigrateDialog = false;
        this.getResources();
        this.$message({
          type: "success",
          message: "resource migrate success",
        });
      });
    },
    deleteItem() {
      // let url = "/resources/" + this.chosenItem.id + "/delete";
      let id = this.chosenItem.id;

      deleteItems(id).then(() => {
        this.getResources();
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
      let location = {};
      location.node_level = [];
      location.rsc_id = this.chosenItem.id;

      for (const key in this.rscLocation) {
        location[key] = this.rscLocation[key];
        if (this.rscLocation[key].length == 0) {
          continue;
        } else if (this.rscLocation[key].length >= 1) {
          for (const item of this.rscLocation[key]) {
            location.node_level.push({
              level: key,
              node: item,
            });
          }
        }
      }

      // let url = "/resources/" + this.chosenItem.id + "/location";
      let id = this.chosenItem.id;
      let data = location;

      updateLocations({ id, data }).then(() => {
        this.rscLocationVisible = false;
        this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    coordination() {
      // let url = "/resources/" + this.chosenItem.id + "/colocation";
      let id = this.chosenItem.id;
      let data =  this.rscColocation;

      updateCoordination({ id, data }).then(() => {
        this.rscColocationVisible = false;
        this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    orders() {
      // let url = "/resources/" + this.chosenItem.id + "/order";
      let id = this.chosenItem.id;
      let data = this.rscOrder;
      updateOrder({ id, data }).then(() => {
        this.rscOrderVisible = false;
        this.getResources();
        this.$message({
          type: "success",
          message: "location update success",
        });
      });
    },
    deleteMetaTag(value) {
      delete this.addForm.meta_attributes[value];
    },
    deleteInsTag(value) {
      console.log(this.addForm.instance_attributes);
      delete this.addForm.instance_attributes[value];
      console.log(this.addForm.instance_attributes);
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
      this.disableMigrateDialog = false;
    },
    cleanSelets() {
      this.$emit("clear");
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