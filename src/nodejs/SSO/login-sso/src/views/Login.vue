<template>
  <div class="login">
    <div class="form">
      <el-form ref="form" :model="form" size="small" label-width="80px">
        <div class="title">统一认证中心</div>
        <el-form-item label="用户名：">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456",
      },
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:9999/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          let { data } = res;
          if (data.code === 200) {
            this.$message({
              type: "success",
              message: "登录成功",
            });
            localStorage.setItem("token", data.token);
            // let url = 
          } else {
            this.$message({
              type: "error",
              message: data.msg,
            });
          }
        });
      //   );
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/pexels-quentin-groome-8634120.jpg");
  background-size: 100% 100%;
  .form {
    width: 330px;
    height: 210px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-200px, -50%);
    .el-form {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      padding: 20px 15px;
      border-radius: 5px;
      .el-form-item__label {
        color: #fff;
      }
      .el-form-item:last-child {
        margin-bottom: 0;
      }
      .title {
        font-size: 34px;
        font-weight: 600;
        color: #fff;
        text-align: center;
        margin-bottom: 20px;
      }

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>