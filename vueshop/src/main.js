// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
// import Vant from 'vant'
// import 'vant/lib/index.css'
import {Cell, CellGroup, Tabbar, TabbarItem, Button, Row, Col, Swipe, SwipeItem, List, Field, NavBar, Tab, Tabs, PullRefresh, Stepper} from 'vant'
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'

Vue.use(VueLazyload)
Vue.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(List).use(Field).use(NavBar).use(Tab).use(Tabs).use(PullRefresh).use(Stepper).use(Tabbar).use(TabbarItem).use(CellGroup).use(Cell)
// Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
