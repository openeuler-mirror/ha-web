<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">日志下载</div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      :modal-append-to-body="false"
    >
      <span>日志下载需要一段时间，你确定要立即下载集群日志吗？</span>
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

</style>