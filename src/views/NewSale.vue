<template>
  <div class="columns is-multiline">
    <div class="column is-12 title">
        <p class="has-text-centered">New Sale</p>
    </div>
    <hr>

    <div class="field column is-one-third">
      <label class="label">Time Created</label>
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
      <label class="label">Sales Status</label>
      <div class="notification is-primary is-light">
        <div class="select level-item">
          <select v-model="selected_status" @change="createSale()">
            <option v-for="(status,index) in sales_status" :key="index">{{ status }}</option>
          </select>
        </div>
      </div>
    </div>
    <hr>
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

    <div class="column is-two-thirds">
      <label class="label">Add product</label>
      <div class="notification is-primary is-light">
        <SearchBox @add-product-sale="addProducts"/>
      </div>
    </div>

    <div class="column">
      <label class="label">Is retail?</label>
      <div class="notification is-primary is-light">
          <input v-model="retail" type="checkbox">
          Is retail?
      </div>
    </div>

    <hr>

    <div class="column is-one-third">
      <label class="label">Quantity</label>
      <div class="notification is-primary is-light">
          <input v-model="quantity" type="number">
      </div>
    </div>
    <div class="column is-two-third"> 
      <label class="label">Submit Sale?</label>
      <div class="buttons">
        <button class="button is-danger">New Sale</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBox from '../components/SearchBox.vue'

export default {
  name: 'NewSale',
  components: {
    SearchBox
  },
  data () {
    return {
      sales_status: [],
      selected_status: '',
      sale: '',
      product: '',
      receipt: '',
      retail: true,
      quantity: 0
    }
  },
  mounted () {
    this.status()
  },
  methods: {
    status () {
      const stati = ['Pending', 'In-progress', 'Sold']
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
          this.saleId = this.sale.id
        })
        .catch(error => {
          console.log(error)
        })

      this.$store.commit('setIsLoading', false)
    },
    async performSearch (selectedProduct) {
      this.$store.commit('setIsLoading', true)
      console.log(selectedProduct)
      await axios
        .post('api/v1/products/sales_search/', { query: selectedProduct })
        .then(response => {
          this.product = response.data
          this.addProductsToSales(this.sale, this.product)
          console.log(this.product.id)
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },

    async addProductsToSales (sale, productObj) {
      const data = {
        sales: sale,
        products: productObj,
        quantity_sold: this.quantity,
        is_retail: this.retail
      }
      this.$store.commit('setIsLoading', true)
      await axios
        .post(`api/v1/sales/receipts/${sale.id}/`, data)
        .then(response => {
          this.receipt = response.data
          console.log(this.receipt)
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },

    addProducts (selected) {
      this.performSearch(selected)
    }
    // async submitForm () {
    //   const data = {
    //     // 'products': this.products.id,
    //     products: this.products,
    //     quantity_sold: this.quantity_sold,
    //     price_per_unit_retail: this.price_per_unit_retail,
    //     price_per_unit_wholesale: this.price_per_unit_wholesale,
    //     is_retail: this.is_retail,
    //     sales: this.sales
    //   }
    //   this.$store.commit('setIsLoading', true)
    //   await axios
    //     .post('api/v1/sales/receipts/', data)
    //     .then(response => {
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    //   this.$store.commit('setIsLoading', false)
    // }

  }
}
</script>
