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
    <el-dropdown class="button-group">
      <el-button class="btn-user" type="default">
        <span>{{ language }}</span>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="handleChangeLanguage('zh-CN')">中文</el-dropdown-item>
        <el-dropdown-item @click.native="handleChangeLanguage('en-US')">English</el-dropdown-item>
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
import { logout } from "@/api/login";

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
      language: '中文',
    };
  },
  created() {
    this.username = this.$store.state.username;
  },
  methods: {
    refreshSetting() {
      this.disableRefresh = true;
    },
    refreshDetermined() {
      localStorage.setItem("refresh", this.value);
      this.disableRefresh = false;
      //this.$router.push({ path: "/" });
      window.location = "/";
    },
    logout() {
      localStorage.removeItem("userName");
      logout().then(() => {
        document.cookie = "beegosessionID=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      });
      this.$router.push({ path: "/login" });
    },

    handleChangeLanguage(lang) {
      switch(lang) {
        case 'zh-CN':
          this.language = '中文';
          break;
        case 'en-US':
          this.language = 'English';
          break;
        default: 
          this.language = '中文';
          break;
      }
      this.$i18n.locale = lang;
      localStorage.setItem('language',lang);
    }
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