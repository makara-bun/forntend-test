import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    product: []
  },
  getters : {
    productList: (state) => {
      return state.product
    }
  },
  mutations: {
    //Login
    isLogin (state) {
      state.login = true
    },
    //Get Product
    getProduct (state,product) {
      state.product = product
    },
    // Add Product
    addProduct (state,product) {
      state.product = product
    },
    // SearchProduct
    searchProduct (state,product) {
      state.product = product
    },
    // Filter Product
    filterPrice (state,product) {
      state.product = product
    },
    filterQuantity (state,product) {
      state.product = product
    },
    // Add Product
    insertProduct (state,product) {
      state.product.unshift(product) 
    },
    // Update Product
    updatedProduct (state,product) {
      state.product.unshift(product)
    },
    // Delete Product 
    deletedProduct (state,id) {
      state.product.filter(product => product.id !== id)
    }
  },
  actions: {
    // Login
    login ({commit}, {email,password}) {
      axios.get (`http://localhost:3000/user?email=${email}&password=${password}`)
      .then (result => {
        if (result.status===200 && result.data.length > 0) {
          commit('isLogin',true)
          localStorage.setItem("user-info",JSON.stringify(result.data[0].name))
          // eslint-disable-next-line no-undef
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          router.push({name:'home'})
        }else {
          // eslint-disable-next-line no-undef
          Toast.fire({
            icon: 'error',
            title: 'Invalid Email and Password'
          })
        }
      })
      .catch (error => console.log(error)) 
    },
    // Get Data
    getData ({commit}) {
      axios.get(`http://localhost:3000/product`)
      .then (result => {
        commit('getProduct',result.data)
      })
      .catch (error => console.log(error)) 
    },
    // Search Product
    searchProduct ({commit},{search}) {
      axios.get(`http://localhost:3000/product/?q=${search}`)
      .then(res => {
        commit ('searchProduct',res.data)
      })
    },
    // Filter Search
    searchPrice ({commit},{min,max}) {
      axios.get(`http://localhost:3000/product/?price_gte=${min}&price_lte=${max}`)
      .then(res => {
        commit ('filterPrice',res.data)
      })
    },
    searchQuantity ({commit},{min,max}) {
      axios.get(`http://localhost:3000/product/?quantity_gte=${min}&quantity_lte=${max}`)
      .then(res => {
        commit ('filterQuantity',res.data)
      })
    },
    //Add Product
    addProduct ({commit}, productData) {
      axios.post("http://localhost:3000/product",{
        name: productData.name,
        description : productData.description,
        price : productData.price,
        quantity: productData.quantity,
        image: productData.image
      })
      .then(res => {
        // eslint-disable-next-line no-undef
        Toast.fire({
          icon: 'success',
          title: 'Data added successfully'
        })
        router.push({name:'home'});
        commit('insertProduct',res.data);
      })
      .catch(error=>{
        // eslint-disable-next-line no-undef
        Toast.fire({
            icon: 'error',
            title: 'Data added unsuccessfully '
        })
        error
      })
    },
    //Update Product
    updateProduct ({commit},productData) {
      let id = productData.id
      axios.put(`http://localhost:3000/product/${id}`,{  
        name: productData.name,
        description : productData.description,
        price : productData.price,
        quantity: productData.quantity,
        image: productData.image
      })
      .then(res => {
        // eslint-disable-next-line no-undef
        Toast.fire({
        icon: 'success',
        title: 'Product updated  successfully'
      })
        console.log(res.data);
        router.push({name:'home'});
        commit('updatedProduct',res.data);
      })
      .catch(error=>{
        // eslint-disable-next-line no-undef
        Toast.fire({
          icon: 'error',
          title: 'Product updated unsuccessfully '
        })
        error
      })
    },
    //delete product 
    deleteProduct({commit},{id}) {
      axios.delete(`http://localhost:3000/product/${id}`)
      .then(res => {
        res.data
        commit('deletedProduct',id)
      })
    }
  },
})
