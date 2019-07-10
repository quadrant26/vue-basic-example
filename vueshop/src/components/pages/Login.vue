<template>
    <div>
        <van-nav-bar 
            title="用户登录" 
            left-text="返回" 
            left-arrow 
            @click-left="goBack"
        />
        <div class="register-panel">
            <van-field
                v-model="username"
                label="用户名"
                clearable
                placeholder="请输入用户名"
                required
                :error-message="usernameErrorMsg"
            />
            <van-field
                v-model="password"
                type="password"
                label="密码"
                placeholder="请输入密码"
                required
                :error-message="passwordErrorMsg"
            />
            <div class="register-button">
                <van-button type="primary" @click="loginAxtion" size="large" :loading="openLoading">马上登录</van-button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceApiConfig.js'
import {Toast} from 'vant'
export default {
    data (){
        return {
            username: "",
            password: "",
            openLoading: false, // 是否开启用户注册的loading状态
            usernameErrorMsg: '', // 当用户出现错误时的提示
            passwordErrorMsg: '', // 当密码出现错误时的提示
        }
    },
    methods: {
        goBack(){
            this.$router.go(-1)
        },
        loginAxtion (){
            this.checkFrom() && this.axiosLoginUser()
        },
        axiosLoginUser(){
            this.openLoading = true;
            axios({
                url: url.login,
                method: 'post',
                data: {
                    userName: this.username,
                    password: this.password
                }
            }).then( (response) => {
                console.log(response)
                
            }).catch( (error) => {
                console.log(error)
            })
        },
        // 表单验证
        checkFrom (){
            let isOk = true
            if ( this.username.length < 5 ){
                this.usernameErrorMsg = "用户名长度不能少于5位"
                isOk = false
            }else{
                this.usernameErrorMsg = ""
            }
            
            if ( this.password <6 ){
                this.passwordErrorMsg = "密码长度不能少于6位"
                isOk = false
            }else{
                this.passwordErrorMsg = ""
            }

            return isOk
        }
    }
}
</script>

<style scoped>
.register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom: 80px;
}
.register-button{
    padding-top: 10px;
}
</style>