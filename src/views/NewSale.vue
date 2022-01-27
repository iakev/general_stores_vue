<template>
    <div class="page-newsale">
        <h1 class="title has-text-centered">
            <strong>New Sale</strong>
        </h1>
        <hr>
        <div class="columns multiline">
            <div class="column is-6">
                <div class="field">
                    <label class="label">Product*</label>
                        <div class="level-left">
                            <div class="level-item">
                                <div class="field has-addons">
                                    <p class="control">
                                        <input @keyup.enter="performSearch()"  v-model="query" class="input" type="text" placeholder="Search product">
                                    </p>
                                    <p class="button is-primary" @click="performSearch()">
                                        <i class="fas fa-search"></i>
                                    </p>
                                </div>   
                            </div>
                    
                            <div id="select-product(s)">
                                <select v-model="products" @change="setPrice()" >
                                    <option v-for="product in searched_products" :value="product"  :key="product.id">
                                        {{ product.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                </div>
            
                <div class="field">
                    <label class="label">Quantity*</label>
                        <div class="control">
                            <input type="text" class="input" v-model="quantity_sold">
                        </div>
                </div>
                <div class="field">
                    <label class="checkbox"></label>
                        <div class="control">
                            <input type="checkbox" v-model="is_retail">
                            Is retail?
                        </div>
                </div>
            </div>

            <div class="column is-6">
                <div class="field">
                    <label class="label">Price (retail)*</label>
                        <div class="control">
                            <input type="text" class="input"  v-model="price_per_unit_retail">
                        </div>
                </div>
                <div class="field">
                    <label class="label">Price (wholessale)*</label>
                        <div class="control">
                            <input type="text"  class="input" v-model="price_per_unit_wholesale">
                        </div>
                </div>
            </div>
        </div>
        <hr>
        <button class="button is-dark" @click="submitForm">Create new Sale</button>
    </div>
</template>

<script>
import axios from 'axios'
import SearchBox from '@/components/SearchBox.vue'

export default {
    name : 'NewSale',
    components : {
        SearchBox
    },
    data () {
        return {
            searched_products: [],
            query: '',
            products : [],
            quantity_sold: 0,
            price_per_unit_retail : '',
            price_per_unit_wholesale : '',
            is_retail : true,
        }
    },
    methods: {
        setPrice(){
            
            this.price_per_unit_retail = this.products.rate_out_retail
            this.price_per_unit_wholesale =this.products.rate_out_wholesale
            // console.log(this.products.rate_out_retail)
        },
       async performSearch(){
           this.$store.commit('setIsLoading',true)
           
           await axios
                    .post('api/v1/products/search/',{'query':this.query})
                    .then( response => {
                        this.searched_products = response.data
                    })
                    .catch( error => {
                        console.log(error)
                    })
            this.$store.commit('setIsLoading',false) 
        },        
        async submitForm(){
            const data = {
                'products': this.products.id,
                // 'products': this.products,
                'quantity_sold': this.quantity_sold,
                'price_per_unit_retail' : this.price_per_unit_retail,
                'price_per_unit_wholesale' : this.price_per_unit_wholesale,
                'is_retail' : this.is_retail,
            }
  
            this.$store.commit('setIsLoading',true)
            
            await axios
                    .post('api/v1/sales/receipts/',data)
                    .then( response => {
                        console.log(response)
                    })
                    .catch( error => {
                        console.log(error)
                    })
            this.$store.commit('setIsLoading',false)
        }
    }
}
</script>