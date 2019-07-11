import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'ShoppingMall', component: ShoppingMall },
    {path: '/register', name: 'register', component: Register},
    {path: '/login', name: 'login', component: Login},
    {path: '/Goods', name: 'Goods', component: Goods},
    {path: '/CategoryList', name: 'CategoryList', component: CategoryList}
  ]
})
