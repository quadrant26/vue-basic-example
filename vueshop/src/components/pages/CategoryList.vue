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
                    <div id="leftNav">左侧</div>
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
            message: []
        }
    },
    created (){
        this.getCategory()
    },
    methods: {
        getCategory (){
            axios({
                url: url.getCategoryList,
                method: 'get',
            }).then( response => {
                if ( response.data.code == 200 && response.data.message){
                    console.log(response.data.message);
                }else{
                    Toast('服务器错误，数据获取错误')
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }
}
</script>

<style scoped>
#leftNav{
    background-color: aliceblue;
}
</style>