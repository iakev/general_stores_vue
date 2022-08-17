<template>
    <div class="autocomplete content">
      <input v-model="search" @input="onChange"
      @keydown.down
      @keydown.up
      @keydown.enter="setProduct(product.name,product.id)"
      class="input" type="text" placeholder="Search product">
      <ul v-show="isOpen" class="autocomplete-results">
        <li v-for="(product, i) in products" :key="i"
        @click="setProduct(product.name,product.id)"
        class="autocomplete-results"> {{ product.name }} </li>
      </ul>
    </div>
</template>

<script>
import axios from 'axios'
// import ProductBox from '@/src/components/ProductBox.vue'

export default {
  name: 'SearchAutocompleteBox',
  data () {
    return {
      products: [],
      search: '',
      selected_products: [],
      isOpen: false
    }
  },
  mounted() {
    document.addEventListener('click',this.handleClickOutside);
  },
  destroyed() {
    document.removeEventListener('click',this.handleClickOutside);
  },
  methods: {
    async performSearch () {
      this.$store.commit('setIsLoading', true)

      await axios
        .post('api/v1/products/search/', { query: this.search })
        .then(response => {
          this.products = response.data
        })
        .catch(error => {
          console.log(error)
        })
      this.$store.commit('setIsLoading', false)
    },
    onChange() {
      this.performSearch();
      this.isOpen = true;
    },
    handleClickOutside(){
      if(!this.$el.contains(event.target)) {
        this.isOpen = false;
      }
    },
    setProduct(product,productId){
      this.selected_products.push(productId);
      this.search = product,
      this.isOpen = false;
    }
  }
}
</script>

<style>
    .autocomplete {
    position: relative;
  }

    .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 60px;
    overflow: auto;
  }

   .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: blue;
    color: white;
  }
  /* #4AAE9B */
</style>