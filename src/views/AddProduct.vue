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
            <v-text-field 
            label="Name" 
            v-model="product.name"
            :error-messages="nameErrors"
            @blur="$v.product.name.$touch()"
            >
            </v-text-field>
            <v-text-field 
            label="Description" 
            v-model="product.description"
            :error-messages="descriptionErrors"
            @blur="$v.product.description.$touch()"
            > 
            </v-text-field>
            <v-text-field 
            label="Price" 
            v-model.number="product.price"
            :error-messages="priceErrors"
            @blur="$v.product.price.$touch()"
            > 
            </v-text-field>
            <v-text-field 
            label="Quantity" 
            v-model.number="product.quantity"
            :error-messages="quantityErrors"
            @blur="$v.product.quantity.$touch()"
            ></v-text-field>
            <v-file-input
              label="Picture"
              filled
              v-model="product.image"
              prepend-icon="mdi-camera"
              @change="onFileSelected"
              :error-messages="imageErrors"
              @blur="$v.product.image.$touch()"
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
import {required , requiredIf} from 'vuelidate/lib/validators'
import router from "../router";

export default {
  components: {
    HeaderBar
  },
  data(){
    return {
      product : {
        name: '',
        description: '',
        price: null,
        quantity: null,
        image: null,
        fileName: null
      }
    }
  },
  methods : {
    onFileSelected(){
      this.product.fileName = event.target.files[0].name;
    },
    //Add Product
    addProduct () {
      this.$v.$touch();
      const formData = {
      name:this.product.name,
      description:this.product.description,
      price: this.product.price,
      quantity: this.product.quantity,
      image: this.product.fileName,
      }
      if (this.$v.$invalid) {
        return
      } else {
        this.$store.dispatch('addProduct',formData);
      }
      setTimeout(function () {
        router.go();
      },1300);
    }, 
    back () {
      this.$router.push({name:"home"})
    }
  },
    validations: {
      product: {
        name: {required},
        description: {required},
        price: {required},
        quantity: {required},
        image: {
          required: requiredIf(function () {
            return this.product.image === null;
          })
        }
      }
    },
  computed: {
    nameErrors () {
      const errors = []
      if(!this.$v.product.name.$dirty) return errors
      !this.$v.product.name.required && errors.push('Name is required')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if(!this.$v.product.description.$dirty) return errors
      !this.$v.product.description.required && errors.push('description is required')
      return errors
    },
     priceErrors () {
      const errors = []
      if(!this.$v.product.price.$dirty) return errors
      !this.$v.product.price.required && errors.push('price is required')
      return errors
    },
     quantityErrors () {
      const errors = []
      if(!this.$v.product.quantity.$dirty) return errors
      !this.$v.product.quantity.required && errors.push('quantity is required')
      return errors
    },
    imageErrors () {
      const errors = []
      if(!this.$v.product.image.$dirty) return errors
      !this.$v.product.image.required && errors.push('image is required')
      return errors
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
