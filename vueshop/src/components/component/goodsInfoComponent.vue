<template>
    <div class="goods-info" @click="goGoodsPage">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
        </div>
        <div class="goods-name">{{goodsName}}</div>
        <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
    </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    props:['goodsImage','goodsName','goodsPrice', 'goodsId'],
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }  
    },
    methods: {
        goGoodsPage (){
            // this.$router.push({path: '/Goods', query: {goodsId: this.goodsId}})
            // this.$router.push({name: 'Goods', params: {goodsId: this.goodsId}})
            // 动态路由 path不能和params一起使用，否则params将无效。需要用name来指定页面
            // this.$router.push({path: '/Goods', params: {goodsId: this.goodsId}})
            this.$router.push({name: 'Goods', query: {goodsId: this.goodsId}})
        }
    }
}
</script>

<style scoped>
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space:nowrap; 
}
</style>