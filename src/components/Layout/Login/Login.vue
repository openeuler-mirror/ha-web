<template>
  <div class="login">
    <div class="login_bg" onKeyDown="">
      <!-- {/* 头部 */} -->
      <div class="logo">
        <img src="" />
        <span></span>
      </div>

      <!-- {/* 登录输入 */} -->
      <div class="form">
        <div class="login_text">
          <span>欢迎登录</span>
        </div>

        <div class="input_div">
          <span></span>
          <input type="text" placeholder="输入用户名" value="" onChange="" />
        </div>
        <div class="input_div">
          <span></span>
          <input type="password" placeholder="输入密码" value="" onChange="" />
        </div>

        <button type="submit" onClick="">登录</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    
};
</script>

<style scoped lang="scss">

.login_bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: url(../../../assets/bg.png) no-repeat;
  background-size: cover;
}



.logo {
  height: 60px;
  line-height: 60px;
  cursor: pointer;
  padding: 5px 10px;

  img {
    width: 50px;
    margin-right: 8px;
  }

  span {
    /* font-size: @font-size-lg; */
    color: #f1f5fb;
  }
}


.form {
  position: absolute;
  top: 50%;
  left: 75%;
  margin: -190px 0 0 -160px;
  width: 320px;
  height: 380px;
  padding: 46px;
  box-shadow: 5px 5px 2px rgba(28, 40, 60, .08);
  background-color: rgba(0, 0, 0, .2);


  .login_text {
    color: #fff;
    // font-size: @font-size-lg;
    text-align: center;
    margin-bottom: 36px;
  }


  button {
    width: 100%;
    height: 36px;
    border-radius: 2px;
    background-color: #c21a1f;
    border: 1px solid #c62227;
    color: #fff;
    outline: none;
    margin-top: 20px;
  }


  .input_div {
    width: 100%;
    height: 36px;
    margin-bottom: 36px;
    border-color: #fff;
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    border-bottom: 1px solid #fff;

    span {
      font-size: 18px;
      color: #fff;
    }

    input {
      height: 36px;
      margin-left: 6px;
      color: #fff;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }


}

</style>