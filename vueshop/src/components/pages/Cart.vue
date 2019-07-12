<template>
    <div>
        <div class="navbar-div">
            <van-nav-bar
                title="购物车"
            ></van-nav-bar>
        </div>
        <div class="cart-title">
            <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
        </div>
        <!--显示购物车中的商品-->
        <div class="cart-list">
            <div class="pang-row" v-for="(item, index) in cartInfo" :key="index">
                <div class="pang-img"><img :src="item.image" width="100%" alt=""></div>
                <div class="pang-text">
                    <div class="pang-goods-name">{{item.Name}}</div>
                    <div class="pang-control">
                        <van-stepper v-model="item.count"></van-stepper>
                    </div>
                </div>
                <div class="pang-goods-price">
                    <div>￥ {{item.price | moneyFilter}}</div>
                    <div>x{{item.count}}</div>
                    <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
                </div>
            </div>
        </div>
        <!-- 显示总价 -->
        <div class="totalMoney">
            商品总价：￥{{totalMoney | moneyFilter}}
        </div>
    </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    data (){
        return {
            cartInfo: [],
            isEmpty: false,
        }
    },
    created (){
        this.getCartInfo()
    },
    computed :{
        totalMoney (){
            let allMoney = 0
            this.cartInfo.forEach( (item, index) => {
                allMoney += item.price*item.count
            })
            localStorage.cartInfo = JSON.stringify(this.cartInfo)
            return allMoney;
        }
    },
    methods: {
        getCartInfo (){
            if(localStorage.cartInfo != undefined){
                this.cartInfo = JSON.parse(localStorage.cartInfo)
            }
            console.log( 'this.cartInfo:' + JSON.stringify(this.cartInfo))
            this.isEmpty = this.cartInfo>0 ? true: false
        },
        clearCart (){
            this.cartInfo = [];
            localStorage.removeItem('cartInfo');
            isEmpty: false;
        }
    },
    filters: {
        moneyFilter (money){
            return toMoney(money)
        }
    }
}
</script>

<style scoped>
.cart-title{
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    border-bottom:1px solid #e4e7ed;
    padding:5px;
    text-align: center;
}
.cart-list{
    background-color: #fff;
}
.pang-row{
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    padding:0.5rem;
    font-size:0.85rem;
    border-bottom:1px solid #E4E7ED;
}
.pang-img{
    flex:6;
}
.pang-text{
    flex:14;
    padding-left:10px;
}
.pang-control{
    padding-top: 10px;
}
.pang-goods-price{
    flex:4;
    text-align: right;
}
.allPrice{
    color:red
}
.totalMoney{
    text-align: right;
    background-color: #fff;
    border-bottom:1px solid #E4E7ED;
    padding:5px;
}
</style>