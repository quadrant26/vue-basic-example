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
                            <li @click="clickCategory(index, item.ID)" :class="{categoryActive:categoryIndex==index}" v-for="(item, index) in category" :key="index"
                            >
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab v-for="(item, index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
                        </van-tabs>
                    </div>
                    <div id="list-div">
                        <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                            <van-list v-model="loadding" :finished="finished" @load="onLoading">
                                <div class="list-item" v-for="(item, index) in goodList" :key="index">
                                    <div class="list-item-img"><img :src="item.IMAGE1" width="100%"/></div>
                                    <div class="list-item-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">￥{{item.ORI_PRICE}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
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
            loadding: false, // 上拉加载使用
            finished: false, // 上拉加载是否有数据
            isRefresh:false, // 下拉加载
            goodList: [], // 商品列表数据
            page: 1, // 商品列表页数
            categorySubID: "", // 商品子类id
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
            this.page = 1
            this.finished = false
            this.goodList = []
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
                    this.categorySubID = this.categorySub[0].ID
                    this.onLoading();
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
                this.categorySubID = this.categorySubID ? this.categorySubID : this.categorySub[0].ID
                this.getGoodList()
            }, 500)
        },
        onRefresh (){
            setTimeout(()=>{
                this.isRefresh = false;
                this.goodList = [];
                this.onLoading();
                // 重置上拉加载状态
                this.finished = false;
            }, 500)
        },
        getGoodList (){
            axios({
                url: url.getGoodsListByCategorySubID,
                method: 'post',
                data: {
                    categorySubId: this.categorySubID,
                    page: this.page
                }
            }).then(response=>{
                console.log(response)
                if(response.data.code == 200 && response.data.message.length ){
                    this.page++
                    this.goodList=this.goodList.concat(response.data.message)
                }else{
                    this.finished = true;
                }
                this.loading=false;
            })
            .catch(error=>{
                console.log(error)
            })
        },
        onClickCategorySub (index, title){
            this.categorySubID = this.categorySub[index].ID
            console.log( "categorySubID" + this.categorySubID)
            this.goodList = []
            this.finished = false
            this.page = 1
            this.onLoading()
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
    display: flex;
    flex-direction: row;
    font-size:0.8rem;
    border-bottom: 1px solid #f0f0f0;
    background-color: #fff;
    padding:5px;
}
#list-div{
    overflow: scroll;
}
.list-item-img{
    flex:8;
}
.list-item-text{
    flex:16;
    margin-top:10px;
    margin-left:10px;
}
</style>