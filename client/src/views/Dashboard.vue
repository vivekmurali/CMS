<template>
  <v-container>
    <v-list-item two-line v-for="(post, index) in posts" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ post.title }}</v-list-item-title>
        <v-list-item-subtitle v-for="tag in post.tags" :key="tag">{{
          tag
        }}</v-list-item-subtitle>
      </v-list-item-content>
      <v-btn elevation="2" medium @click="del(index)">delete</v-btn>
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      posts: [{ title: "hello", content: "hey", tags: ["a", "b"] }]
    };
  },
  methods: {
    del: function(index) {
      const id = this.posts[index]._id;
      fetch(`http://localhost:3000/users/posts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${this.$store.state.auth}`
        }
      })
        .then(() => {
          this.posts.splice(index, 1);
        })
        .catch(err => {
          console.error(err.message);
        });
    }
  },
  created() {
    if (!this.$store.state.auth) {
      this.$router.push("/login");
    } else {
      fetch("http://localhost:3000/posts", {
        headers: {
          Authorization: `Bearer ${this.$store.state.auth}`
        }
      })
        .then(res => {
          if (res.status == 200) {
            return res.json();
          } else {
            console.log("bro it not working");
          }
        })
        .then(res => {
          this.posts = res;
        });
    }
  }
};
</script>
