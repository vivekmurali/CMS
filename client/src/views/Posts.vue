<template>
  <v-container>
    <v-list-item two-line v-for="(post, index) in posts" :key="index">
      <v-list-item-content>
        <v-list-item-title
          ><a
            @click="
              $router.push({
                name: 'Post',
                params: {
                  title: post.title,
                  content: post.content,
                  tags: post.tags
                }
              })
            "
            >{{ post.title }}</a
          ></v-list-item-title
        >
        <v-list-item-subtitle v-for="tag in post.tags" :key="tag">{{
          tag
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: []
    };
  },
  created() {
    fetch(`http://localhost:3000/posts/${this.$route.params.siteTitle}`)
      .then(res => {
        if (res.status == 200) {
          return res.json();
        } else {
          console.log("God is a woman");
        }
      })
      .then(res => {
        this.posts = res;
      });
  }
};
</script>
