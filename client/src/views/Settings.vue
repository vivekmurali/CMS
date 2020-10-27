<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-10">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Settings</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="edit()" id="login-form">
                <v-text-field
                  prepend-icon="mdi-head"
                  name="email"
                  v-model="email"
                  label="Email"
                  type="text"
                  :rules="nameRules"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-lock"
                  name="password"
                  v-model="password"
                  label="Password"
                  id="password"
                  type="password"
                  :rules="passwordRules"
                ></v-text-field>
                <v-text-field
                  prepend-icon="mdi-format-title"
                  name="siteTitle"
                  v-model="siteTitle"
                  label="Site Title"
                  type="text"
                  :rules="nameRules"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" type="submit" form="login-form"
                >Submit</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      siteTitle: "",
      nameRules: [
        v => !!v || "Username is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      passwordRules: [
        value => {
          return value.length >= 4 || "Too short.";
        }
      ]
    };
  },
  mounted() {
    // this.username = this.$route.params.username;
    // this.password = this.$route.params.password;
    this.siteTitle = this.$route.params.siteTitle;
  },
  methods: {
    edit: function() {
      console.log("Called edit function");
      fetch(`http://localhost:3000/users/edituser`, {
        method: "PUT",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.$store.state.auth}`
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          siteTitle: this.siteTitle
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
  }
};
</script>