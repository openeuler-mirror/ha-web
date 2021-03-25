<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">心跳配置</div>

    <el-dialog
      title="心跳配置"
      :visible.sync="dialogVisible"
      width="650px"
      :modal-append-to-body="false"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="主心跳" name="first">
          <el-form ref="form" :model="form">
            <el-form-item label="节点心跳IP-ns187:">
              <el-input placeholder="192.168.100.187"></el-input>
            </el-form-item>
            <el-form-item
              label="节点心跳IP-ns188:"
              placeholder="192.168.100.188"
            >
              <el-input placeholder="192.168.100.188"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="备用心跳" name="second">
          <el-form ref="form" :model="form">
            <el-form-item>
              <el-switch
                v-model="backupHeartBeat"
                inactive-text="启用备用心跳"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="节点心跳IP-ns187:">
              <el-input placeholder="192.168.100.187"></el-input>
            </el-form-item>
            <el-form-item
              label="节点心跳IP-ns188:"
             
            >
              <el-input  placeholder="192.168.100.188"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      activeName: "first",
      backupHeartBeat:false
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style lang="scss">
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
</style>