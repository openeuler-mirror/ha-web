<template>
  <div class="top-bar">
    <div>title</div>
    <el-dropdown class="button-group">
      <el-button type="default"
        >user<i class="el-icon-user el-icon--right"></i
      ></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>刷新设置</el-dropdown-item>
        <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  methods:{
    logout(){
        localStorage.removeItem('userLogin');
        this.$router.push({path:'/login'})
    
    }
  }
};
</script>

<style scoped lang='scss'>
.top-bar {
  color: #fff;
  height: 60px;
  box-shadow: 0px 1px 5px 1px #ecf0f6;
  .button-group {
    margin-top: -10px;
    float: right;
    margin-right: 20px;
  }
}
</style>