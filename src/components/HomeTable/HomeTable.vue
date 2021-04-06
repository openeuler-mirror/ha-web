<template>
  <div class="data-operate">
    <div class="button-group">
      <el-row>
        <el-dropdown>
          <el-button class="el-dropdown-link operations" style="float='left'"
            >添加</el-button
          >
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>添加普通资源</el-dropdown-item>
              <el-dropdown-item>添加组资源</el-dropdown-item>
              <el-dropdown-item>添加克隆资源</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <template v-for="item in operation">
          <el-button :key="item.text" class="operations">{{
            item.text
          }}</el-button>
        </template>
        <template>
          <el-popconfirm
            title="确定删除资源吗？">
            <template #reference>
              <el-button class="operations">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
        <el-dropdown>
          <el-button class="el-dropdown-link operations">关系</el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>资源位置</el-dropdown-item>
              <el-dropdown-item>资源协同</el-dropdown-item>
              <el-dropdown-item>资源顺序</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button class="operations" style="float: right">刷新</el-button>
      </el-row>
    </div>

    <el-table
      :data="tableData"
      row-key="id"
      height="calc(100vh-85px)"
      :tree-props="{ children: 'subrscs', hasChildren: 'hasChildren' }"
      :header-cell-style="{ 'background-color': '#fafafa' }"
      :row-style="{ height: '60px' }"
      ref="singleTable"
      highlight-current-row
      @row-click="showRow"
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
              placement="top">
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
export default {
  data() {
    return {
      radio: "",
      tableData: [
        {
          status: "Unmanaged",
          colocation: {
            same_node: [
              {
                with_rsc: "ms-drbd",
                rsc: "group-fs-ps",
              },
            ],
            same_node_num: 1,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns187"],
          type: "group",
          order: {
            before_rscs: [
              {
                id: "ms-drbd",
              },
            ],
            before_rscs_num: 1,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          subrscs: [
            {
              status: "Running",
              running_node: ["ns187"],
              type: "primitive",
              svc: "Filesystem",
              status_message: "",
              id: "fs-ps",
            },
          ],
          status_message: "",
          id: "group-fs-ps",
        },
        {
          status: "Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns188"],
          type: "primitive",
          svc: "Dummy",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          status_message: "",
          id: "mydummy2",
        },
        {
          status: "Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns188"],
          type: "group",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          subrscs: [
            {
              status: "Running",
              running_node: ["ns188"],
              type: "primitive",
              svc: "mysql",
              status_message: "",
              id: "mysql",
            },
          ],
          status_message: "",
          id: "mysql-group",
        },
        {
          status: "Not Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: [],
          type: "primitive",
          svc: "CTDB",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          status_message:
            "* test2_start_0 on ns187 'not installed' (5): call=70, status=complete, exitreason='Setup problem: couldn't find command: /usr/bin/tdbdump', * test2_start_0 on ns188 'not installed' (5): call=953, status=complete, exitreason='Setup problem: couldn't find command: /usr/bin/tdbdump',",
          id: "test2",
        },
        {
          status: "Not Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: [],
          type: "group",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          subrscs: [
            {
              status: "Not Running",
              running_node: [],
              type: "primitive",
              svc: "CTDB",
              status_message: "",
              id: "test1",
            },
            {
              status: "Not Running",
              running_node: [],
              type: "primitive",
              svc: "Filesystem",
              status_message: "",
              id: "iscisi",
            },
          ],
          status_message: "",
          id: "group1",
        },
        {
          status: "Running",
          colocation: {
            same_node: [
              {
                with_rsc: "ms-drbd",
                rsc: "group-fs-ps",
              },
            ],
            same_node_num: 1,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns187", "ns188"],
          type: "master",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [
              {
                id: "group-fs-ps",
              },
            ],
            after_rscs_num: 1,
          },
          location: [
            {
              node: "ns187",
              level: "Master Node",
            },
            {
              node: "ns188",
              level: "Slave 1",
            },
          ],
          allow_unmigrate: false,
          subrscs: [
            {
              status: "Running",
              running_node: ["ns187"],
              type: "primitive",
              svc: "drbd",
              status_message: "",
              id: "drbd-ps:0",
            },
            {
              status: "Running",
              running_node: ["ns188"],
              type: "primitive",
              svc: "drbd",
              status_message: "",
              id: "drbd-ps:1",
            },
          ],
          status_message: "",
          id: "ms-drbd",
        },
        {
          status: "Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns188"],
          type: "primitive",
          svc: "Dummy",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: true,
          status_message: "",
          id: "mydummy1",
        },
        {
          status: "Not Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: [],
          type: "primitive",
          svc: "CTDB",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          status_message: "",
          id: "y1",
        },
        {
          status: "Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns187", "ns188"],
          type: "clone",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          subrscs: [
            {
              status: "Running",
              running_node: ["ns187"],
              type: "primitive",
              svc: "IPaddr_6",
              status_message: "",
              id: "ip1:0",
            },
            {
              status: "Running",
              running_node: ["ns188"],
              type: "primitive",
              svc: "IPaddr_6",
              status_message: "",
              id: "ip1:1",
            },
          ],
          status_message: "",
          id: "clone1",
        },
        {
          status: "Not Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: [],
          type: "primitive",
          svc: "CTDB",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: false,
          status_message: "",
          id: "y2",
        },
        {
          status: "Running",
          colocation: {
            same_node: [],
            same_node_num: 0,
            diff_node: [],
            diff_node_num: 0,
          },
          running_node: ["ns188"],
          type: "group",
          order: {
            before_rscs: [],
            before_rscs_num: 0,
            after_rscs: [],
            after_rscs_num: 0,
          },
          location: [],
          allow_unmigrate: true,
          subrscs: [
            {
              status: "Running",
              running_node: ["ns188"],
              type: "primitive",
              svc: "Dummy",
              status_message: "",
              id: "dummy4",
            },
          ],
          status_message: "",
          id: "dummy_group1",
        },
      ],
      nodeList: [
        {
          status: "Master",
          ip: "10.1.110.177",
          id: "ns187",
          is_dc: true,
        },
        {
          status: "Not Running/Standby",
          ip: "10.1.110.178",
          id: "ns188",
          is_dc: false,
        },
        {
          status: "Not Running/Standby",
          ip: "10.1.110.179",
          id: "ns189",
          is_dc: false,
        },
      ],
      operation: [
        {
          text: "编辑",
          icon: "",
        },
        {
          text: "启动",
          icon: "",
        },
        {
          text: "停止",
          icon: "",
        },
        {
          text: "清理",
          icon: "",
        },
        {
          text: "迁移",
          icon: "",
        },
        {
          text: "回迁",
          icon: "",
        },
      ],
    };
  },
  methods: {
    showRow(row) {
      //赋值给radio
      this.radio = row.id;
    },
  },
};
</script>

<style scoped lang='scss'>
.data-operate {
  margin: 40px 20px;

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
    max-height: calc(100vh - 85px);
    .el-table-column {
      color: #2b2b2b;
      background: #ccc;
    }
    .el-table-column th {
      padding: 16px 8px;
    }
  }
}
</style>