<template>
  <div class="left-menu">
    <el-menu
      class="menu"
      :default-active="activeName"
      :collapse="collapse"
      background-color="#2b333e"
      text-color="#fff"
      @select="handleSelect">
     
      <el-menu-item index="system">
        <i class="iconfont icon-xitong1 menu-icon"></i>
        <template slot="title">
          <span>{{ $t("sidebar.system") }}</span>
        </template>
        
      </el-menu-item>
      <el-submenu index="config">
        <template slot="title">
          <i class="iconfont icon-peizhi menu-icon"></i>
          <span>{{ $t("sidebar.cluster") }}</span>
        </template>
        <el-menu-item index="priority">{{ $t("sidebar.priority") }}</el-menu-item>
        <el-menu-item index="heartbeat">{{ $t("sidebar.heartbeat") }}</el-menu-item>
      </el-submenu>
      <el-submenu index="tool">
        <template slot="title">
          <i class="iconfont icon-gongju menu-icon"></i>
          <span>{{ $t("sidebar.tool") }}</span>
        </template>
        <el-menu-item index="download">
          <logs></logs>
        </el-menu-item>
        <el-menu-item index="shortcut">{{ $t("sidebar.shortcut") }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Logs from "@/views/Logs";

export default {
  components: {Logs,},
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: 'system'
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$store.commit("mutationsShowDialog", key);
    },
  }
}
</script>

<style lang='scss' scoped>
.left-menu {
  
  .menu.el-menu:not(.el-menu--collapse) {
    width: 230px;
  }
 
  .el-menu-item.is-active {
    background-color: #1e2228 !important;
    color: #fff;
  }

  .menu-icon {
    color: #fff;
  }
}

.el-menu {
  border: none;
}

</style>