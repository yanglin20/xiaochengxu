<template>
    <div class="image-view" :style= " {height}">
        <img 
            :class= " round ? 'round image':'image'"
            :style= " {height}"
            :src= "src"
            :mode= "mode"
            :lazy-load= "lazyload"
            @load = "onLoad"
            @error = "onError"
            v-show=" !isLoading && !error"
        />
        <img 
            :class= " round ? 'round image':'image'"
            :style= " {height}"
            src= "https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
            :mode= "mode"
            :lazy-load= "lazyload"
            v-show=" isLoading || error"
        />
    </div>
</template>

<script>
    export default {
        data(){
            return{
                isloading:'',
                error:''
            }
        },
        props:{
            src:{
                type:String,
                default:''
            },
            mode:{
                type:String,
                default:'widthFix'
            },
            lazyLoad:{
                type:Boolean,
                default:true
            },
            round:{
                type:Boolean,
                default:false
            },
            height: {
        type: String,
        default: 'auto'
      }
        },
        methods:{
            onLoad(){
                this.isloading = false
                this.error =false
                // console.log('onload')
            },
            onError(){
                this.isloading = true
                this.error =true
                // console.log('error')
            }
        },
        watch:{
            // src(value, preValue) {
            //     if (value && value.length > 0 && value !== preValue) {
            //     this.$nextTick(() => {
            //         this.isLoading = true
            //     })
            //     }
            // }
            
        }
    }
</script>

<style lang="scss" scoped>
.image-view{
    width: 100%;
    image{
        width: 100%;
        &.round{
            border-radius:50%
        }
    }
}
</style>