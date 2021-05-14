<template>
  <div class="priority-modal">
    <div class="bar-text" @click="open">日志下载</div>
  </div>
</template>
<script>
import { getLogs } from "@/api/tools";
export default {
  methods: {
    open() {
      this.$confirm(
        "日志下载需要一段时间，你确定要立即下载集群日志吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "正在下载请稍候!",
          });
          console.log("确认操作");
          getLogs().then((res) => {
            let aLink = document.createElement("a");
            let evt = document.createEvent("MouseEvents");
            evt.initEvent("click", false, true);
            aLink.href = res.data.data.filepath;
            aLink.dispatchEvent(evt);
            return Promise.resolve();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消下载",
          });
        });
    },
  },
};
</script>
<style lang="scss">
.el-message-box__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 30%;
}
</style>