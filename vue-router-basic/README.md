# clitest

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Vue-cli

    cnpm install -g vue-cli

    vue int <template-name> <project-name>

        <template-name>：表示模板名称，vue-cli官方为我们提供了5种模板，

            webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。
            webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。
            browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。
            browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。
            simple-一个最简单的单页应用模板。

        <project-name>：标识项目名称，这个你可以根据自己的项目来起名字。

# Vue-router
第1节：Vue-router入门

    npm install vue-router --save-dev
    cnpm install vue-router --save-dev

    import Hi from '@/components/Hi' 
    Vue.use(Router)  //Vue全局使用Router

    export default new Router({
        routes: [              //配置路由，这里是个数组
            {//每一个链接都是一个对象
            path:'/hi', //链接路径
            name:'Hi', //路由名称，
            component:Hi //对应的组件模板
            }
        ]
    })

    <router-link to="/">[显示字段]</router-link>

        to：是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成 to=”/” ，
        [显示字段] ：就是我们要显示给用户的导航名称

第2节：vue-router配置子路由

    先用import引入Hi1和Hi2。

    <p>导航 ：
        <router-link to="/">首页</router-link> | 
        <router-link to="/hi">Hi页面</router-link> |
        <router-link to="/hi/hi1">-Hi页面1</router-link> |
        <router-link to="/hi/hi2">-Hi页面2</router-link>
    </p>

    <router-view class="aaa"></router-view>

    {
      path:'/hi',
      component:Hi,
      children:[
        {path:'/',component:Hi},
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }

第3节：vue-router如何参数传递

    一、用name传递参数 ( 有子路由的父级不用设置name属性 )

        1. 在路由文件src/router/index.js里配置name属性。
            routes: [
                {
                path: '/',
                name: 'Hello',
                component: Hello
                }
            ]

        2. 模板里(src/App.vue)用$route.name的形势接收，比如直接在模板中显示：
            <p>{{ $route.name}}</p>

    二、通过<router-link> 标签中的to传参 

        <router-link :to="{name:xxx,params:{key:value}}">valueString</router-link>

        name：就是我们在路由配置文件中起的name值。
        params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。
        
        接收

        {{$route.params.username}}

第4节：单页面多路由区域操作

    App.vue

        <router-view ></router-view>
        <router-view name="left" style="float:left;width:50%;background-color:#ccc;height:300px;"></router-view>
        <router-view name="right" style="float:right;width:50%;background-color:#c0c;height:300px;"></router-view>

    ./src/router/index.js
        routes: [
            {
                path: '/',
                components: {
                    default:Hello,
                    left:Hi1,
                    right:Hi2
                }
                },{
                path: '/Hi',
                components: {
                    default:Hello,
                    left:Hi2,
                    right:Hi1
                }
            }
        ]

    App.vue

        <router-link to="/">首页</router-link> | 
        <router-link to="/hi">Hi页面</router-link> |

第5节：vue-router 利用url传递参数

    {
        path:'/params/:newsId/:newsTitle',
        component:Params
    }

    // 正则传值
    path:'/params/:newsId(\\d+)/:newsTitle',

    <p>新闻ID：{{ $route.params.newsId}}</p>
    <p>新闻标题：{{ $route.params.newsTitle}}</p>

    <router-link to="/params/198/jspang website is very good">params</router-link>

第6节：vue-router 的重定向-redirect

    redirect基本重定向

        {
            path:'/goback',
            redirect:'/'
        }

    重定向时传递参数

        {
            path:'/params/:newsId(\\d+)/:newsTitle',
            component:Params
        },{
            path:'/goParams/:newsId(\\d+)/:newsTitle',
            redirect:'/params/:newsId(\\d+)/:newsTitle'
        }


第7节：alias别名的使用

    路由配置文件里

        {
            path: '/hi1',
            component: Hi1,
            alias:'/jspang'
        }

    配置我们的<router-link>

        <router-link < to="/jspang">jspang</router-link>

    redirect和alias的区别 **

        redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
        alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。
        ** 填个小坑： ** 别名请不要用在path为’/’中，如下代码的别名是不起作用的。

        {
            path: '/',
            component: Hello,
            alias:'/home'
        }

第8节：路由的过渡动画

    <transition>标签

        <transition name="fade">
            <router-view ></router-view>
        </transition>

    ** css过渡类名： ** 组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=”fade”,会有如下四个CSS类名：

        fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
        fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
        fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
        fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。

        .fade-enter {
        opacity:0;
        }
        .fade-leave{
        opacity:1;
        }
        .fade-enter-active{
        transition:opacity .5s;
        }
        .fade-leave-active{
        opacity:0;
        transition:opacity .5s;
        }

    过渡模式mode：

        in-out:新元素先进入过渡，完成之后当前元素过渡离开。
        out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。

第9节：mode的设置和404页面的处理

    ** mode的两个值 **

        histroy:当你使用 history 模式时，URL 就像正常的 url，例如 http://jsapng.com/lms/，也好看！

        hash:默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。

    ** 404页面的设置： **

        这里的path:’*’就是找不到页面时的配置
        {
            path:'*',
            component:Error
        }

        新建一个Error.vue的文件

第10节：路由中的钩子

    {
        path:'/params/:newsId(\\d+)/:newsTitle',
        component:Params,
        beforeEnter:(to,from,next)=>{
        console.log('我进入了params模板');
        console.log(to);
        console.log(from);
        next();
    },

        to:路由将要跳转的路径信息，信息是包含在对像里边的。
        from:路径跳转前的路径信息，也是一个对象的形式。
        next:路由的控制参数，常用的有next(true)和next(false)。
            next({path: 'urllink'}) 跳转到地址

        beforeRouteEnter：在路由进入前的钩子函数。
        beforeRouteLeave：在路由离开前的钩子函数。

第11节：编程式导航

    ** this.$router.go(-1) 和 this.$router.go(1) **

        router.go(-1)代表着后退
        router.go(1):代表着前进

        methods:{
            goback(){
            this.$router.go(-1);
            },
            goHome(){
            this.$router.push('/');
            }
        }

