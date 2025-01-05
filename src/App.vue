<template>
  <v-app>
    <HomeHeader />
    <v-main>
      <router-view />
    </v-main>
    <HomeFooter />
  </v-app>
</template>

<script setup>
import HomeFooter from './components/HomeFooter.vue';
import HomeHeader from './components/HomeHeader.vue'; 
</script>
