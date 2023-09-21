<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    // debugger;
    if (localStorage.getItem("token")) {
      console.log("登录成功");
    } else {
      let url = window.location.href;
      window.location.href = `http://localhost:8080/#/login?redirectionURL=${url}`;
    }
  },
};
</script>