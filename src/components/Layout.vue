<template>
  <v-container>
    <v-card elevation="3" class="mt-3">
      <v-row>
        <v-col cols="4">
            <v-container>
              <slot name="add-button"></slot>
            </v-container>
        </v-col>
        <v-col cols="6">
          <v-container>
              <slot name="search"></slot>
          </v-container>
        </v-col>
        <v-col cols="2">
          <v-container>
            <slot name= "search-btn"></slot>
          </v-container>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="9">
            <slot name="table"></slot>
        </v-col>
        <v-col cols="3">
            <slot name="range"></slot>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style scoped>

</style>