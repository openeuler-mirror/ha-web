<template>
  <div class="main">
    <div class="sider">
      <sidebar-menu :menu="menu" @toggle-collapse="onToggleCollapse" />
    </div>
    <div class="table" :class="{ collapsed: isCollapsed }">
      <home-table></home-table>
    </div>
  </div>
</template>

<script>
import HomeTable from "@/components/HomeTable/HomeTable";
import Priority from "@/components/Priority/Priority";
import HeartBeat from "@/components/HeartBeat/HeartBeat";
import Logs from "@/components/Logs/Logs";
import ClusterOperation from "@/components/ClusterOperation/ClusterOperation";
export default {
  data() {
    return {
      menu: [
        { header: true, title: "HA" },
        {
          title: "集群配置",
          icon: "ICON CLASS HERE",
          child: [{ component: Priority }, { component: HeartBeat }],
        },
        {
          title: "工具",
          icon: "ICON CLASS HERE",
          child: [{ component: Logs }, { component: ClusterOperation }],
        },
      ],
      isCollapsed: false,
    };
  },
  components: {
    HomeTable,
  },
  methods: {
    onToggleCollapse(collapsed) {
      let _this = this;
      _this.isCollapsed = !_this.isCollapsed;
    },
  },
};
</script>

<style  lang='scss'>
body {
  padding: 0px !important;
  overflow: hidden;
  .sider {
    .priority-modal {
      .bar-text {
        cursor: pointer;
      }
      color: white;
      padding-left: 55px;
      padding-top: 10px;
      padding-bottom: 10px;
      .input-box {
        width: 400px;
      }
      .el-input {
        width: 400px;
      }
    }
    .priority-modal:hover {
      transition: background-color 0.4s linear;
      border-right: 5px solid #c21a1f;
      background-color: #1e242b;
    }
    .v-sidebar-menu {
      width: 224px;
      background-color: #2b333e;
      font-size: 14px;
      -webkit-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
      .vsm--toggle-btn:focus {
        outline: #1e1e21;
      }
    }
    .v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 {
      background-color: #2b333e;
    }

    .v-sidebar-menu .vsm--dropdown > .vsm--list {
      padding: 0px;
      .v-sidebar-menu .vsm--list .vsm--header {
        font-size: 18px;
        line-height: 40px;
        cursor: pointer;
        margin: auto;
        -webkit-transition: all 0.3s ease-out;
        -o-transition: all 0.3s ease-out;
        transition: all 0.3s ease-out;
        overflow: hidden;
      }
    }
  }
}
.table {
  margin-left: 240px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}

.table.collapsed {
  margin-left: 80px;
  -webkit-transition: all 0.3s ease-out;
  -o-transition: all 0.3s ease-out;
  transition: all 0.3s ease-out;
}
</style>