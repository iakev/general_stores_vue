<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="title">
                    <p class="has-text-centered">Categories and their products</p>
                </div>
            </div>
            
            <div class="column is-12 box">
                <table class="table is-fullwidth">
                    <thead>
                        <tr>
                        <th>Code</th>
                        <th>Name</th>
                        <th>Pack type</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                            
                    <tbody>
                        <ProductBox
                        v-for="product in products"
                        v-bind:key="product.id"
                        v-bind:product ="product"/>
                    </tbody>  
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import ProductBox from '@/components.ProductBox.vue'
export default {
    name: 'Category',
    components:{
        ProductBox
    },
    data (){
        return {
            products: []
        }
    },
    mounted(){
        getProducts()
    },
    methods:{
        async getProducts(){
        const category_slug = this.$route.params.category_slug

        this.$store.commit('setIsLoading',true)
        await axios 
            .get(`api/v1/products/${category_slug}`)
            .then(response => {
            this.products = response.data
            })
            .catch(error =>{
            console.log(error)
            })
        this.$store.commit('setIsLoading',false)
        }        
    },

}
</script>