# vuexdemo

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

1. vuex 入门

    a. 安装
    
        npm n install vuex --save

    b. 使用

        import Vue from 'vue';
        import Vuex from 'vuex';

        Vue.use(Vuex);

        const state={
            count:1
        }

        export default new Vuex.Store({
            state    
        })

    c. 调用mutations

        @click="$store.commit('add')"

2. state访问状态对象

     一、通过computed的计算属性直接赋值

        computed:{
            count(){
                return this.$store.state.count;
            }
        }

    二、通过mapState的对象来赋值

        import {mapState} from 'vuex';

        computed:mapState({
            count:state=>state.count
        })

    三、通过mapState的数组来赋值

        computed:mapState(["count"])

3. Mutations修改状态

    a. $store.commit( )

        @click="$store.commit('add')"

        const mutations={
            add(state){
                state.count++;
            },
            reduce(state){
                state.count--;
            }
        }

    b. 传值

        const mutations={
            add(state,n){
                state.count+=n;
            },
            reduce(state){
                state.count--;
            }
        }

        @click="$store.commit('add',10)"

    c. 模板获取Mutations方法

        1.在模板count.vue里用import 引入我们的mapMutations：
        import { mapState,mapMutations } from 'vuex';

        2.在模板的<script>标签里添加methods属性，并加入mapMutations
        methods:mapMutations([
                'add','reduce'
        ]),

4. getters计算过滤操作

    a. getters基本用法

        const getters = {
            count:function(state){
                return state.count +=100;
            }
        }

        export default new Vuex.Store({
            state,mutations,getters
        })

        computed:{
            ...mapState(["count"]),
            count(){
                return this.$store.getters.count;
            }
        },

    b. 用mapGetters简化模板写法

        import { mapState,mapMutations,mapGetters } from 'vuex';

        computed: {
            ...mapGetters(["count"])
        }

5. actions异步修改状态

    a. 声明actions

        const actions ={
            addAction(context){
                context.commit('add',10)
            },
            reduceAction({commit}){
                commit('reduce')
            }
        }

        context：上下文对象，这里你可以理解称store本身。
        {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。

        import {mapActions} from 'vuex'
        methods:{
            ...mapMutations([  
                'add','reduce'
            ]),
            ...mapActions(['addAction','reduceAction'])
        },

    b. 增加异步检验

        setTimeOut(()=>{context.commit(reduce)},3000);
        console.log('我比reduce提前执行');

6. module模块组

    a. 声明模块组

        const moduleA={
            state,mutations,getters,actions
        }
        export default new Vuex.Store({
            modules:{a:moduleA}
        })

    b. 使用

        1. 直接使用
        <h3>{{$store.state.a.count}}</h3>

        2. 简单方法
        <h3>{{count}}</h3>
        computed:{
            count(){
                return this.$store.state.a.count;
            }
        },