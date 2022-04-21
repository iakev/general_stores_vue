<template>
    <tr>
        <td><router-link >{{ sale.id }}</router-link></td>
        <td>{{  }}</td> <!-- to be implemented when adding users-->
        <td>{{ sale.sale_amount }}</td>
        <td>{{ sale.sale_amount_paid }}</td>
    </tr>

</template>

<script>
export default {
    name: 'SalesListBox',
    props: {
        sale : Object
    },
}
</script>