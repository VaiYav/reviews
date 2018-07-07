import Vue from 'vue'
import Router from 'vue-router'

const lazyLoading = (name, index = false) => () => import(`@/components/${name}${index ? '/index' : ''}.vue`)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Customer',
      component: lazyLoading('Customer')
    }
  ]
})
