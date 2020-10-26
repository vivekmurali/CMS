<template>
  <v-container>
    <p class="display-1">{{ this.title }}</p>
    <v-divider />
    <p class="mt-5">{{ this.content }}</p>
    <v-divider />
    <p class="mt-5">
      <span class="font-weight-black" :style="{ fontSize: '1.3rem' }">
        Tags:
      </span>
      <span v-for="tag in tags" :key="tag" :style="{ fontSize: '1.3rem' }">
        {{ tag }}</span
      >
    </p>
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