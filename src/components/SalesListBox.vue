<template>
  <tr v-for="sale in sales" :key="sale.id">
	 <td><router-link :to="{name: 'SalesDetail', params:{id: sale.id}}">{{ sale.id }}</router-link></td>
	 <td>{{ }}</td> <!-- to be implemented when adding users-->
	 <td>{{ sale.sale_amount }}</td>
	 <td>{{ sale.sale_amount_paid }}</td>
	</tr>
</template>

<script>
export default {
  // name: 'SalesListBox',
  props: {
  	sales: {
    	type: Array,
      required: true
    }
  }
}
</script>
