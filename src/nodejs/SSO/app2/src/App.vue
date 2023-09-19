<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  created() {
    window.location.href = "http://localhost:8080?url=http://localhost:8082";
  },
};
</script>