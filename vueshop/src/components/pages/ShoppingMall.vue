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
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data (){
        return {
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
            adBanner: ''
        }
    },
    created() {
        axios({
            url: 'https://www.easy-mock.com/mock/5d1dcefabaa6bf73722f7ec9/vueshop/index',
            method: 'get',
        }).then( response => {
            console.log(response)
            if( response.status == 200){
                this.category = response.data.data.category
                this.adBanner = response.data.data.advertesPicture
                this.bannerPicArray = response.data.data.slides
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
</style>
