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
      tags: []
    };
  },
  methods: {
    newpost: function() {
      fetch("http://localhost:3000/users/posts/new", {
        method: "POST",
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
          if (res.status == 201) {
            return res.json();
          } else {
            console.log("OH NO!");
          }
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => console.error(err.message));
    }
  }
};
</script>
