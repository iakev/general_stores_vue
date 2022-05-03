<template>
    <div class="page-products-in-category">

        <div class="columns is-multiline">
            <div class="column is-12 title">
                <p class="has-text-centered">{{ category.toUpperCase() }}</p>
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
                            v-bind:key ="parseInt(product.code)"
                            v-bind:product ="product"/>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import ProductBox from '@/components/ProductBox.vue'

export default {
  name: 'Products',
  components: {
    ProductBox
  },
  data () {
    return {
      products: [],
      category: this.$route.params.categorySlug
    }
  },
  mounted () {
    this.getProductsCategory()
  },
  methods: {
    async getProductsCategory () {
      const categorySlug = this.$route.params.categorySlug

      this.$store.commit('setIsLoading', true)

      await axios
        .get(`api/v1/categories/${categorySlug}`)
        .then(response => {
          this.products = response.data
          document.title = 'General Stores | categorySlug'
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
