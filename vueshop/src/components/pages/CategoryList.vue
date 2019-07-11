<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="类别列表"
            ></van-nav-bar>
        </div>
        <div>
            <van-row>
                <van-col span="6">
                    <div id="leftNav">
                        <ul>
                            <li v-for="(item, index) in category" :key="index" @click="clickCategory(index)"
                            :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    右侧
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApiConfig.js'
import { Toast } from 'vant'

export default {
    data (){
        return {
            category: [],
            categoryIndex: 0
        }
    },
    created (){
        this.getCategory()
    },
    mounted (){
        let winHeight = document.documentElement.clientHeight
        document.getElementById("leftNav").style.height= winHeight-46 +'px'
    },
    methods: {
        getCategory (){
            axios({
                url: url.getCategoryList,
                method: 'get',
            }).then( response => {
                if ( response.data.code == 200 && response.data.message){
                    console.log(response.data.message);
                    this.category = response.data.message
                }else{
                    Toast('服务器错误，数据获取错误')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        clickCategory(index){
            this.categoryIndex=index
        }
    }
}
</script>

<style scoped>
#leftNav{
    background-color: aliceblue;
}
#leftNav ul li {
    line-height: 2rem;
    border-bottom:1px solid #E4E7ED;
    padding:3px;
    font-size:0.8rem;
    text-align: center;
}
.categoryActive{
    background-color: #fff;
}
</style>