<template>
  <div>
    <v-app-bar
      elevation="4"
      color="indigo"
      dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Product Manager</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn plain @click="logout">
        <h4>Logout</h4>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  methods: {
    //Logout
    logout () {
      localStorage.clear();
       // eslint-disable-next-line no-undef
      Toast.fire({
        icon: 'success',
        title: 'Signed out successfully'
      })
      this.$router.push({name:'login'})
    }
  }
}
</script>

<style scoped>

</style>