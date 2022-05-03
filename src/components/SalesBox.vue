<template>
     <tr>
        <td>{{ sale.id }}</td>
        <td>{{ sale.products }}</td>
        <td>{{ sale.sale_amount }}</td>
        <!-- <td>{{ price_per_unit_retail }}</td> -->
        <!-- <td>{{ sales.sale_amount_paid }}</td> -->
        <!-- <td>{{ sales.time_paid }}</td> -->
    </tr>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'SalesBox',
  props: {
    sale: {
      // type: {},
      // required: true
    }
  }
  // mounted () {
  //   this.getAssociatedProducts()
  // },
  // data () {
  //   return {
  //     associated_products: []
  //   }
  // },

  // methods: {
  //   async getAssociatedProducts () {
  //     this.$store.commit('setIsLoading', true)

  //     for (const productId of this.sale.products) {
  //       await axios
  //         .get(`api/v1/products/${productId}`)
  //         .then(response => {
  //           this.associated_products.push(response.data)
  //         })
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     }

  //     this.$store.commit('setIsLoading', false)
  //   }
  // }
}
</script>
