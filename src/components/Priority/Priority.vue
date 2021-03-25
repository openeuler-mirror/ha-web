<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">首选项配置</div>

    <el-dialog
      title="首选项配置"
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>node-health-green 10 </span>
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
    };
  },
};
</script>
<style lang="scss">
.priority-modal {
  color: white;
  padding-top: 15px;
  padding-bottom: 10px;
}
.priority-modal:hover {
  background-color: #1e242b;
}
.el-dialog__body{
  padding: 0px 20px;
}
</style>