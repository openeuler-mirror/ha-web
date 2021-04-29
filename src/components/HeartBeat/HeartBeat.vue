<template>
  <div class="priority-modal">
    <el-dialog
      title="心跳配置"
      :visible.sync="msg"
      width="650px"
      :modal-append-to-body="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :before-close="handleCancel"
    >
      <el-tabs v-if="form.hbaddrs1" v-model="activeName">
        <el-tab-pane label="主心跳" name="first">
          <el-form ref="form" :model="form">
            <div v-for="item in form.hbaddrs1" :key="item.key">
              <el-form-item>
                <span>节点心跳-{{ item.nodeid }}</span>
                <el-input v-model="item.ip"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="备用心跳" name="second">
          <el-switch v-model="backupHeartBeat" inactive-text="启用备用心跳">
          </el-switch>
          <div>
            <span>节点心跳-{{ form.hbaddrs1[0].nodeid }}</span>
            <el-input
              v-model="backupHB[0].ip"
              :disabled="!backupHeartBeat"
            ></el-input>
          </div>
          <div>
            <span>节点心跳-{{ form.hbaddrs1[1].nodeid }}</span>
            <el-input
              v-model="backupHB[1].ip"
              :disabled="!backupHeartBeat"
            ></el-input>
          </div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="updateHeartBeat">确 定</el-button>
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
      activeName: "first",
      backupHeartBeat: false,
      backupHB: [
        {
          nodeId: "",
          ip: "",
        },
        {
          nodeId: "",
          ip: "",
        },
      ],
      form: {},
    };
  },
  created() {
    let _this = this;
    getConfigs().then((res) => {
      _this.form = res.data.data;
        _this.form.hbaddrs1 = res.data.data.hbaddrs1;
      if (!res.data.data.hbaddrs2) {
        _this.backupHB[0] = res.data.data.hbaddrs1[0];
        _this.backupHB[1] = res.data.data.hbaddrs1[1];
      } else {
        _this.backupHB[0] = res.data.data.hbaddrs2[0];
        _this.backupHB[1] = res.data.data.hbaddrs2[1];
      }
      // });
    });
  },
  methods: {
    updateHeartBeat() {
      let _this = this;
      if (_this.backupHeartBeat) {
        _this.form.hbaddrs2 = [];
        _this.form.hbaddrs2.push(_this.backupHB[0]);
        _this.form.hbaddrs2.push(_this.backupHB[1]);
      }
      updateHB(_this.form).then(() => {
        _this.$store.state.count = "";
        _this.$message({
          type: "success",
          message: "已更新心跳配置",
        });
      });
    },
    handleCancel() {
      let _this = this;
      _this.$store.state.count = "";
    },
  },
};
</script>