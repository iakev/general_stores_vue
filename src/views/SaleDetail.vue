<template>
    <div class="columns is-multiline">
            <div class="column is-12 title">
                <p class="has-text-centered">Sale Detail</p>
            </div>
            <hr>
            <div class="field column is-one-third">
              <label class="label">Sales Time</label>
                <div class="notification is-primary is-light">
                  {{ sale.time_created }}
                </div>
            </div>
            <div class="field column is-one-third">
              <label class="label">Sales Person</label>
              <div class="notification is-primary is-light">
                  <p> <strong>User to be added</strong> </p>
              </div>
            </div>
            <div class="field column is-one-third">
                        <label class="label">Sales Type</label>
                                <input type="checkbox">
                                Is retail
            </div>
            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Code</th>
                            <th>Product Details</th>
                            <th>Available</th>
                            <th>Packaging</th>
                            <th>QTY</th>
                            <th>@Price</th>
                            <th>Disc</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                        <tbody>
                            <SalesBox :sale="sale"/>
                    </tbody>
                </table>
            </div>
    </div>
</template>

<script>
import axios from 'axios'
import SalesBox from '@/components/SalesBox.vue'
export default {
  name: 'SaleDetail',
  components: {
    SalesBox
  },
  data () {
    return {
      sale: {},
      sales_price: [],
      associated_products: []
    }
  },
  mounted () {
    this.getSale()
  },
  methods: {
    async getSale () {
      const saleId = this.$route.params.id

      this.$store.commit('setIsLoading', true)
      await axios
        .get(`api/v1/sales/${saleId}`)
        .then(response => {
          this.sale = response.data
          this.getAssociatedProducts()
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },

    async getAssociatedProducts () {
      this.$store.commit('setIsLoading', true)

      for (const productId of this.sale.products) {
        await axios
          .get(`api/v1/products/${productId}`)
          .then(response => {
            this.associated_products.push(response.data)
          })
          .catch(error => {
            console.log(error)
          })
      }

      this.$store.commit('setIsLoading', false)
    }

    //   async getSalesPrice () {
    //     this.$store.commit('setIsLoading', true)
    //   },

    //   async setPrice () {
    //     await axios
    //       .get('api/v1/')
    //     this.price_per_unit_retail = this.products.rate_out_retail
    //     this.price_per_unit_wholesale = this.products.rate_out_wholesale
    //   },

    //   async chooseSale () {
    //     this.$store.commit('setIsLoading', true)
    //     await axios
    //       .get('api/v1/sales/')
    //       .then(response => {
    //         this.sales = response.data
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })
    //     this.$store.commit('setIsLoading', false)
    //   },

  //   async submitForm () {
  //     const data = {
  //       // 'products': this.products.id,
  //       products: this.products,
  //       quantity_sold: this.quantity_sold,
  //       price_per_unit_retail: this.price_per_unit_retail,
  //       price_per_unit_wholesale: this.price_per_unit_wholesale,
  //       is_retail: this.is_retail,
  //       sales: this.sales
  //     }
  //     this.$store.commit('setIsLoading', true)
  //     await axios
  //       .post('api/v1/sales/receipts/', data)
  //       .then(response => {
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //     this.$store.commit('setIsLoading', false)
  //   }
  }
}
</script>
