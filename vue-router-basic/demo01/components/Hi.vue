<template>
    <div>
        <h2>{{msg}}</h2>
        <router-view>
            <router-link to="/Hi1">Hi1</router-link>
            <router-link to="/Hi2">Hi2</router-link>
        </router-view>
    </div>
</template>

<script>
export default {
    name: "Hi",
    data (){
        return {
            msg: "I am Hi Vue!"
        }
    }
}
</script>

<style scoped>
    
</style>