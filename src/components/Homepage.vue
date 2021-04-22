<template>
  <el-container>
    <el-aside width="auto">
      <div class="logo">
        <img src="../assets/logo.png" />
        <span v-show="!isCollapse">openUnicorn HA</span>
      </div>

      <el-menu
        class="el-menu-vertical-demo"
        @select="handleSelect"
        :collapse="isCollapse"
        background-color="#2b333e"
        text-color="#f1f5fb"
      >
        <el-menu-item index="1">
          <i class="iconfont icon-xitong1"></i>
          <template #title>
            <span>系统</span>
          </template>
        </el-menu-item>

        <el-submenu index="2">
          <template #title>
            <i class="iconfont icon-peizhi"></i>
            <span>集群配置</span>
          </template>
          <el-menu-item index="2-1">
            <span>首选项配置</span>
          </el-menu-item>
          <el-menu-item index="2-2">
            <span>心跳配置</span>
          </el-menu-item>
        </el-submenu>

        <el-submenu index="3">
          <template #title>
            <i class="iconfont icon-gongju"></i>
            <span>工具</span>
          </template>
          <el-menu-item index="3-1">
            <logs></logs>
          </el-menu-item>
          <el-menu-item index="3-2">
            <span>集群快捷操作</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <el-button class="btn-menu" @click="toggleCollapse">
          <i class="iconfont icon-caidan"></i>
        </el-button>
        <top-bar></top-bar>
      </el-header>
      <el-main>
        <home-table></home-table>
        <priority :msg="$store.state.count == '2-1'"></priority>
        <heart-beat :msg="$store.state.count == '2-2'"></heart-beat>
        <cluster-operation :msg="$store.state.count == '3-2'"></cluster-operation>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeTable from "@/components/HomeTable/HomeTable";
import Priority from "@/components/Priority/Priority";
import HeartBeat from "@/components/HeartBeat/HeartBeat";
import Logs from "@/components/Logs/Logs";
import ClusterOperation from "@/components/ClusterOperation/ClusterOperation";
import TopBar from "@/components/Layout/TopBar/TopBar";

export default {
  data() {
    return {
      isCollapse: false,
      menuItemIndex: '',
    };
  },
  components: {
    HomeTable,
    TopBar,
    Priority,
    ClusterOperation,
    Logs,
    HeartBeat,
  },
  methods: {
    handleSelect(key, keyPath){
      let _this = this
      console.log(key, keyPath)
      _this.$store.commit('mutationsShowDialog', key);
      console.log(`store${_this.$store.state.count}`)
    },
    toggleCollapse() {
      let _this = this
      _this.isCollapse = !_this.isCollapse
    },
  },
};
</script>

<style lang='scss'>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  border: none;
}
.el-submenu.is-active.is-open {
  color: #fff;
}
.el-container {
  .el-menu{
    .el-menu-item.is-active{
      color: #fff;
    }
    .el-menu-item:hover{
      color: #c21a1f;
      border-right: 4px solid #c21a1f;
    }
  }
  .logo {
    padding: 8px 12px;
    position: relative;

    img {
      width: 40px;
    }
    span {
      position: absolute;
      top: 50%;
      left: 66px;
      margin-top: -10px;

      font-size: 18px;
      color: #f1f5fb;
    }
  }

  .el-aside {
    background: #2b333e;
    i {
      margin: 0 3px;
      color: #f1f5fb;
      font-size: 18px;
    }
    div.el-menu-item :hover {
      border-right: 1px solid #c21a1f;
    }
    
  }
  .el-header {
    background: #fff;
    margin: 0;
    padding: 0;
    .btn-menu {
      float: left;
      padding: 0 25px;
      margin: 0;
      border: none;
      border-bottom: 1px solid #ecf0f6;
      background: transparent;

      i{
        font-size: 26px;
        line-height: 60px;
      }
    }
  }
  .el-main {
    background: #f1f5fb;
  }
}
</style>
