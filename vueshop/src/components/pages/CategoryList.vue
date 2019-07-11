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
                            <li v-for="(item, index) in category" :key="index" @click="clickCategory(index, item.ID)"
                            :class="{categoryActive:categoryIndex==index}">
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-list v-model="loadding" :finished="finished" @load="onLoading">
                            <div class="list-item" v-for="(item, index) in list" :key="index">{{item}}</div>
                        </van-list>
                    </div>
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
            categoryIndex: 0,
            categorySub: [],
            active: 0,
            loadding: false,
            finished: false, // 上拉加载是否有数据
            list: [], // 商品数据
        }
    },
    created (){
        this.getCategory()
    },
    mounted (){
        let winHeight = document.documentElement.clientHeight
        document.getElementById("leftNav").style.height= winHeight-46 +'px'
        document.getElementById('list-div').style.height=winHeight-90 +'px'
    },
    methods: {
        // 获取分类类别
        getCategory (){
            axios({
                url: url.getCategoryList,
                method: 'get',
            }).then( response => {
                if ( response.data.code == 200 && response.data.message){
                    // console.log(response.data.message);
                    this.category = response.data.message
                    this.getCategorySubByCategoryId( this.category[0].ID )
                }else{
                    Toast('服务器错误，数据获取错误')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        clickCategory(index, categoryId){
            this.categoryIndex=index
            this.getCategorySubByCategoryId(categoryId)
        },
        //根据大类ID读取小类类别列表
        getCategorySubByCategoryId (categoryId){
            axios({
                url: url.getCategorySubList,
                method: 'post',
                data: {
                    categoryId: categoryId
                }
            }).then( response => {
                // console.log(response);
                if ( response.data.code == 200 && response.data.message){
                    this.active = 0
                    this.categorySub = response.data.message
                }else{
                    Toast('服务器错误，数据获取错误')
                }
            }).catch(error => {
                console.log(error)
            })
        },
        // 上拉加载
        onLoading (){
            setTimeout(()=> {
                for(let i = 0; i < 10; i++){
                    this.list.push(this.list.length + 1)
                }
                this.loadding = false
                if ( this.list.length >= 40){
                    this.finished = true
                }
            }, 500)
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
.list-item{
    text-align: center;
    line-height: 80px;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
}
#list-div{
    overflow: scroll;
}
</style>