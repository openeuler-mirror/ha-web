<template>
  <div class="priority-modal">
    <div class="bar-text" @click="dialogVisible = true">集群快捷操作</div>

    <el-dialog
      title="集群快捷操作"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="form">
        <el-form-item>
          <p>集群操作</p>
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <p>操作结果</p>
          <el-input disabled type="textarea"></el-input>
        </el-form-item>
      </el-form>

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
.el-textarea__inner {
  resize: none;
  height: 500px;

  cursor: default;
}
</style>