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
    </div>
</template>
<script>
export default {
    data (){
        return {
            msg: 'Shopping Mall',
            locationIcon: require('../../assets/images/location.png')
        }
    }
}
</script>
<style scoped>
.search-bar{
    height:2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
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
</style>
