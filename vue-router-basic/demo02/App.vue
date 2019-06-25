<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div>
      <button @click="goBack">后退</button>
      <button @click="goPrev">前进</button>
      <button @click="goHome">首页</button>
    </div>
    <br>
    <router-link to="/">首页</router-link> | 
    <router-link to="/params/198/kang wensite">Params</router-link> | 
    <router-link to="/goHome">goHome</router-link> | 
    <router-link to="/goParams/918/I like Vue.js">goParams</router-link> | 
    <router-link to="/Hi1">Hi1</router-link> | 
    <router-link to="/kang">kang</router-link> | 
    <transition name="fade" mode="out-in">
      <router-view ></router-view>
    </transition>
    
    <!-- <router-view name="left" style="float:left; width:50%; height:200px; background: #0ff; color:#fff;"></router-view>
    <router-view name="right" style="float:right; width:50%; height:200px; background: #f0f; color:#fff;"></router-view> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goBack (){
      this.$router.go(-1);
    },
    goPrev (){
      this.$router.go(1);
    },
    goHome (){
      this.$router.push('/');
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}

</style>
