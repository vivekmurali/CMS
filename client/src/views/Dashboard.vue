<template>
  <v-container>
    <v-btn
      class="ma-2 ml-6"
      outlined
      color="#394867"
      @click="$router.push('/newpost')"
    >
      <span>New post</span>
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn
      class="ma-2"
      outlined
      color="#394867"
      @click="
        $router.push({
          name: 'Settings',
          params: {
            siteTitle: siteTitle
          }
        })
      "
    >
      <span>Settings</span>
      <v-icon>mdi-cog</v-icon>
    </v-btn>

    <template v-for="(post, index) in posts">
      <v-list-item
        two-line
        :style="{ background: '#9ba4b4', borderRadius: '15px' }"
        :key="index"
        class="ma-2 pa-2 text-center"
      >
        <v-list-item-content>
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
              :style="{ fontSize: '1.8rem', color: '#14274e' }"
              >{{ post.title }}</a
            ></v-list-item-title
          >
          <v-list-item-subtitle
            ><span
              v-for="tag in post.tags"
              :key="tag"
              :style="{ fontSize: '1.3rem', color: '#394867' }"
            >
              {{ tag }}
            </span></v-list-item-subtitle
          >
        </v-list-item-content>
        <v-btn elevation="2" medium @click="del(index)" color="error"
          >delete</v-btn
        >
      </v-list-item>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      posts: [],
      test: "what",
      siteTitle: ""
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
          this.siteTitle = this.posts[0].siteTitle;
        });
    }
  }
};
</script>
