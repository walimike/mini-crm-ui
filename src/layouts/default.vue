<template>
  <v-app>
    <p>Hello world</p>
    <v-main>
      <router-view />
    </v-main>

    <HomeFooter />
  </v-app>
</template>

<script setup>
import HomeFooter from '../components/HomeFooter.vue'; // Adjust the path if needed
</script>
