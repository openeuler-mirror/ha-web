+<template>
  <div class="data-operate">
    <operations
      ref="operation"
      :nodeLists="nodeList"
      @refreshData="dataLoading"
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
  </div>
</template>

<script>
import { getResource } from "@/api/homeTable";
import { getNodes } from "@/api/node";
import Operations from "@/components/Layout/Operations/Operations";

import Vue from "vue";
export default {
  data() {
    return {
      radio: "",
      tableData: [],
      nodeList: [],
      chosenSrc: {},
    };
  },
  components: {
    Operations,
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
  methods: {
    showRow(row) {
      let _this = this;
      _this.radio = row.id;
      _this.$store.commit("mutationsUpdateChosenItem", row);
      _this.$store.commit("mutationsitemChose", row);
      _this.$refs.operation.handleOperation(_this.$store.state.chosenItem);
    },
    dataLoading() {
      let _this = this;
      getResource()
        .then((res) => {
          _this.tableData = res.data.data;
          _this.$store.commit("mutationsRscs", _this.tableData);
          console.log(_this.$store.state.rscs);
          let noGroup = [];
          let ids = [];
          _this.tableData.forEach((item) => {
            ids.push(item.id);
            if (!item.subrscs) {
              noGroup.push(item);
              _this.$store.commit("mutationsNoGroupItems", noGroup);
            }
          });
          _this.$store.commit("mutationsIds", ids);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            localStorage.removeItem("userLogin");
            document.cookie =
              "beegosessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            this.$router.push({ path: "/login" });
          }
        });
      getNodes().then((res) => {
        _this.nodeList = res.data.data;
      });
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
.edit-panel {
  .el-input {
    width: 200px;
  }
}
</style>