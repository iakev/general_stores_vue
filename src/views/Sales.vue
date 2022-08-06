<template>
    <div class="page-sales">
        <div class="columns is-multiline">
            <div class="column is-12 title">
                <p class="has-text-centered">Sales List</p>
            </div>

            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                          <th>Sale Ref.</th>
                          <th>Sales Person</th>
                          <th>Sale Amount</th>
                          <th>Amount Paid</th>
                          <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        <SalesListBox :sales="sales"/> <!-- passing sales into salesListBox as a prop -->
                    </tbody>
                </table>
            </div>
        </div>
        <router-link to="/sales/new" class="button is-dark mt-4">
            New Sale
        </router-link>
    </div>
</template>

<script>
import axios from 'axios'
import SalesListBox from '@/components/SalesListBox.vue'
export default {
  name: 'Sales',
  components: {
    SalesListBox
  },
  data () {
    return {
      sales: []
    }
  },
  mounted () {
    this.getSales()
    document.title = 'General Stores | Sales'
  },
  methods: {
    async getSales () {
      this.$store.commit('setIsLoading', true)

      await axios
        .get('api/v1/sales/')
        .then(response => {
          this.sales = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    }

    // async submitForm(){
    //     const data = {
    //         // 'products': this.products.id,
    //         'products': this.products,
    //         'quantity_sold': this.quantity_sold,
    //         'price_per_unit_retail' : this.price_per_unit_retail,
    //         'price_per_unit_wholesale' : this.price_per_unit_wholesale,
    //         'is_retail' : this.is_retail,
    //         'sales' : this.sales,
    //     }
    //     this.$store.commit('setIsLoading',true)
    //     await axios
    //             .post('api/v1/sales/receipts/',data)
    //             .then( response => {
    //             })
    //             .catch( error => {
    //                 console.log(error)
    //             })
    //     this.$store.commit('setIsLoading',false)
    // }
  }
}
</script>
