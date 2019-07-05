<template>
    <div>
        <div class="search-bar">
            <van-row class="test-row">
                <van-col span="3">
                    <img :src="locationIcon" alt="定位" width="55%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">搜索</van-button>
                </van-col>
            </van-row>
        </div>
        <!--begin: swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="1500" >
                <van-swipe-item v-for="(pic, index) in bannerPicArray" :key="index">
                    <img v-lazy="pic.image" width="100%" alt="">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--begin: category -->
        <div class="type-bar">
            <div v-for="(item, index) in category" :key="index">
                <img v-lazy="item.image" width="90%" alt="">
                <span>{{item.mallCategoryName}}</span>
            </div>
        </div>
        <!--begin: adBanner -->
        <div class="">
            <img v-lazy="adBanner.PICTURE_ADDRESS" width="100%" alt="">
        </div>
        <!--begin: 商品推荐 -->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%" alt="">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--begin: floor -->
        <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
        <floor-component :floorData="floor2" :floorTitle="floorName.floor3"></floor-component>
        <!--begin 热卖商品 -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
            <!--这里需要一个list组件-->
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import floorComponent from '../component/floorComponent'
import { toMoney } from '@/filter/moneyFilter.js'
import goodsInfo from '../component/goodsInfoComponent'
import url from '@/serviceApiConfig.js'
export default {
    data (){
        return {
            swiperOption: {
                slidesPerView: 3
            },
            msg: 'Shopping Mall',
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray: [
                // {imageUrl: require('../../assets/images/banner01.jpg')},
                // {imageUrl: require('../../assets/images/banner02.jpg')},
                // {imageUrl: require('../../assets/images/banner03.jpg')}
                { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg'},
                { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg'},
                { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg'}
            ],
            category: [],
            adBanner: '',
            recommendGoods: [],
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: {},
            hotGoods: []
        }
    },
    components: {
        swiper,
        swiperSlide,
        floorComponent,
        goodsInfo
    },
    filters: {
        moneyFilter (money){
            return toMoney(money);
        }
    },
    created() {
        axios({
            url: url.getShoppingMallInfo,
            method: 'get',
        }).then( response => {
            console.log(response)
            if( response.status == 200){
                this.category = response.data.data.category
                this.adBanner = response.data.data.advertesPicture
                this.bannerPicArray = response.data.data.slides
                this.recommendGoods = response.data.data.recommend
                this.floor1 = response.data.data.floor1
                this.floor2 = response.data.data.floor2
                this.floor3 = response.data.data.floor3
                this.floorName = response.data.data.floorName
                this.hotGoods = response.data.data.hotGoods
            }
        }).catch( error => {
            console.log(error)
        })
    },
}
</script>
<style scoped>
.search-bar{
    height:2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}
.search-input{
    width: 100%;
    height:1.3rem;
    border-width: 0 0 1px;
    border-bottom:1px solid #fff;
    background-color:#e5017d;
    color:#fff;
}
.location-icon{
    padding-top: 0.2rem;
}
.swiper-area{
    clear: both;
    max-height: 20rem;
    overflow: hidden;
}
.type-bar{
    background-color: #fff;
    margin:0 0.3rem 0.3rem;
    border-radius: 0.3rem;
    font-size:14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowarp;
}
.type-bar div{
    padding: 0.3rem;
    font-size:12px;
    text-align: center;
}
.type-bar div img{ width:100%;}
.recommend-area{
    background-color:#fff;
    margin-top:0.3rem;
}
.recommend-title{
    border-bottom:1px solid #eee;
    font-size: 14px;
    color:#e5017d;
    padding:0.2rem;
    text-align: left;
}
.recommend-body{
    border-bottom:1px solid #eee;
}
.recommend-item{
    width:99%;
    border-right:1px solid #eee;
    font-size: 12px;
    text-align: center;
}
.hot-area{
    text-align: center;
    font-size:14px;
    height: 1.8rem;
    line-height:1.8rem;
}
</style>
