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
                  :error-messages="emailErrors"
                  @blur="$v.email.$touch()"
                  @keypress.enter.prevent="login"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  label="Password"
                  type="password"
                  v-model="password"
                  :error-messages="passwordErrors"
                  @blur="$v.password.$touch()"
                  @keypress.enter.prevent="login"
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
import { required, email } from 'vuelidate/lib/validators'

export default { 
  name: 'Login',
  data () {
    return {
      password: "",
      email: "",
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
      this.$v.$touch()
      this.$store.dispatch("login",{
        email:this.email,
        password:this.password
      })
    }
  },
  computed: {
    emailErrors () {
      const errors = []
        if(!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('Email is required')
        return errors
    },
    passwordErrors () {
      const errors = []
        if(!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
    }
  },
  validations: {
    email: {required, email},
    password: {required}
  }
}
</script>

<style scoped>

</style>