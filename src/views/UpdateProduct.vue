<template>
    <div>
      <header-bar></header-bar>
      <v-container>
        <v-row>
          <v-col cols="12">
              <h2 class="text-center pt-5">Update Product</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Name" v-model="product.name"></v-text-field>
            <v-text-field label="Description" v-model="product.description"></v-text-field>
            <v-text-field label="Price" v-model="product.price"></v-text-field>
            <v-text-field label="Quantity" v-model="product.quantity"></v-text-field>
            <v-file-input
              label="Picture"
              filled
              v-model="product.image"
              @change="onFileSelected"
              prepend-icon="mdi-camera"
            ></v-file-input>
          </v-col>
        </v-row>
      <v-btn color="red float-right pa-5 mt-2 ml-2" dark @click="back">Back</v-btn>
      <v-btn color="indigo float-right pa-5 mt-2" @click="updateProduct"  dark>Save</v-btn>
      </v-container>   
    </div>
 
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue"
import axios from 'axios'

export default {
  name: 'Update',
  components: {
    HeaderBar
  },
  data(){
    return {
      id: null,
      product : {
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null
      }
    }
  },
  methods : {
    onFileSelected(){
      this.product.image = event.target.files[0].name;
    },
    back () {
      this.$router.push({name:"home"})
    },
  //Update Product 
    updateProduct () {
      const formData = {
        id:this.id,
        name:this.product.name,
        description:this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
        image: this.product.image
      }
      console.log(this.id);
      this.$store.dispatch("updateProduct",formData)
    },
  },
  async mounted () {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({name:'home'})
    }
    const result = await axios.get('http://localhost:3000/product/'+ this.$route.params.id);
    this.id = this.$route.params.id
    this.product = result.data
  }
}
</script>
