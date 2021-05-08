<template>
  <div class="top-bar">
    <el-dropdown class="button-group">
      <el-button class="btn-user" type="default">
        <i class="iconfont icon-yonghutouxiang"></i>
        <span>user</span>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="refreshSetting"
          >刷新设置</el-dropdown-item
        >
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="刷新设置" :visible.sync="disableRefresh" width="30%">
      <span>刷新设置：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="disableRefresh = false">取 消</el-button>
        <el-button type="primary" @click="refreshDetermined">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { logout } from "@/api/logout";
import axios from 'axios'
export default {
  data() {
    return {
      disableRefresh: false,
      options: [
        { text: "不自动刷新", value: 0 },
        { text: "每5秒自动刷新", value: 5 },
        { text: "每10秒自动刷新", value: 10 },
      ],
      value: localStorage.getItem("refresh") ? parseInt(localStorage.getItem("refresh")) : 0,
    };
  },
  methods: {
    refreshSetting() {
      let _this = this;
      _this.disableRefresh = true;
    },
    refreshDetermined() {
      let _this = this;
      localStorage.setItem("refresh", _this.value);
      _this.disableRefresh = false;
      //_this.$router.push({ path: "/" });
      window.location = "/"
      
    },
    logout() {
      localStorage.removeItem("userLogin");
      axios.post('api/v1/logout').then(() => {
        document.cookie =
          "beegosessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      });
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped lang='scss'>
.top-bar {
  color: #fff;
  height: 60px;
  .button-group {
    float: right;
    .btn-user {
      border: none;
      color: #999;
      background: transparent;
    }
    .btn-user:hover {
      background: transparent;
    }
  }
}
</style>