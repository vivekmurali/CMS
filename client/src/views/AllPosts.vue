<template>
  <v-container>
    <h4 class="display-2 text-center">All sites</h4>
    <v-layout allign-center justify-center align-content-center column>
      <template v-for="(site, index) in sites">
        <v-list-item two-line :key="index">
          <v-list-item-content
            :style="{
              background: '#9ba4b4',
              borderRadius: '15px'
            }"
            class="ma-2 pa-2 text-center"
          >
            <v-list-item-title
              ><a
                @click="$router.push(`/posts/${site.siteTitle}`)"
                :style="{ fontSize: '1.8rem', color: '#14274e' }"
                >{{ site.siteTitle }}</a
              ></v-list-item-title
            >
          </v-list-item-content></v-list-item
        ></template
      >
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      sites: []
    };
  },
  created() {
    fetch("http://localhost:3000/allposts")
      .then(response => {
        return response.json();
      })
      .then(res => {
        this.sites = res;
      });
  }
};
</script>