
# 开始和指令
1. start

    var app=new Vue({
        el:'#app',
        data:{
            message:'hello Vue!'
        }
    })

2. 指令
    
    v-if

        v-if:是vue 的一个内部指令，指令用在我们的html中。
        v-if用来判断是否加载html的DOM，比如我们模拟一个用户登录状态，在用户登录后现实用户名称。

    v-show

        调整css中display属性，DOM已经加载，只是CSS控制没有显示出来。
    区别

        v-if： 判断是否加载，可以减轻服务器的压力，在需要时加载。
        v-show：调整css dispaly属性，可以使客户端操作更加流畅

    v-for

        <li v-for="item in items">
            {{item}}
        </li>

        排序输出
        <ol>
            <li v-for="item2 in sortItems">{{item2}}</li>
        </ol>

    v-text & v-html

        <span>{{ message }}</span>=<span v-text="message"></span><br/>

        如果在javascript中写有html标签，用v-text是输出不出来的，这时候我们就需要用v-html标签了。
        <span v-html="msgHtml"></span>

    v-on

        v-on === @on

        <button v-on:click="jiafen">加分</button>
        <button v-on:click="jianfen">减分</button>

        methods:{
            jiafen:function(){
                this.count++;
            },
            jianfen:function(){
                this.count--;
            }
        }

        键盘回车事件v-on:keyup.enter

    v-model 双向绑定

        v-model="message"

        修饰符

            .lazy：取代 input 监听 change 事件。
            .number：输入字符串转为数字。
            .trim：输入去掉首尾空格。

    v-bind
        v-bind是处理HTML中的标签属性的，例如就是一个标签，也是一个标签，我们绑定上的src进行动态赋值。 

        v-bind 缩写

        <!-- 完整语法 -->
        <a v-bind:href="url"></a>
        <!-- 缩写 -->
        <a :href="url"></a>

        绑定CSS样式
        
        1、直接绑定class样式

            <div :class="className">1、绑定classA</div>
        
        2、绑定classA并进行判断，在isOK为true时显示样式，在isOk为false时不显示样式。

            <div :class="{classA:isOk}">2、绑定class中的判断</div>
        
        3、绑定class中的数组

            <div :class="[classA,classB]">3、绑定class中的数组</div>

        4、绑定class中使用三元表达式判断

            <div :class="isOk?classA:classB">4、绑定class中的三元表达式判断</div>

        5、绑定style

            <div :style="{color:red,fontSize:font}">5、绑定style</div>

        6、用对象绑定style样式

            <div :style="styleObject">6、用对象绑定style样式</div>

            var app=new Vue({
                el:'#app',
                data:{
                    styleObject:{
                        fontSize:'24px',
                        color:'green'
                    }
                }
            })

    其他内部指令 v-pre & v-cloak & v-once

    v-pre指令

        在模板中跳过vue的编译，直接输出原始值。就是在标签中加入v-pre就不会输出vue中的data值了。

        <div v-pre>{{message}}</div>

    v-cloak指令

        在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用
        
        css
            [v-cloak] {
                display: none;
            }
        
        html

            <div v-cloak>
                {{ message }}
            </div>

    v-once指令

        在第一次DOM时进行渲染，渲染完成后视为静态内容，跳出以后的渲染过程。
        <div v-once>第一次绑定的值：{{message}}</div>
        <div><input type="text" v-model="message"></div>

# 全局API

3. Vue.directive 自定义指令

    Vue.directive('directiveName',function(el,binding,vnode){
        // doing
    });

    el: 指令所绑定的元素，可以用来直接操作DOM。
    binding: 一个对象，包含指令的很多信息。
    vnode: Vue编译生成的虚拟节点。

    自定义指令的生命周期

        自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind

        bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
        inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
        update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
        componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
        unbind:只调用一次，指令与元素解绑时调用。

        bind:function(){//被绑定
            console.log('1 - bind');
        },
        inserted:function(){//绑定到节点
            console.log('2 - inserted');
        },
        update:function(){//组件更新
            console.log('3 - update');
        },
        componentUpdated:function(){//组件更新完成
            console.log('4 - componentUpdated');
        },
        unbind:function(){//解绑
            console.log('1 - bind');
        }

        解绑

            app.$destroy()
            methods: {
                destroy: function (){
                    this.$destroy();
                }
            }

4. Vue.extend 

    Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。

    
    <author></author>
    <div id="author"></div>  

    实例

        var authorExtend = Vue.extend({
            template: "<p><a :href='authorUrl'>{{authorName}}</a></p>",
            data: function (){
                return {
                    authorName: 'king',
                    authorUrl: 'https://www.bilibili.com/'
                }
            }
        })

    绑定

        new authorExtend().$mount("author");
        new authorExtend().$mount("#author");

