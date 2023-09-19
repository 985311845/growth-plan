<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    window.location.href = "http://localhost:8080";
    localStorage.setItem("url", "http:localhost:8081");
  },
};
</script>