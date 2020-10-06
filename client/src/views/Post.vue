<template>
  <v-container>
    <h2>{{ this.title }}</h2>
    <p>{{ this.content }}</p>
    <p>{{ this.tags }}</p>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: []
    };
  },
  created() {
    this.title = this.$route.params.title;
    this.content = this.$route.params.content;
    this.tags = this.$route.params.tags;
  }
};
</script>