5. Vue.set

    Vue.set 的作用就是在构造器外部操作构造器内部的数据、属性或者方法。

    一、引用构造器外部数据：

        什么是外部数据，就是不在Vue构造器里里的data处声明，而是在构造器外部声明，然后在data处引用就可以了。外部数据的加入让程序更加灵活，我们可以在外部获取任何想要的数据形式，然后让data引用。

    二、在外部改变数据的三种方法：

        1、用Vue.set改变

            function add(){
                Vue.set(outData,'count',4);
            }

        2、用Vue对象的方法添加

            app.count++;

        3、直接操作外部数据

            outData.count++;

    三、为什么要有Vue.set的存在?

        由于Javascript的限制，Vue不能自动检测以下变动的数组。

        当你利用索引直接设置一个项时，vue不会为我们自动更新。
        当你修改数组的长度时，vue不会为我们自动更新。

6. Vue 生命周期

        beforeCreate:function(){
            console.log('1-beforeCreate 初始化之后');
        },
        created:function(){
            console.log('2-created 创建完成');
        },
        beforeMount:function(){
            console.log('3-beforeMount 挂载之前');
        },
        mounted:function(){
            console.log('4-mounted 被创建');
        },
        beforeUpdate:function(){
            console.log('5-beforeUpdate 数据更新前');
        },
        updated:function(){
            console.log('6-updated 被更新后');
        },
        activated:function(){
            console.log('7-activated');
        },
        deactivated:function(){
            console.log('8-deactivated');
        },
        beforeDestroy:function(){
            console.log('9-beforeDestroy 销毁之前');
        },
        destroyed:function(){
            console.log('10-destroyed 销毁之后')
        }

7. Template 模版

    一、直接写在选项里的模板

        var app=new Vue({
            template:`
                <h1 style="color:red">我是选项模板</h1>
            `
        })

    二、写在template标签里的模板

        <template id="demo2">
                <h2 style="color:red">我是template标签模板</h2>
        </template>
        var app=new Vue({
            template:'#demo2'
        })
    
    三、写在script标签里的模板

        <script type="x-template" id="demo3">
            <h2 style="color:red">我是script标签模板</h2>
        </script>
        var app=new Vue({
            template:'#demo3'
        })

8. Component 组件

    一、全局化注册组件

        <componentName></componentName>
        Vue.component('componentName',{
            template:`<div style="color:red;">全局化注册的标签</div>`
        })

    二、局部注册组件局部

        <panda></panda>
        <div id="app">
            <panda></panda>
        </div>
        var app=new Vue({
            components:{
                // 必须是字符串
                "panda":{
                    template:`<div style="color:red;">局部注册的panda标签</div>`
                }
            }
        })
        
9. Component 组件 Props

    1. 定义属性并获取

        <panda here="China"></panda>
        components:{
            "panda":{
                template:`<div style="color:red;">Panda from {{ here }}.</div>`,
                props:['here']
            }
        }
    
    2. 属性中带’-‘的处理方式 -> 建议少用这种方式

        <panda from-here="China"></panda>
        components:{
            "panda":{
                template:`<div style="color:red;">Panda from {{ here }}.</div>`,
                props:['fromHere']
            }
        }

    3. 在构造器里向组件中传值

        <panda v-bind:here="message"></panda>
        components:{
            "panda":{
                template:`<div style="color:red;">Panda from {{ here }}.</div>`,
                props:['here']
            }
        }

10. Component 父子组件关系

    1. 构造器外部写局部注册组件

        var panda = {
            template:`<div>Panda from China!</div>`
        }

        components:{
            "panda":panda
        }

        <panda></panda>

    2. 父子组件的嵌套

        var city={
           template:`<div>Sichuan of China</div>`
        }
        var kang = {
            template:`<div>
                    <p> Panda from China!</p>
                    <city></city>
            </div>`,
            components:{
                "city":city
            }
        }
        var app=new Vue({
            el:'#app',
            components:{
                "kang":kang
            }
        })

        <kang></kang>

10. Component 标签

    <component v-bind:is="who"></component>

    var app=new Vue({
        el:'#app',
        data:{
            who:'componentA'
        }
    })

# 选项
11. propsData Option 全局扩展的数据传递

    我们用propsData三步解决传值：

        1.在全局扩展里加入props进行接收。propsData:{a:1} 
        2.传递时用propsData进行传递。props:[‘a’] 
        3.用插值的形式写入模板。 

        var  header_a = Vue.extend({
            template:`<p>{{message}}-{{a}}</p>`,
            data:function(){
                return {
                    message:'Hello,I am Header'
                }
            },
            props:['a']
        }); 
        new header_a({propsData:{a:1}}).$mount('header');

12. computed Option 计算选项

    computed 的作用主要是对原数据进行改造输出。改造输出：包括格式的编辑，大小写转换，顺序重排，添加符号……

    一、格式化输出结果

        computed:{
            newPrice:function(){
                return this.price='￥' + this.price + '元';
            }
        }
    
    二、用计算属性反转数组

        computed:{
            reverseNews:function(){
                return this.newsList.reverse();
            }
        }

