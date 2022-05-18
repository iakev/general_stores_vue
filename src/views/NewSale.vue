<template>
  <div class="columns is-multiline">
    <div class="column is-12 title">
        <p class="has-text-centered">New Sale</p>
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
      <div class="select level-item">
        <select v-model="selected_status" @change="createSale()">
          <option v-for="(status,index) in sales_status" :key="index">{{ status }}</option>
        </select>
      </div>
    </div>

    <!-- <div class="field column is-one-third">
      <label class="label">Sales No.</label>
      <div class="notification is-primary is-light">
          {{ sale.id }}
      </div>
    </div> -->

    <!-- <div class="column is-12 box">
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
    </div>  -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'NewSale',
  data () {
    return {
      sales_status: [],
      selected_status: '',
      sale: ''
    }
  },
  mounted () {
    this.status()
  },
  methods: {
    status () {
      const stati = ['Pending', 'In-progress', 'Sold']
      // this.sales_status.push('Pending')
      // this.sales_status.push('In-progress')
      // this.sales_status.push('Sold')
      for (const stat of stati) {
        this.sales_status.push(stat)
      }
    },
    async createSale () {
      const data = {
        status: this.selected_status
      }

      this.$store.commit('setIsLoading', true)
      await axios
        .post('api/v1/new_sale', data)
        .then(response => {
          this.sale = response.data
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },
    async submitForm () {
      const data = {
        // 'products': this.products.id,
        products: this.products,
        quantity_sold: this.quantity_sold,
        price_per_unit_retail: this.price_per_unit_retail,
        price_per_unit_wholesale: this.price_per_unit_wholesale,
        is_retail: this.is_retail,
        sales: this.sales
      }
      this.$store.commit('setIsLoading', true)
      await axios
        .post('api/v1/sales/receipts/', data)
        .then(response => {
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    }

  }
}
</script>
