import { createStore } from 'vuex'

export default createStore({
  state: {
    isAuthenticated: false,
    token: '',
    //token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzY4OTg3OTUsInN1YiI6IjEifQ.74x3F9ZIWimgAHRgA8xwD3QwFDy15hW4mUrea_2VnN4',
    isLoading: false,
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem('token')
        state.isAuthenticated = true


      } else {
        state.token = ''
        state.isAuthenticated = false

      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },

    removeToken(state, ){
      state.token = ''
      state.isAuthenticated = false
    }

  },
  actions: {
  },
  modules: {
  }
})
