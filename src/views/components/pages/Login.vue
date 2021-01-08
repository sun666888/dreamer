<template>
  <div class="app flex-row align-items-center login-page" id="login-page">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h1 class="title">梦想家后台管理系统</h1>
            <div class="zhong">
              <p
                  :class="{'login-info-error animated shake':login_err}"
                  v-show="login_err"
              >{{info}}</p>
              <div class="input-group mb-3">
                  <span class="input-group-addon input-group-bg">
                  <i class="icon-user"></i>
                  </span>
                  <input
                  prefix-icon="el-icon-search"
                  type="text"
                  @focus="login_err=false"
                  v-model="form.username"
                  class="form-control"
                  placeholder="请输入用户名"
                  autocomplete="username"
                  />
              </div>
              <div class="input-group mb-4">
                  <span class="input-group-addon">
                  <i class="icon-lock"></i>
                  </span>
                  <input
                  type="password"
                  @focus="login_err=false"
                  v-model="form.password"
                  class="form-control"
                  placeholder="请输入密码"
                  @keyup.enter="login"
                  autocomplete="current-password"
                  />
              </div>
              <div class="text-center">
                  <button type="button" :loading='isLoad' class="btn btn-primary px-4" @click="login">登录</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "element-ui";
import loginSrv from "@//views/services/login.service.js";
import axios from "axios";

/* eslint-disable */
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoad: false,
      info: "",
      login_err: false,
    };
  },
  methods: {
    login() {
      let loading = null;
      let self = this;
      if (!(this.form.username && this.form.password)) {
        this.$message.error('请输入完整信息')
      } else {
        this.isLoad = true
        loginSrv.login(this.form).then(
          res => {
            if (res.status == 200) {
              this.isLoad = false
              this.$message.success("登录成功");
              this.$router.push("/projectSettings/denglu");
              window.localStorage.setItem("token", res.data.token);
            } else {
              this.isLoad = false
              this.$message.error(res.msg);
            }
          },
          err => {
            this.isLoad = false
            this.$message.error(err.msg);
          }
        );
      }
    },
  }
};
</script>

<style scoped>
/* .app { */
  /* background-color: #2d3a4b */
/* } */

.app #login-page {
  /* background: url('../../../../static/img/bg.jpg')no-repeat; */
  background-size: 100% auto;
}

h1 {
  font-family: "Courier New", Courier, monospace;
  margin-bottom: 20px;
  text-align: center;
  color: #000;
}
form {
  background: rgba(0, 0, 0, 0.3);
}
/* .el-tabs__nav-wrap
.el-tabs__nav-scroll
.el-tabs__nav {
    width: 100%;
    display: flex;
    justify-content: space-around;
} */
.center {
  /* width: 50%; */
  margin: 0 auto;
}
.el-tabs {
  width: 100%;
}
.el-tabs__nav-scroll {
  margin: 0 auto;
}
input {
  border-radius: 5px;
  height: 40px;
}
input:-webkit-autofill {
  background-color: #ffffff;
  background-image: none;
}
.zhong {
    padding: 20px 0;
}
.login-info-error {
  background: #f2dede;
  text-align: center;
  font-size: 16px;
  color: red;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
}
.card {
  border-radius: 8px;
  /* ie11 */
  /* -ms-flex: 10; */
}
.cp {
  color: #111111;
  text-align: center;
}
.app,
app-dashboard,
app-root {
  /* ie11 */
  height: 100vh;
}
.btn {
    width: 100%;
}
/* .btnzhuce {
    text-align: right;
    color: #20a8d8;
    font-size: 12px;
} */
.zctitle {
    color: #20a8d8;
    font-weight: bold;
    font-size: 20px;
}
</style>
