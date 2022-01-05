<template>
    <div class="page-category">
        <div class="columns is-multiline">
            <div class="column is-12">
                <div class="title">
                    <p class="has-text-centered">Categories </p>
                </div>
            </div>
            <hr>
            <div class="column is-3" v-for="category in categories" v-bind:key="category.id">
                <div class="box">
                    <figure class="image mb-4">
                        <img v-bind:src="category.get_thumbnail">
                    </figure>

                    <h3 class="is-size-4">
                        {{ category.name }}
                    </h3>
                    <p>Details click button to view products</p>
                </div>
            </div>                
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Category',
    data (){
        return {
            categories: []
        }
    },
    mounted(){
        this.getCategories()
        document.title = 'Categories | General Stores'
    },
    methods:{
        async getCategories(){
        // const category_slug = this.$route.params.category_slug

        this.$store.commit('setIsLoading',true)
        
        await axios 
            // .get(`api/v1/products/${category_slug}`)
            .get(`api/v1/categories/`)
            .then(response => {
                this.categories = response.data
            })
            .catch(error =>{
                console.log(error)
            })
        this.$store.commit('setIsLoading',false)
        }        
    },
}
</script>

<style scoped>
  .image {
    margin-top: -1.25rem;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
  }
</style>