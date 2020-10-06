<template>
  <v-form v-model="valid">
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
        <v-col cols="12" md="4">
          <v-text-field
            v-model="siteTitle"
            :rules="nameRules"
            :counter="10"
            label="Site Title"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn class="mr-4" @click="register">
          submit
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    password: "",
    siteTitle: "",
    nameRules: [
      v => !!v || "Username is required",
      v => v.length <= 10 || "Name must be less than 10 characters"
    ],
    passwordRules: [v => !!v || "Password is required"]
  }),
  methods: {
    register: function() {
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
          this.$router.push("/login");
        } else {
          this.email = "";
          this.password = "";
          this.siteTitle = "";
        }
      });
    }
  }
};
</script>
