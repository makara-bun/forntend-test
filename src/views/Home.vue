<template>
<div>
  <header-bar></header-bar>
  <layout>
    <template v-slot:add-button>
      <v-btn
        circle
        color="indigo"
        href="/addProduct"
        dark
      >
      <v-icon>mdi-plus</v-icon>
        Add Product
      </v-btn>
    </template>
    <template v-slot:search>
      <v-text-field
        label="search"
        placeholder="Search"
        filled
        rounded
        dense
        v-model="searchProduct"
      ></v-text-field>
    </template>
    <template v-slot:search-btn>
      <v-btn @click="searchData" color="indigo" dark class="mt-2">Search</v-btn>
    </template>
    <template v-slot:table>
      <table-data :productData = "productData"></table-data>
    </template>
    <template v-slot:range>
      <range-slider></range-slider>
    </template>
  </layout>
</div>
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue"
import Layout from "../components/Layout.vue"
import TableData from "../components/TableData.vue"
import RangeSlider from "../components/RangeSlider.vue"

export default {
  components: {
    HeaderBar,
    Layout,
    TableData,
    RangeSlider,
  },
  data () {
    return {
      searchProduct: '',
      productData: []
  }
  },
  methods : {
    async searchData () {
      this.$store.dispatch("searchProduct",{
      search : this.searchProduct
      })
    }
  },
  mounted () {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({name:'login'})
    }
  }
}
</script>
