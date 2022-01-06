<template>
  <div class="page-home">
    <section class="hero is-primary"> 
      <div class="hero-body has-text-centered">
        <p class="title">
          Welcome to General stores
        </p>
        <p class="subtitle">
          The number one bussiness partner of all household/market items.
        </p>
      </div>
    </section>
    <hr>
    <div class="columns is-multiline">
      <div class="column is-12 title">
        <p class="has-text-centered">Products</p>
      </div>

      <div class="column is-12 box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Pack type</th>
              <th>Description</th>
              <th>Quantity</th>
            </tr>
          </thead>
                
          <tbody>
            <ProductBox
              v-for="product in products"
              v-bind:key="product.id"
              v-bind:product ="product"/>
          </tbody>  
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
// @ is an alias to /src
import ProductBox from '@/components/ProductBox.vue'

export default {
  name: 'Home',
  components : {
    ProductBox
  },
  data () {
    return {
      products : []
    }
  },
  mounted(){
    this.getProducts()
    document.title = 'General Stores | Home'
  },
  methods: {
    async getProducts(){
      this.$store.commit('setIsLoading',true)
      await axios 
        .get(`api/v1/products/`)
        .then(response => {
          this.products = response.data
        })
        .catch(error =>{
          console.log(error)
        })
      this.$store.commit('setIsLoading',false)
    }
  }
}
</script>
