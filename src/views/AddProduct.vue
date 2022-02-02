<template>
    <div>
      <header-bar></header-bar>
      <v-container>
        <v-row>
          <v-col cols="12">
              <h2 class="text-center pt-5">Add Product</h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-form ref="form">
              <v-text-field label="Name" v-model="product.name" :rules="inputRules" required></v-text-field>
              <v-text-field label="Description" v-model="product.description" :rules="inputRules" required></v-text-field>
              <v-text-field label="Price" v-model="product.price" :rules="inputRules" required></v-text-field>
              <v-text-field label="Quantity" v-model="product.quantity" :rules="inputRules" required ></v-text-field>
              <v-file-input
                label="Picture"
                filled
                v-model="product.image"
                @change="onFileSelected"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-form>
          </v-col>
        </v-row>
      <v-btn color="red float-right pa-5 mt-2 ml-2" dark @click="back">Back</v-btn>
      <v-btn color="indigo float-right pa-5 mt-2" dark @click="addProduct">Submit</v-btn>
      </v-container>   
    </div>
 
</template>

<script>
import HeaderBar from "../components/HeaderBar.vue"
// import axios from 'axios'
// import router from "../router";

export default {
  components: {
    HeaderBar
  },
  data(){
    return {
      product : {
        name: '',
        description: '',
        price: '',
        quantity: '',
        image: null
      },
      inputRules: [
        v => !!v || 'input is required',
      ],
    }
  },
  methods : {
    onFileSelected(){
      this.product.image = event.target.files[0].name;
    },
//Add Product
    addProduct () {
      if (this.$refs.form.validate()) {
        const formData = {
        name:this.product.name,
        description:this.product.description,
        price: this.product.price,
        quantity: this.product.quantity,
        image: this.product.image
        }
        this.$store.dispatch("addProduct",formData)
      }
    },
      
    back () {
      this.$router.push({name:"home"})
    }
  },
  mounted () {
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({name:'Login'})
    }
  
  }
}
</script>