13. Methods Option 方法选项

    一、methods中参数的传递

        1. 在methods的方法中进行声明，比如我们给add方法加上一个num参数，就要写出add:function(num){}.
        2. 调用方法时直接传递，比如我们要传递2这个参数，我们在button上就直接可以写。<button @click=”add(2)”></button>.

    二、methods中的$event参数

        <button @click=”add(2,$event)”>add</button> 。

    三、native 给组件绑定构造器里的原生事件

        1. 声明btn对象：
            var btn={
                template:`<button>组件Add</button>`     
            }
        
        2. 在构造器里声明：

            components:{
                "btn":btn
            }

        3. 用.native修饰器来调用构造器里的add方法

            <p><btn @click.native="add(3)"></btn></p>

    四、作用域外部调用构造器里的方法

        <button onclick="app.add(4)" >外部调用构造器里的方法</button>

14. Watch 选项 监控数据

    1. 
        app.$watch('xxx',function(){})

    2. 实例方法模式

        app.$watch('temperature',function(newVal,oldVal){
            if(newVal>=26){
                this.suggestion=suggestion[0];
            }else if(newVal<26 && newVal >=0)
            {
                this.suggestion=suggestion[1];
            }else{
                this.suggestion=suggestion[2];
            }
        
        })

15. Mixins 混入选项操作

    Mixins一般有两种用途：

        1. 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。
        2. 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用

    一、Mixins的基本用法

        //额外临时加入时，用于显示日志
        var addLog={
            updated:function(){
                console.log("数据放生变化,变化成"+this.num+".");
            }
        }
        var app=new Vue({
             mixins:[addLog]//混入
        })

    二、mixins的调用顺序

        从执行的先后顺序来说，都是混入的先执行，然后构造器里的再执行，需要注意的是，这并不是方法的覆盖，而是被执行了两边。
        当混入方法和构造器的方法重名时，混入的方法无法展现，也就是不起作用。

    三、全局API混入方式

        // 不需要加s
        Vue.mixin({
            updated:function(){
                console.log('我是全局被混入的');
            }
        })

16. Extends Option 扩展选项 

    原生的方法和扩展方法一样，只执行的原生方法

        var bbb={
            created:function(){
                console.log("我是被扩展出来的");
            },
            methods:{
                add:function(){
                    console.log('我是被扩展出来的方法！');
                }
            }
        };

        var app=new Vue({
            extends:bbb
        })

    delimiters 选项

        delimiters的作用是改变我们插值的符号。Vue默认的插值是双大括号{{}}。但有时我们会有需求更改这个插值的形式。

        delimiters:['${','}']

# 实例和内置组件
17. 实例属性

    一、实例调用方法

        methods:{
            add:function(){
                console.log("调用了Add方法");
            }
        }

        app.add();

18. 实例方法

    一、$mount方法

        $mount方法是用来挂载我们的扩展的，我们先来复习一下扩展的写法。

        var kang = Vue.extend({
            template:`<p>{{message}}</p>`,
            data:function(){
                return {
                    message:'Hello ,I am kang'
                }
            }
        })
        var vm = new kang().$mount("#app")

    二、$destroy() 卸载方法

        用$destroy()进行卸载。

        <p><button onclick="destroy()">卸载</button></p>
        function destroy(){
            vm.$destroy();
        }

    三、$forceUpdate() 更新方法

        vm.$forceUpdate()

    四、$nextTick() 数据修改方法

        当Vue构造器里的data值被修改完成后会调用这个方法，也相当于一个钩子函数吧，和构造器里的updated生命周期很像。
        function tick(){
            vm.message="update message info ";
            vm.$nextTick(function(){
                console.log('message更新完后我被调用了');
            })
        }

19. 实例事件

    实例事件就是在构造器外部写一个调用构造器内部的方法。这样写的好处是可以通过这种写法在构造器外部调用构造器内部的数据。 

    一、$on 在构造器外部添加事件

        app.$on('reduce',function(){
            console.log('执行了reduce()');
            this.num--;
        });

        如果按钮在作用域外部，可以利用$emit来执行。

        // 外部调用内部事件
        function reduce(){
            app.$emit('reduce');
        }

    二、$once执行一次的事件

        app.$once('reduceOnce',function(){
            console.log('只执行一次的方法');
            this.num--;
        });

    三、$off关闭事件

        //关闭事件
        function off(){
            app.$off('reduce');
        }

20. 内置组件 -slot

    1、在HTML的组件中用slot属性传递值。

        <kang>
            <span slot="bolgUrl">{{kangData.bolgUrl}}</span>    
            <span slot="netName">{{kangData.netName}}</span>    
            <span slot="skill">{{kangData.skill}}</span>    
        </kang>

    2、在组件模板中用标签接收值。

        <template id="tmp">
            <div>
                <p>博客地址：<slot name="bolgUrl"></slot></p>
                <p>网名：<slot name="netName"></slot></p>
                <p>技术类型：<slot name="skill"></slot></p>
            </div>
        </template>