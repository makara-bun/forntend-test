<template>
<v-app>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account "
                  name="login"
                  label="Email"
                  type="text"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">Login</v-btn>
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
  name: 'Login',
  data () {
    return {
      password: "",
      email: "",
      emailRules: [
        v => !!v || 'email is required',
      ],
      passwordRules: [
        v => !!v || 'password is required',
      ]
    }
  },
  mounted () {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({name:'home'})
    }
  },
  methods: {
  //Login
    async login () {
      this.$store.dispatch("login",{
        email:this.email,
        password:this.password
      })
    }
  }
}
</script>

<style scoped>

</style>