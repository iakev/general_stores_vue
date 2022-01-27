<template>
    <div class="page-search level">
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
            <div class="select level-item">
                <select >
                    <option v-for="product in products" v-bind:key=product.id>{{ product.name }}  </option>                
                </select>
            </div> 
        </div>    
    </div>
</template>

<script>
import axios from 'axios'
// import ProductBox from '@/src/components/ProductBox.vue'

export default {
    name : 'SearchBox',
    props : {
        product : Object
    },
    data () {
        return {
            products : [],
            query : '',
        }
    },
   methods : {
       async performSearch(){
           this.$store.commit('setIsLoading',true)
           
           await axios
                    .post('api/v1/products/search/',{'query':this.query})
                    .then( response => {
                        this.products = response.data
                    })
                    .catch( error => {
                        console.log(error)
                    })
            this.$store.commit('setIsLoading',false) 
       }
    }
}
</script>