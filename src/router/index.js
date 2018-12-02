import Vue from 'vue'
import Router from 'vue-router'
import Admin from '@/components/Admin'
import ApolloExample from '@/components/ApolloExample'
import Vuetify from '@/components/Vuetify'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ApolloExample',
      component: ApolloExample
    },
    {
      path: '/vuetify',
      name: 'Vuetify',
      component: Vuetify
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
  ]
})
