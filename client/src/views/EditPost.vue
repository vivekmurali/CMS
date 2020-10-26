<template>
  <v-container>
    <v-text-field
      label="Title"
      placeholder="My First Post"
      v-model="title"
      outlined
    ></v-text-field>
    <v-textarea
      outlined
      v-model="content"
      name="input-7-4"
      label="Content"
      placeholder="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    ></v-textarea>
    <v-combobox
      v-model="tags"
      hint="Maximum of 5 tags"
      label="Add some tags"
      multiple
      small-chips
    >
    </v-combobox>
    <v-btn color="primary" @click="newpost">Submit</v-btn>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      tags: [],
      id: ""
    };
  },
  methods: {
    newpost: function() {
      fetch(`http://localhost:3000/users/posts/edit/${this.id}`, {
        method: "PUT",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.auth}`
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
          tags: this.tags
        })
      })
        .then(res => {
          if (res.status == 200) {
            this.$router.push("/");
          } else {
            console.log("OH NO!");
          }
        })
        .catch(err => console.error(err.message));
    }
  },
  mounted() {
    this.title = this.$route.params.title;
    this.content = this.$route.params.content;
    this.tags = this.$route.params.tags;
    this.id = this.$route.params.id;
  }
};
</script>
