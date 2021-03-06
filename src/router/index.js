import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

// import store from '../store'

import Category from '../views/Category.vue'
import Products from '../views/Products.vue'
import Sales from '../views/Sales.vue'
import SaleDetail from '../views/SaleDetail'
import NewSale from '../views/NewSale'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/categories',
    name: 'Category',
    component: Category
  },
  {
    path: '/:categorySlug',
    name: 'Products',
    component: Products
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/sales/:id',
    name: 'SalesDetail',
    component: SaleDetail
  },
  {
    path: '/sales/new',
    name: 'NewSale',
    component: NewSale
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
