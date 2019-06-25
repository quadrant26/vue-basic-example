<template>
    <div>
        <h2>{{msg}} -- {{$route.params.username}} --- {{$route.params.id}}</h2>
    </div>
</template>

<script>
export default {
    name: "Hi",
    data (){
        return {
            msg: "Children I am Hi1 Vue!"
        }
    }
}
</script>

<style scoped>
    
</style>