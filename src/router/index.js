import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import ApolloExample from '@/components/ApolloExample'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ApolloExample',
      component: ApolloExample
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
  ]
})
