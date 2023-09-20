<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    window.location.href = "http://localhost:8082/login4A";
    localStorage.setItem("url", "http:localhost:8081");
  },
};
</script>