import { createStore } from 'vuex'

export default createStore({
  // variables in the front app are kept track of in the state
  state: {
    searched_products: [],
    isAuthenticated: false,
    token: '',
    isLoading: false
  },
  // Syncronized changes to the above variables in the state (can't be changed directly)
  mutations: {
    setIsLoading (state, status) {
      state.isLoading = status
    },
    setSearchedProducts (state, { searched_products }) {
      state.searched_products = searched_products
    }
  },
  // asynchronized functions to change state
  actions: {
    // perform products search and populate searched products with it in the state
    async performSearch ({ commit }) {
      commit('setIsLoading', true)

      await axios
        .post('api/v1/products/search/', { query: this.query })
        .then(response => {
          this.searched_products = response.data
          commit('setSearchedProducts', this.searched_products)
        })
        .catch(error => {
          console.log(error)
        })
      commit('setIsLoading', false)
    }
  },
  modules: {
  }
})
