<template>
    <tr>
        <td>{{ product.code }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.pack_type }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.quantity }}</td>
    </tr>

</template>

<script>
export default {
  name: 'ProductBox',
  props: {
    product: Object
  }
}
</script>
