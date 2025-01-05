<template>
  <div class="footer">
    <router-link to="/home" class="footer-tile" :class="{ active: isActiveLink('/home') }">
      <div class="icon-wrapper">
        <img
          v-if="isActiveLink('/home')"
          src="@/assets/home_active.svg"
          alt="Home"
          class="home-icon"
        >
        <img v-else src="@/assets/home.svg" alt="Home" class="home-icon" >
      </div>
      <span class="nav-text">Home</span>
    </router-link>
    <router-link to="/contacts" class="footer-tile" :class="{ active: isActiveLink('/contacts') }">
      <div class="icon-wrapper">
        <img
          v-if="isActiveLink('/contacts')"
          src="@/assets/contacts_active.svg"
          alt="contacts"
          class="contacts-icon"
        >

        <img v-else src="@/assets/contacts.svg" alt="contacts" class="contacts-icon" />
      </div>
      <span class="nav-text">Contacts</span>
    </router-link>
    <router-link to="/notes" class="footer-tile" :class="{ active: isActiveLink('/notes') }">
      <div class="icon-wrapper">
        <img
          v-if="isActiveLink('/notes')"
          src="@/assets/notes.svg"
          alt="notes"
          class="contacts-icon"
        >

        <img v-else src="@/assets/notes.svg" alt="Input" class="contacts-icon" />
      </div>
      <span class="nav-text">Notes</span>
    </router-link>
    <router-link to="/reminders" class="footer-tile" :class="{ active: isActiveLink('/reminders') }">
      <div class="icon-wrapper">
        <img
          v-if="isActiveLink('/deliveries')"
          src="@/assets/reminders.svg"
          alt="Delivery Icon"
          class="contacts-icon"
        >

        <img v-else src="@/assets/reminders.svg" alt="Input" class="contacts-icon" >
      </div>
      <span class="nav-text">Reminders</span>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

function isActiveLink(path) {
  if (path == '/home' && route.path == '/') {
    return true
  } else {
    return route.path.includes(path)
  }
}
</script>

<style scoped>
.footer {
  /* z-index: 10000; */
  border-top: 1px solid #ced3d9;
  display: flex;
  justify-content: space-around;
  background-color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 74px; /* Increased height */
  color: black;
}

.footer-tile {
  width: 120px;
  margin-top: 3px;

  cursor: pointer;
  padding: 10px;
  transition: background-color 0.3s;
  display: flex;
  flex-direction: column; /* Icons below text */
  justify-content: space-between;
  align-items: center;
}

.footer-tile.active {
  padding: 7px;
  margin-top: 3px;
  border-top: 3px solid #008768;
}

.icon-wrapper {
  margin-bottom: 4px; /* Space between icon and text */
}

.contacts-icon {
  width: 24px; /* Adjust the width as needed */
  height: 24px; /* Adjust the height as needed */
}

.home-icon {
  width: 18px; /* Adjust the width as needed */
  height: 18px; /* Adjust the height as needed */
}

.nav-link {
  text-decoration: none;
  color: inherit;
}

.nav-text {
  color: #5c6c80;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
  text-decoration: none;
}
</style>
