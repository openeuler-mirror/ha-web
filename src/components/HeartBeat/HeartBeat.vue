<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">心跳配置</div>

    <el-dialog
      title="心跳配置"
      :visible.sync="dialogVisible"
      width="650px"
      :modal-append-to-body="false"
    >
      <el-tabs v-if="form.hbaddrs1" v-model="activeName">
        <el-tab-pane label="主心跳" name="first">
          <el-form ref="form" :model="form">
            <el-form-item label="节点心跳IP-ns187:">
              <el-input v-model="form.hbaddrs1[0].ip"></el-input>
            </el-form-item>
            <el-form-item label="节点心跳IP-ns188:">
              <el-input v-model="form.hbaddrs1[1].ip"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="备用心跳" name="second">
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-switch v-model="backupHeartBeat" inactive-text="启用备用心跳">
              </el-switch>
            </el-form-item>
            <el-form-item label="节点心跳IP-ns187:">
              <el-input
                :disabled="!backupHeartBeat"
                v-model="form.hbaddrs2[0].ip"
              ></el-input>
            </el-form-item>
            <el-form-item label="节点心跳IP-ns188:">
              <el-input
                :disabled="!backupHeartBeat"
                v-model="form.hbaddrs2[1].ip"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateHeartBeat">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getConfigs, updateHB} from "@/api/cluster";
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      backupHeartBeat: false,
      form: {
        hbaddrs2: {
          0: {
            ip: "",
            nodeid: "",
          },
          1: {
            ip: "",
            nodeid: "",
          },
        },
      },
    };
  },
  created() {
    let _this = this;
    getConfigs().then((res) => {
      _this.form.hbaddrs1 = res.data.data.hbaddrs1;
      if (res.data.data.hbaddrs2) _this.form.hbaddrs2 = res.data.data.hbaddrs2;
    });
  },
  methods: {
    updateHeartBeat() {
      //todo: upload heart beat settings form
      let _this = this;
      updateHB(_this.form).then(() => {
        this.dialogVisible = false;
        this.$message({
          type: "success",
          message: "已更新心跳配置",
        });
      });
    },
  },
};
</script>