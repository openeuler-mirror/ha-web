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

        <el-form v-model="loginForm" ref="loginForm">
          <el-form-item label="用户名">
            <el-input
              class="input_div"
              v-model="loginForm.username"
              placeholder="用户名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              class="input_div"
              v-model="loginForm.password"
              placeholder="密码"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/login'
import axios from 'axios'
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      let _this = this;
      // axios.post('/api/v1/login',_this.loginForm)
      login(_this.loginForm)
        .then(() => {
          localStorage.setItem('userLogin', _this.loginForm.username);
         	this.$router.push({ path: '/' })
        })
        .catch((err) => {
          console.log("login failed"+err);
        });
        
    },
  },
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
  box-shadow: 5px 5px 2px rgba(28, 40, 60, 0.08);
  background-color: rgba(0, 0, 0, 0.2);

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