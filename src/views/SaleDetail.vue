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

    <!-- <div class="field column is-one-third">
      <label class="label">Sales Type</label>
      <div class="notification is-primary is-light">
          <input type="checkbox">
                Is retail
      </div>
    </div> -->

    <div class="field column is-one-third">
      <label class="label">Sales No.</label>
      <div class="notification is-primary is-light">
          {{ sale.id }}
      </div>
    </div>

    <div class="column is-12 box">
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Product Details</th>
                    <th>Available</th>
                    <th>Packaging</th>
                    <th>Sales Type</th>
                    <th>QTY</th>
                    <th>@Price</th>
                    <th>Disc</th>
                    <th>Total</th>
                </tr>
            </thead>
                <tbody>
                    <SalesBox :sale="sale" :associated_products="associated_products" :sales_receipts="sales_receipts"/>
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
      sales_receipts: [],
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
          this.getSalesReceipts(saleId)
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
    },

    async getSalesReceipts (saleId) {
      this.$store.commit('setIsLoading', true)
      await axios
        .get(`api/v1/sales/receipts/${saleId}`)
        .then(response => {
          this.sales_receipts = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
