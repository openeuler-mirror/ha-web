<template>
  <el-container>
    <!-- 左侧 -->
    <el-aside width="auto">
      <div class="home-logo">
        <img src="../../assets/logo.png" />
        <span v-show="!isCollapse">openUnicorn HA</span>
      </div>

      <left-menu :collapse="isCollapse"></left-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <el-header>
        <top-bar @toggleCollapse="handleToggleCollapse"></top-bar>
      </el-header>
      <el-main>
        <home-table></home-table>
        <priority :msg="$store.state.count == 'priority'" v-if="$store.state.count == 'priority'"></priority>
        <heart-beat :msg="$store.state.count == 'heartbeat'" v-if="$store.state.count == 'heartbeat'"></heart-beat>
        <cluster-shortcut
          :msg="$store.state.count == 'shortcut'"
          v-if="$store.state.count == 'shortcut'"
        ></cluster-shortcut>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HomeTable from "@/views/HomeTable";
import Priority from "@/views/Priority";
import HeartBeat from "@/views/HeartBeat";
import ClusterShortcut from "@/views/ClusterShortcut";
import TopBar from "./components/TopBar";
import LeftMenu from './components/LeftMenu.vue';

export default {
  data() {
    return {
      isCollapse: false,
      menuItemIndex: "",
    };
  },
  components: {
    HomeTable,
    TopBar,
    Priority,
    ClusterShortcut,
    LeftMenu,
    HeartBeat,
  },
  methods: {
    // 菜单栏伸缩控制
    handleToggleCollapse(data) {
      this.isCollapse = data;
    }
  },
};
</script>

<style lang='scss' scoped>
.home-logo {
  position: relative;

  img {
    width: 40px;
    padding: 8px 6px 8px 12px;
  }
  span {
    position: absolute;
    top: 50%;
    left: 60px;
    margin-top: -10px;

    font-size: 18px;
    color: #f1f5fb;
  }
}
.el-container {
  .el-aside {
    background: #2b333e;
    i {
      margin: 0 3px;
      color: #f1f5fb;
      font-size: 18px;
    }
  }
  .el-header {
    background: #fff;
    margin: 0;
    padding: 0;
  }
  .el-main {
    background: #f1f5fb;
  }
}
</style>
