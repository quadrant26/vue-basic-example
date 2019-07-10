<template>
    <div>
        商品详情
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApiConfig.js'
export default {
    props: [],
    data (){
        return {
            goodsId: ''
        }
    },
    created (){
        this.goodsId = this.$route.query.goodsId
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