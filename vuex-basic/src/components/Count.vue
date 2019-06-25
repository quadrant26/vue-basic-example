<template>
    <div>
        <h2>{{msg}}</h2>
        <h3>{{$store.state.a.count}}</h3>
        <h4>{{count}}</h4>
        <p>
            <button @click="$store.commit('add', 10)">Add</button>
            <button @click="$store.commit('reduce')">Reduce</button>
            <button @click="add(10)">Add</button>
            <button @click="reduce">Reduce</button>
        </p>
        <p>
            <button @click="addAction">Add</button>
            <button @click="reduceAction">Reduce</button>
        </p>
    </div>
</template>
<script>
// 引入store
import store from '@/vuex/store';
import { mapState, mapMutations, mapGetters, mapActions} from 'vuex'
export default {
    data (){
        return {
            msg: 'Hello, Vuex'
        }
    },
    // 1. count ()
    // computed : {
    //     count (){
    //         return this.$store.state.count;
    //     }
    // },
    // 2. 
    // computed: mapState ({
    //     count: state=>state.count
    // }),
    // 3.
    computed: {
        // ...mapState(['count']),
        // count(){
        //     return this.$store.getters.count;
        // }
        // ...mapGetters(['count'])
        count (){
            return this.$store.state.a.count;
        }
    },
    methods: {
        ...mapMutations(['add', 'reduce']),
        ...mapActions(['addAction', 'reduceAction'])
    },
    store
}
</script>
<style scoped lang="">
    
</style>