import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Hi',
      // name: 'Hi', // 有子路由的父级不用设置name属性
      component: Hi,
      children: [
        {path: '/', name: 'Hi', component: Hi},
        {path: 'Hi1', name: 'Hi1', component: Hi1},
        {path: 'Hi2', name: 'Hi2', component: Hi2},
      ]
    }
  ]
})
