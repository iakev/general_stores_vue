<template>
    <div class="autocomplete content">
      <input v-model="query" @input="onChange"
      @keydown.down
      @keydown.up
      @keydown.enter="setProduct(product.name,product.id)"
      class="input" type="text" placeholder="Search product">
      <ul v-show="isOpen" class="autocomplete-results">
        <li v-for="(product, i) in products" :key="i"
        @click="setProduct(product), $emit('return-search-result', this.search)"
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
      search: [],
      selected_products: [],
      isOpen: false,
      query: ''
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
        .post('api/v1/products/search/', { query: this.query })
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
    setProduct(product){
      this.selected_products.push(product.id);
      this.query = product.name
      this.search = product
      this.isOpen = false;
      this.products = [];
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