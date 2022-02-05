<template>
  <v-container>
    <v-data-table
      :headers="header"
      :items="productList"
      item-key="name"
      :item-class="itemRowBackground"
    >
      <template v-slot:item.quantity="{value}" >
        <span class="red--text" v-if="value === 0">Out of stock</span>
        <span v-else>{{value}}</span>
      </template>
      <template v-slot:item.action="{item}">
        <v-btn icon @click="updatePage(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteProduct(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import router from '../router'

export default {
  name:'Table',
  props : ['productData'],
  data () {
    return {
      header: [
        { text: 'Id', value: 'id' },
        { text: 'Name', value: 'name' },
        { text: 'Description', value: 'description' },
        { text: 'Price', value: 'price'},
        { text: 'Quantity', value: 'quantity'},
        { text: 'Actions', value: 'action' }
      ]
    }
  },
  methods: {
//updatePage
    updatePage (item) {
      this.$router.push({path: "/updateProduct/"+item.id})
    },
//deleteProduct
    deleteProduct (id) {
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch("deleteProduct",{id:id})
          setTimeout(() => {
            router.go()
          },600
          );
        }
      })
    },
    itemRowBackground: function (item) {
      console.log(item);
     return item.quantity <= 10 ? 'highlight-color ' : 'normal-color'
    }
  },
  computed : {
    productList () {
      return this.$store.getters.productList
    }
  },
  async mounted () {
    this.$store.dispatch ("getData")
  }
}
</script>

<style>
.highlight-color {
  background-color: #B9F6CA;
}
.normal-color {
  background-color: white;
}
</style>