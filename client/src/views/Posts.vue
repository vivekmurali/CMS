<template>
  <v-container>
    <h3 class="display-3 text-center">{{ this.siteTitle }}</h3>
    <v-row>
      <v-col class="ml-5" cols="4">
        <v-select
          :items="tags"
          label="Choose tag"
          v-model="tag"
          outlined
        ></v-select
      ></v-col>
    </v-row>
    <v-layout allign-center justify-center align-content-center column>
      <template v-for="(post, index) in posts">
        <v-list-item two-line :key="index" v-if="post.tags.includes(tag)">
          <v-list-item-content
            :style="{
              background: '#9ba4b4',
              borderRadius: '15px'
            }"
            class="ma-2 pa-2 text-center"
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
                :style="{ fontSize: '1.8rem', color: '#14274e' }"
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
                :style="{ fontSize: '1.3rem', color: '#394867' }"
              >
                {{ tag }}</span
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :key="index" v-else-if="tag === ''">
          <v-list-item-content
            :style="{
              background: '#9ba4b4',
              borderRadius: '15px'
            }"
            class="ma-2 pa-2 text-center"
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
                :style="{ fontSize: '1.8rem', color: '#14274e' }"
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
                :style="{ fontSize: '1.3rem', color: '#394867' }"
              >
                {{ tag }}</span
              >
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      tags: [],
      tag: "",
      siteTitle: ""
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
        this.tags = [...new Set(this.tags)];
        this.siteTitle = this.posts[0].siteTitle;
      });
  }
};
</script>
