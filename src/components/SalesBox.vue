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
export default {
  // name: 'SalesBox',
  props: {
    sale: {
      type: {},
      required: true
    }
  }
}
</script>
