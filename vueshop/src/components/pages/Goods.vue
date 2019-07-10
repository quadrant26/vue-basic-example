<template>
    <div>
        商品详情
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApiConfig.js'
export default {
    data (){
        return {
            goodsId: '00b417a0f3444bb6965f4ba2dbafbed0'
        }
    },
    created (){
        this.getInfo()
    },
    methods: {
        getInfo (){
            axios({
                url: url.getDetailGoodsInfo,
                method: 'post',
                data: {
                    goodsId: this.goodsId
                }
            }).then( response => {
                console.log( response)
            }).catch( error => {
                console.log( error)
            })
        }
    }
}
</script>

<style scoped>

</style>