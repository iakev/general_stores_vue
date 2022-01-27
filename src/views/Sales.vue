<template>
    <div class="page-sales">
        <div class="columns is-multiline">
            <div class="column is-12 title">
                <p class="has-text-centered">Sales</p>
            </div>
            <hr>
            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                            <th>Sale ref.</th>
                            <th>Products</th>
                            <th>Quantity Sold</th>
                            <th>Price</th>
                            <th>Sale Amount.</th>
                            <th>Time Paid</th>
                            <th>Sale Status</th>
                        </tr>
                    </thead>
                        <tbody v-for="item in itemsales"
                            v-bind:key="item.id">
                            <tr>
                                <td>{{ item.id }}</td>
                                <!-- <td>{{ data.products }}</td> -->
                                <!-- <td>{{ data.quantity_sold }}</td> -->
                                <td>{{ item.price }}</td>
                                <td>{{ item.sale_amount }}</td>
                                <td>{{ item.time_paid }}</td>
                            <!--<td>{{ item.sales.sales_status }}</td> -->
                            </tr>
                    </tbody>
                </table>
            </div>
            <div class="has-text-centered subtitle">
                <router-link to="/sales/new" class="button is-primary">Add Sale</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Sales',
    data () {
        return {
            itemsales : [],
            salesxtradata : []
        }
    },
    mounted(){
        this.getSales()
        this.getExtraSaleData()
        document.title = 'General Stores | Sales'
    },
    methods: {
        async getSales(){
            this.$store.commit('setIsLoading',true)

            await axios
                .get(`api/v1/sales/`)
                .then(response => {
                    this.itemsales = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading',false)
        },

        async getExtraSaleData(){
            this.$store.commit('setIsLoading',true)
            await axios
                .get(`api/v1/sales/receipts/`)
                .then(response => {
                    this.salesxtradata = response.data
                })
                .catch(error => {
                    console.log(error)
                })
            this.$store.commit('setIsLoading',false)
        }
    },
    computed: {
        getdata(){
            return this.salesxtradata
        }
    }
}
</script>