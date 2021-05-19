<template>
  <div class="top-bar">
    <el-dropdown class="button-group">
      <el-button class="btn-user" type="default">
        <i class="iconfont icon-yonghutouxiang"></i>
        <span>{{ username }}</span>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="refreshSetting">{{
          $t("topbar.refresh")
        }}</el-dropdown-item>
        <el-dropdown-item @click.native="logout">{{
          $t("topbar.logout")
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog :title="$t('topbar.refresh')" :visible.sync="disableRefresh" width="30%">
      <span>{{ $t("topbar.refresh") }}:</span>
      <el-select v-model="value" :placeholder="$t('common.pleaseSelect')">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.text"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <span slot="footer" class="dialog-footer">
        <el-button @click="disableRefresh = false">{{
          $t("common.cancel")
        }}</el-button>
        <el-button type="primary" @click="refreshDetermined">{{
          $t("common.confirm")
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { logout } from "@/api/logout";
import axios from "axios";
export default {
  data() {
    return {
      disableRefresh: false,
      options: [
        { text: this.$t("topbar.disableRefresh"), value: 0 },
        { text: this.$t("topbar.fivesec"), value: 5 },
        { text: this.$t("topbar.tensec"), value: 10 },
      ],
      username: "",
      value: localStorage.getItem("refresh")
        ? parseInt(localStorage.getItem("refresh"))
        : 0,
    };
  },
  created() {
    this.username = this.$store.state.username;
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
      window.location = "/";
    },
    logout() {
      localStorage.removeItem("userLogin");
      axios.post("api/v1/logout").then(() => {
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