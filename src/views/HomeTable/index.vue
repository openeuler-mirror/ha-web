+<template>
  <div class="data-operate">
    <operations
      ref="operation"
      :nodeLists="nodeList"
      @refreshData="dataLoading"
      @clear="clearSelected"
    ></operations>
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
      <el-table-column :label="$t('table.select')" width="60">
        <template slot-scope="scope">
          <el-radio class="radio" v-model="radio" :label="scope.row.id">
            &nbsp;
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column sortable prop="id" :label="$t('table.rscName')"> </el-table-column>
      <el-table-column sortable prop="status" :label="$t('table.status')">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="dark"
            :content="
              scope.row.status_message && scope.row.status === 'Not Running'
                ? 'Failed'
                : scope.row.status
            "
            placement="right"
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
            <i class="iconfont icon-B" v-else style="color: '#999'"> </i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column sortable prop="type" :label="$t('table.rscType')"> </el-table-column>
      <el-table-column sortable prop="svc" :label="$t('table.service')"> </el-table-column>
      <template v-for="(item, index) in nodeList">
        <el-table-column :key="index" v-if="true" width="150px">
          <template #header>
            <div @click="openStandByDialog(item)">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.status"
                placement="top"
              >
                <i
                  :style="{
                    color:
                      item.status == 'Not Running' ||
                      item.status == 'Not Running/Standby'
                        ? 'red'
                        : 'green',
                  }"
                  class="iconfont icon-host"
                ></i>
              </el-tooltip>

              <el-badge
                is-dot
                v-show="
                  item.status == 'Master/Standby' ||
                  item.status == 'Not Running/Standby' ||
                  item.status == 'Standby'
                "
              >
              </el-badge>
              <span>{{ item.id }}</span>
            </div>
          </template>

          <template slot-scope="scope">
            <template>
              <span
                :key="item.id"
                :style="{
                  color:
                    scope.row.running_node &&
                    scope.row.running_node.indexOf(item.id) > -1
                      ? 'green'
                      : '#999',
                }"
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

    <el-dialog
      title=""
      :visible.sync="disableStandbyDialog"
      width="500px"
      top="15vh"
      class="location"
    >
      <el-form :model="chosenNode" label-width="100px">
        <el-form-item :label="$t('table.nodeId')">
          <span>{{ chosenNode.id }}</span>
        </el-form-item>
        <el-form-item class="node-buttons">
          <el-row>
            <el-button v-if="chosenNode.running" @click.native="runStat('stop')"
              >{{$t('table.disable')}}
            </el-button>
            <el-button
              v-if="!chosenNode.running"
              @click.native="runStat('start')"
              >{{$t('table.enable')}}</el-button
            >
          </el-row>

          <el-row>
            <el-button
              v-if="chosenNode.standby"
              @click.native="standbyStat('unstandby')"
              >{{$t('table.unstandby')}}</el-button
            >
            <el-button v-else @click.native="standbyStat('standby')"
              >{{$t('table.standby')}}</el-button
            >
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getResource, runAction, standbyAction } from "@/api/homeTable";
import { getNodes } from "@/api/node";
import Operations from "@/components/Operations";

import Vue from "vue";
export default {
  data() {
    return {
      radio: "",
      tableData: [],
      nodeList: [],
      chosenSrc: {},
      chosenNode: {},
      disableStandbyDialog: false,
    };
  },
  components: {
    Operations,
  },
  created() {
    this.dataLoading();
    if (
      localStorage.getItem("refresh") &&
      localStorage.getItem("refresh") != 0
    ) {
      window.setInterval(() => {
        setTimeout(this.dataLoading(), 0);
      }, localStorage.getItem("refresh") * 1000);
    }
  },
  methods: {
    showRow(row) {
      this.radio = row.id;
      this.$store.commit("mutationsUpdateChosenItem", row);
      this.$store.commit("mutationsitemChose", row);
      this.$refs.operation.handleOperation(this.$store.state.chosenItem);
    },
    dataLoading() {
      getResource()
        .then((res) => {
          this.tableData = res.data.data;
          this.$store.commit("mutationsRscs", this.tableData);
          let noGroup = [];
          let ids = [];
          this.tableData.forEach((item) => {
            if(item.type!='clone'){
              ids.push(item.id);
            }
            if (!item.subrscs) {
              noGroup.push(item);
              this.$store.commit("mutationsNoGroupItems", noGroup);
            }
          });
          this.$store.commit("mutationsIds", ids);
          if (this.radio) {
            for (let i of this.tableData) {
              if (i.id == this.radio) {
                let chosenItem = JSON.parse(JSON.stringify(i));
                this.showRow(chosenItem);
              }
            }
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            localStorage.removeItem("userName");
            document.cookie =
              "beegosessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            this.$router.push({ path: "/login" });
          }
        });
      getNodes().then((res) => {
        this.nodeList.length = 0;
        for (let i of res.data.data) {
          this.nodeList.push(i);
        }
        this.nodeList.map(this.parseNodeStatusMsg);
      });
    },
    parseNodeStatusMsg(node) {
      let running = true;
      let standby = false;

      switch (node.status) {
        case "Master":
          break;
        case "Master/Standby":
          standby = true;
          break;
        case "Not Running/Standby":
          running = false;
          standby = true;
          break;
        case "Standby":
          standby = true;
          break;
        case "Not Running":
          running = false;
          break;
        case "Running":
          running = true;
          break;
        default:
          break;
      }
      node.running = running;
      node.standby = standby;
    },
    openStandByDialog(item) {
      this.chosenNode = item;
      this.disableStandbyDialog = true;
    },

    standbyStat(val) {
      // let url = "nodes/" + this.chosenNode.id + "/" + val;
      standbyAction({id: this.chosenNode.id, action: val }).then((res) => {
        this.$message({
          type: "success",
          message: "node " + val + " success",
        });
        this.disableStandbyDialog = false;

        this.dataLoading();
      });
    },
    runStat(val) {
      // let url = "nodes/" + this.chosenNode.id + "/" + val;
      runAction({ id: this.chosenNode.id, action: val }).then((res) => {
        this.nodeList.length = 0;
        this.$message({
          type: "success",
          message: "node " + val + " success",
        });
        this.disableStandbyDialog = false;

        this.dataLoading();
      });
    },
    clearSelected(a) {
      this.radio = "";
      this.$refs.singleTable.setCurrentRow(a);
      this.$forceUpdate();
      this.$store.commit("mutationsUpdateChosenItem", {});
      this.$store.commit("mutationsitemChose", {});
      this.$refs.operation.handleOperation();
    },
  },
};
</script>

<style scoped lang='scss'>
.data-operate {
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
.node-buttons {
  button {
    width: 90px;
    margin-top: 7px;
    margin-left: -10px;
  }
  .el-input {
    width: 190px;
  }
}
.edit-panel {
  .el-input {
    width: 200px;
  }
}
</style>