<template>
  <div class="priority-modal">
    <div class="bar-text" @click="open">{{ $t("sidebar.log") }}</div>
  </div>
</template>
<script>
import { getLogs } from "@/api/tools";
export default {
  methods: {
    open() {
      this.$confirm(this.$t("sidebar.logTips"), this.$t("sidebar.tips"), {
        confirmButtonText: this.$t("common.confirm"),
        cancelButtonText: this.$t("common.cancel"),
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: this.$t("sidebar.wait"),
          });
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
            message: this.$t("sidebar.cancel"),
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