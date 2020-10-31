<template>
  <v-app :style="{ background: '#f1f6f9' }">
    <!-- <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link> -->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
