<template>
  <div class="navbar">
    <div><h3>Mini CRM</h3></div>
    <div class="navbar-icons">
      <img
        v-if="route.path === '/home'"
        src="@/assets/user_profile.svg"
        alt="crm"
        class="ml-3 mt-1"
        style="height: 26px; width: 26px"
      >
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<style scoped>
.navbar {
  height: 56px;
  background-color: #002445;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  color: white;
  width: 100%;
}

.navbar-icons {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
