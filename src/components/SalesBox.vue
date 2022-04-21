<template>
     <tr>
        <td>{{ item.sales.id }}</td>
        <td>{{ item.products.name }}</td>
        <td>{{ item.quantity_sold }}</td>
        <td>{{ item.price_per_unit_retail }}</td>
        <td>{{ item.sales.sale_amount }}</td>
        <td>{{ item.sales.time_paid }}</td>
    </tr>
</template>

<script>
export default {
    name: 'SalesBox',
    props: {
        sale : Object
    },
}
</script>