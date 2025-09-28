<template>
  <div>Selected: {{ selected }}</div>

  <select v-model="selected">
    <!-- <option disabled value="">Please select one</option> -->
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
</template>

<script setup>
import { ref, isRef, isReactive, computed } from 'vue';
const selected = ref();
</script>
