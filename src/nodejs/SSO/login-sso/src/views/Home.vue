<template>
  <div class="home"></div>
</template>

<script>
export default {
  beforeCreate() {
    window.parent.postMessage(
      {
        token: localStorage.getItem("token"),
      },
      "*"
    );
  },
};
</script>
