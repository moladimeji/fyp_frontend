<template>
  <v-app class="app-background">
    <v-expand-transition>
      <v-app-bar color="transparent" flat dense>
        <v-app-bar-nav-icon @click="toggleDrawer" class="hidden"></v-app-bar-nav-icon>
        <v-toolbar-title :class="cursor-pointer" class="app-title" v-on:click="home()">
          <span class="font-weight-light">Hello, You're in the</span> Stars.
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="navbar">
          <v-btn text class="nav-text">About</v-btn>
          <v-btn text class="nav-text">Edit</v-btn>
          <v-btn outlined class="signup-btn">Sign Up</v-btn>
        </div>  
      </v-app-bar>
    </v-expand-transition>

    <v-main>
      <div class="star-layer"></div>
      <div class="foreground-layer"></div>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',

  computed: {
    ...mapState({
      logged: 'logged',
    }),
  },

  methods: {
    home() {
      this.$router.push('/dashboard')
    },
    logout() {
      this.$router.push('/')
    },

    openSettings() {
      // Logic to open settings or a menu
    }
  }
}
</script>

<style scoped>
.app-background {
  background: linear-gradient( #30137e, #6b49e7); /* Example gradient background */
  background-attachment: fixed;
}

.star-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20%; /* Adjust based on your design */
  background-image: url('~@/assets/stars1.png');
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0; /* Ensure it's below the content */
}

/* Ensure the app bar is over the main content */
.v-app-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.app-title {
  font-weight: bold;
  color: #FFFFFF;
}

.navbar {
  display: flex;
  justify-content: center;
  align-items: center; /* Add this line for vertical centering */
  padding-right: 44%;
}


.nav-text {
  color: #FFFFFF; /* Adjust the color to match your theme */
}

.signup-btn {
  border-color: #FFFFFF; /* Adjust the border color to match your theme */
  color: #FFFFFF;
}

/* Hide the navigation drawer icon */
.hidden {
  display: none;
}

/* Add additional styling here */

/* Make main content start from the very top under the transparent app bar */
.v-main {
  padding-top: 70;
  position: relative;
  z-index: 1;
}

/* Ensure the app bar is over the main content */
.v-app-bar {
  position: fixed;
  z-index: 1;
}
</style>