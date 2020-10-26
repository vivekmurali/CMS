<template>
  <v-container>
    <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click="$router.push('/newpost')"
    >
      <span>New post</span>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-list-item two-line v-for="(post, index) in posts" :key="index">
      <v-list-item-content
        :style="{ background: 'rgba(247, 235, 200, 0.3)' }"
        class="ma-2 pa-2 text-center"
      >
        <v-list-item-title :style="{ fontSize: '1.4rem' }"
          ><a
            @click="
              $router.push({
                name: 'Edit',
                params: {
                  title: post.title,
                  content: post.content,
                  tags: post.tags,
                  id: post._id
                }
              })
            "
            :style="{ fontSize: '1.8rem' }"
            >{{ post.title }}</a
          ></v-list-item-title
        >
        <v-list-item-subtitle
          ><span v-for="tag in post.tags" :key="tag">
            {{ tag }}
          </span></v-list-item-subtitle
        >
      </v-list-item-content>
      <v-btn elevation="2" medium @click="del(index)" color="error"
        >delete</v-btn
      >
    </v-list-item>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      posts: []
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
