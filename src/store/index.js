import Vue from 'vue'
import Vuex from 'vuex'
import customer from './modules/customer'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: { customer },
  state: {},
  mutations: {}
})

export default store
