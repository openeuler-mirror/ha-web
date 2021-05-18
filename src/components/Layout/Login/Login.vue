<template>
  <div class="login">
    <div class="login_bg" onKeyDown="">
      <!-- {/* 头部 */} -->
      <div class="logo">
        <img src="../../../assets/logo.png" />
        <span>openUnicorn HA</span>
      </div>

      <!-- {/* 登录输入 */} -->
      <div class="form">
        <div class="login_text">
          <span>欢迎登录</span>
        </div>

        <el-form class="input_form" v-model="loginForm" ref="loginForm">
          <el-form-item class="input_form-item">
            <el-input
              class="iconfont icon-yonghutouxiang"
              v-model="loginForm.username"
              placeholder="输入用户名"
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <el-form-item class="input_form-item">
            <el-input
              class="iconfont icon-suo"
              v-model="loginForm.password"
              placeholder="输入密码"
              show-password
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn" type="primary" @click.native="onSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/login";
import axios from "axios";
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
      axios
        .post("/api/v1/login", _this.loginForm)
        .then(() => {
          localStorage.setItem("userLogin", _this.loginForm.username);
          this.$store.commit("mutationsUsername", _this.loginForm.username);
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          console.log("login failed" + err);
        });
    },
  },
};
</script>

<style lang="scss">
.login {
  color: #fff;
}
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
  position: relative;
  padding: 5px 10px;

  img {
    width: 50px;
    position: absolute;
    top: 50%;
    left: 10px;
    margin-top: -25px;
  }

  span {
    /* font-size: @font-size-lg; */
    color: #f1f5fb;
    position: absolute;
    top: 50%;
    left: 70px;
    margin-top: -30px;
  }
}

.form {
  position: absolute;
  top: 50%;
  left: 75%;
  margin: -190px 0 0 -160px;
  width: 320px;
  height: 380px;
  box-shadow: 5px 5px 2px rgba(28, 40, 60, 0.08);
  background-color: rgba(0, 0, 0, 0.2);

  .login_text {
    color: #fff;
    text-align: center;
    margin: 36px 0px;
  }
  .input_form {
    padding: 0 40px;

    .el-form-item.input_form-item {
      border-bottom: 1px solid #fff;
      margin-bottom: 36px;

      input.el-input__inner {
        width: 220px;
        background: transparent;
        border: none;
        color: #fff;
      }
    }

    .btn {
      width: 100%;
      height: 36px;
      margin-top: 20px;
      border-radius: 2px;
    }
  }
}
</style>