<template>
  <tr v-for="product in associated_products" :key="product.id">
      <td >{{product.name }}</td>
      <td >{{product.code }}</td>
      <td>{{ product.description }}</td>
      <td v-if="product.quantity > 0">Yes</td>
      <td v-else > No </td>
      <td>{{ product.pack_type }}</td>
      <td><input type="checkbox" v-model="sales_receipts.filter(sales_receipt => sales_receipt.products === product.id)[0].is_retail">
                retail</td>
      <td>{{ sales_receipts.filter(sales_receipt => sales_receipt.products === product.id)[0].quantity_sold }}</td>
      <td v-if="sales_receipts.filter(sales_receipt => sales_receipt.products === product.id)[0].is_retail">{{ product.rate_out_retail }}</td>
      <td v-else>{{ product.rate_out_wholesale }}</td>
      <td> 0 </td>
      <td>{{ sales_receipts.filter(sales_receipt => sales_receipt.products === product.id)[0].price }} </td>
  </tr>
</template>

<script>
export default {
  name: 'SalesBox',
  props: {
    sale: {
      type: Object,
      required: true
    },
    associated_products: {
      type: Array,
      required: true
    },
    sales_receipts: {
      type: Array,
      required: true
    }
  }
}
</script>
