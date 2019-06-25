import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'
import Params from '@/components/Params'
import Error from '@/components/Error'

Vue.use(Router)

export default new Router({
  mode: 'history', // 1. history 去掉了 /#  2. hash 增加了 /# (默认)
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
      // components: {
      //   default: HelloWorld,
      //   left: Hi1,
      //   right: Hi2
      // }
    },
    {
      // path: '/params/:newsId/:newsTitle',
      path: '/params/:newsId(\\d+)/:newsTitle',
      component: Params,
      beforeEnter: (to, from, next) =>{
        console.log(to)
        console.log(from)
        // next 控制页面跳转 不写不跳转 
        // next(false)  不跳转
        // next({path: 'urllink'}) 跳转到地址
        next();
      }
    },{
      path: '/goHome',
      redirect: '/'
    },{
      path: '/goParams/:newsId(\\d+)/:newsTitle',
      redirect: '/params/:newsId(\\d+)/:newsTitle'
    },{
      path: '/Hi1',
      component: Hi1,
      alias: '/kang'
    },{
      path: '*',
      component: Error
    }
  ]
})
