<template>
  <v-container>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" class="ml-6">
          Select tag
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in tags" :key="index">
          <v-list-item-title @click="tag = item">{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-layout allign-center justify-center align-content-center column>
      <v-list-item two-line v-for="(post, index) in posts" :key="index">
        <v-list-item-content
          :style="{ background: 'rgba(247, 235, 200, 0.3)' }"
          class="ma-2 pa-2 text-center"
          v-if="post.tags.includes(tag)"
        >
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
              :style="{ fontSize: '1.8rem' }"
              >{{ post.title }}</a
            ></v-list-item-title
          >
          <!-- <v-list-item-subtitle v-for="tag in post.tags" :key="tag">{{
          tag
        }}</v-list-item-subtitle> -->
          <v-list-item-subtitle>
            <span class="font-weight-black" :style="{ fontSize: '1.3rem' }">
              Tags:
            </span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              :style="{ fontSize: '1.3rem' }"
            >
              {{ tag }}</span
            >
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-content
          :style="{ background: 'rgba(247, 235, 200, 0.3)' }"
          class="ma-2 pa-2 text-center"
          v-else-if="tag === ''"
        >
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
              :style="{ fontSize: '1.8rem' }"
              >{{ post.title }}</a
            ></v-list-item-title
          >
          <!-- <v-list-item-subtitle v-for="tag in post.tags" :key="tag">{{
          tag
        }}</v-list-item-subtitle> -->
          <v-list-item-subtitle>
            <span class="font-weight-black" :style="{ fontSize: '1.3rem' }">
              Tags:
            </span>
            <span
              v-for="tag in post.tags"
              :key="tag"
              :style="{ fontSize: '1.3rem' }"
            >
              {{ tag }}</span
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      tags: [],
      tag: ""
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
        this.tags = this.posts.map(post => {
          return post.tags.map(tag => tag);
        });
        this.tags = [].concat.apply([], this.tags);
      });
  }
};
</script>
