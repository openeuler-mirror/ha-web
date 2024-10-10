<template>
  <div class="priority-modal">
    <el-dialog
      :title="$t('sidebar.heartbeat')"
      :visible.sync="msg"
      width="650px"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleCancel"
    >
      <h4 v-if="nodesError">
        {{ $t("sidebar.warning") }}
      </h4>
      <el-tabs
        v-if="!nodesError"
        v-model="activeName"
        :before-leave="handleTabSwitch"
      >
        <el-tab-pane :label="$t('sidebar.main')" name="first">
          <el-form ref="form" :model="form">
            <el-form-item v-for="item in form.hbaddrs1" :key="item.key">
              <span class="node-text">
                {{ $t("sidebar.ip") }}{{ item.nodeid }}:</span
              >
              <el-input
                class="node-input"
                v-model="item.ip"
                @change="handleInputOneChange"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <el-tab-pane :label="$t('sidebar.backup')" name="second">
          <el-form ref="form" :model="form">
            <el-row>
              <el-switch
                class="node-text node-switch"
                v-model="backupHeartBeat"
                :inactive-text="$t('sidebar.switch')"
              >
              </el-switch>
            </el-row>
            <el-form-item v-for="item in form.hbaddrs2" :key="item.key">
              <span class="node-text">
                {{ $t("sidebar.ip") }}{{ item.nodeid }}:</span
              >
              <el-input
                class="node-input"
                v-model="item.ip"
                :disabled="!backupHeartBeat"
                @change="handleInputTwoChange"
              >
              </el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" v-if="!nodesError">
        <el-button @click="handleCancel">{{ $t("common.cancel") }}</el-button>
        <el-button
          type="primary"
          @click="updateHeartBeat"
          :loading="loadingBtn"
          >{{ $t("common.confirm") }}</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getConfigs, updateHB } from "@/api/cluster";

export default {
  props: {
    msg: Boolean,
  },
  data() {
    return {
      reg: /^([1-9]|[1-9]\d|1\d{2}|2[0-1]\d|22[0-3])(\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/, //ip正则表达式
      activeName: "first",
      backupHeartBeat: false,
      loadingBtn: false,
      form: {
        hbaddrs1: [],
        hbaddrs2: [],
      },
      nodesError: false, //心跳数据是否正常，不正常为false提示功能不能使用，正常为true
    };
  },
  created() {
    getConfigs().then((res) => {
      // console.log('bijiao', (res.data.data).constructor == Object)
      //判断心跳配置数据是否正常，正常数据类型为object
      if (res.data.data.constructor == Object) {
        if (res.data.data.hbaddrs1) {
          this.form.hbaddrs1 = res.data.data.hbaddrs1;
          this.form.hbaddrs1.flag = true;
        }

        if (res.data.data.hbaddrs2) {
          this.form.hbaddrs2 = res.data.data.hbaddrs2;
          this.form.hbaddrs2.flag = true;
        } else if (res.data.data.hbaddrs1) {
          res.data.data.hbaddrs1.forEach((item) => {
            this.form.hbaddrs2.push({
              nodeid: item.nodeid,
              ip: "",
            });
          });
          this.form.hbaddrs2.flag = false;
        }
      } else {
        this.nodesError = true;
      }
    });
  },
  methods: {
    //错误信息显示
    showErrorMessage() {
      this.$message({
        type: "error",
        message: "请输入正确IP！",
        duration: 1500,
      });
    },
    //判断输入的内容是否是正确的ip格式的方法 hb判断是主心跳还是备用心跳
    getInputValue(value, hb) {
      if (this.reg.test(value) || typeof value == "undefined") {
        hb == 0 || hb == "0"
          ? (this.form.hbaddrs1.flag = true)
          : (this.form.hbaddrs2.flag = true);
      } else {
        hb == 0 || hb == "0"
          ? (this.form.hbaddrs1.flag = false)
          : (this.form.hbaddrs2.flag = false);
        this.showErrorMessage();
      }
    },
    //判断输入的内容改变后是否是正确的ip格式
    handleInputOneChange(value) {
      this.getInputValue(value, 0);
    },
    handleInputTwoChange(value) {
      this.getInputValue(value, 1);
    },

    //判断是否可切换tab
    handleTabSwitch() {
      //备用心跳开启时，判断心跳是否输入或输入正确，正确则hbaddrs2.flag = true,否则为false
      if (this.backupHeartBeat == true) {
        for (let item of this.form.hbaddrs2) {
          if (!this.reg.test(item.ip)) {
            this.form.hbaddrs2.flag = false;
            break;
          } else {
            this.form.hbaddrs2.flag = true;
          }
        }
      } else {
        this.form.hbaddrs2.flag = true;
      }

      //hbaddrs1.flag或者hbaddrs1.flag为false时， tab不可切换
      if (
        this.form.hbaddrs1.flag == false ||
        this.form.hbaddrs2.flag == false
      ) {
        this.showErrorMessage();
        return false;
      }
    },
    updateHeartBeat() {
      let pushData = {};
      //备用心跳关闭
      if (this.backupHeartBeat == false) {
        //输入的主心跳正确
        if (this.form.hbaddrs1.flag) {
          pushData.hbaddrs1 = [];
          this.form.hbaddrs1.forEach((item) => {
            pushData.hbaddrs1.push({
              ip: item.ip,
              nodeid: item.nodeid,
            });
          });

          //向后端提交数据
          this.loadingBtn = true; //确定按钮loading状态
          updateHB(pushData).then(() => {
            this.$store.state.count = "";
            this.$message({
              type: "success",
              message: "已更新心跳配置",
            });
            this.loadingBtn = false; //确定按钮loading状态取消
          });
        } else {
          //输入的主心跳IP不正确
          this.showErrorMessage();
        }
      } else {
        // 备用心跳开启
        //遍历hb2，判断ip是否输入正确，正确flag为true，否则为false
        for (let item of this.form.hbaddrs2) {
          if (!this.reg.test(item.ip)) {
            this.showErrorMessage();
            this.form.hbaddrs2.flag = false;
            break;
          } else {
            this.form.hbaddrs2.flag = true;
          }
        }

        if (this.form.hbaddrs2.flag && this.form.hbaddrs1.flag) {
          pushData.hbaddrs1 = [];
          pushData.hbaddrs2 = [];

          this.form.hbaddrs1.forEach((item) => {
            pushData.hbaddrs1.push({
              ip: item.ip,
              nodeid: item.nodeid,
            });
          });
          this.form.hbaddrs2.forEach((item) => {
            pushData.hbaddrs2.push({
              ip: item.ip,
              nodeid: item.nodeid,
            });
          });

          //向后端提交数据
          this.loadingBtn = true; //确定按钮loading状态
          updateHB(pushData).then(() => {
            this.$store.state.count = "";
            this.$message({
              type: "success",
              message: "已更新心跳配置",
            });
            this.loadingBtn = false; //确定按钮loading状态取消
          });
        }
      }
    },
    handleCancel() {
      (this.activeName = "first"), (this.$store.state.count = "");
    },
  },
};
</script>

<style scoped lang="scss">
.priority-modal {
  .el-row {
    margin: 20px 0;
  }
  .node-text {
    margin-left: 80px;
    margin-right: 10px;
  }
  .el-switch__label.is-active {
    color: #606266;
  }
  .el-input {
    width: 46%;
  }
  .warnning-str {
    color: red;
    // margin-left: 200px;
  }
}
</style>