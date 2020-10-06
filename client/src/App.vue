<template>
  <v-app>
    <router-link to="/register">Register</router-link>
    <router-link to="/login">Login</router-link>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>
