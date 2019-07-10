import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'ShoppingMall', component: ShoppingMall },
    {path: '/register', name: 'register', component: Register},
    {path: '/login', name: 'login', component: Login}
  ]
})
