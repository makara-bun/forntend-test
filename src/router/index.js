import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import AddProduct from '../views/AddProduct.vue'
import UpdateProduct from '../views/UpdateProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: "login",
    component: Login,
    path : "/"
  },
  {
    name: "home",
    component: Home,
    path: "/home"
  },
  {
    name: "addProduct",
    component: AddProduct,
    path: "/addProduct"
  },
  {
    name: "updateProduct",
    component: UpdateProduct,
    path: "/updateProduct/:id"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
