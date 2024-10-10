<template>
  <div class="missing">
    <p>您访问的页面并不存在。</p>
    <a href="/" class="btn">返回</a>
  </div>
</template>
<script>
export default {
  name: "missing",
  data() {
    return {};
  },
  created() {
    setTimeout(() => {
      this.$router.replace("/");
    }, 3000);
  }
};
</script>
<style scoped>

</style>
