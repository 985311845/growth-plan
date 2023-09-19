<template>
  <div class="login4A"></div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      token: "",
    };
  },
  created() {
    console.log(this.$route, "from路由");
    const ssotoken = localStorage.getItem("token");
    this.token = ssotoken;
    this.login4A();
  },
  methods: {
    login4A() {
      axios
        .post("http://localhost:9999/login4A", { ssotoken: this.token })
        .then((res) => {
          let { data } = res;
          if (data.code === 200) {
            this.$message({
              type: "success",
              message: "单点成功",
            });
            // window.location.href = "http://localhost:8081";
          } else {
            this.$message({
              type: "error",
              message: data.msg,
            });
            localStorage.removeItem("token");
            this.$router.push("/login");
          }
        });
    },
  },
};
</script>