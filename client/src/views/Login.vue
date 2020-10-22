<template>
  <!-- <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="email"
            :rules="nameRules"
            :counter="10"
            label="Username"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="Password"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="mr-4" @click="login">
          submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form> -->
  <v-app id="inspire">
    <v-snackbar v-model="snackbar" :timeout="4000" top color="error">
      <span>{{ snackbarText }}</span>
      <v-btn text color="white" @click="snackbar = false">Close</v-btn>
    </v-snackbar>

    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-10">
              <v-toolbar dark color="primary">
                <v-toolbar-title v-if="login">Sign in</v-toolbar-title>
                <v-toolbar-title v-if="!login">Sign up</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  @submit.prevent="login ? signin() : signup()"
                  id="login-form"
                >
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
                    v-if="!login"
                  ></v-text-field>
                </v-form>
                <p
                  class="text-xs-center primary--text"
                  @click="login = true"
                  v-if="!login"
                >
                  <a>Already have an account? Sign in</a>
                </p>
                <p
                  class="text-xs-center primary--text"
                  @click="login = false"
                  v-if="login"
                >
                  <a>Don't have an account? Sign up</a>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  v-if="login"
                  type="submit"
                  form="login-form"
                  :loading="loading"
                  >Login</v-btn
                >
                <v-btn
                  color="primary"
                  v-if="!login"
                  type="submit"
                  form="login-form"
                  :loading="loading"
                  >Sing up</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    password: "",
    siteTitle: "",
    login: true,
    loading: false,
    nameRules: [
      v => !!v || "Username is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    passwordRules: [
      value => {
        return value.length >= 4 || "Too short.";
      }
    ],
    snackbar: false,
    snackbarText: ""
  }),
  methods: {
    signin: function() {
      this.loading = true;
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: this.email, password: this.password })
      })
        .then(res => {
          if (res.status == 200) {
            this.loading = false;
            return res.json();
          } else {
            this.email = "";
            this.password = "";
            this.loading = false;
            this.snackbarText = "Could not login";
            this.snackbar = true;
          }
        })
        .then(res => {
          this.$store.state.auth = res.token;
          this.$router.push("/");
        });
    },
    signup: function() {
      this.loading = true;
      fetch("http://localhost:3000/users/register", {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
          siteTitle: this.siteTitle
        })
      }).then(res => {
        if (res.status == 200) {
          this.loading = false;
          this.$router.push("/");
        } else {
          this.loading = false;
          this.snackbarText = "Error signing up";
          this.snackbar = true;
          this.email = "";
          this.password = "";
          this.siteTitle = "";
        }
      });
    }
  }
};
</script>
