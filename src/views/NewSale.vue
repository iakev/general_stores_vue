<template>

</template>

<script>
import axios from 'axios'
export default {
  name: 'NewSale',
  data () {
      return {

      }
  },
  methods: {
    
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