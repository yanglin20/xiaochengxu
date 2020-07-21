<template>
    <div class="home-banner" >
        <div 
            class="bg-img"
            :style="{backgroundImage: 'url(' +  data.img + ')'}"
        >
            <div class="title">{{data.title}}</div>
            <div class="subTitle" @click="onBanner">{{data.subTitle}}</div>
        </div>
    </div>
</template>

<script>
    export default {

         props: {
      data: Object
    },
        data() {
            return {
              
            }
        },
        computed:{
         
        },
        methods:{
            onBanner(){
                console.log('click banner')
            }
        }
    }
</script>

<style lang="scss" scoped>
.home-banner{
    box-sizing: border-box;
    width: 100%;
    height: 125px;
    margin-top: 20px ;
    padding: 0 20px;
    .bg-img{
        height: 125px;
        border-radius:  10px;
        background-size: 100% 100%;
        background-repeat: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .title{
            font-size: 18px;
            color: #fff;
        }
        .subTitle{
            margin-top: 10px;
            padding: 5px 15px;
            background: #4585ff;
            border: 1px solid #ccc;
            border-radius: 50px;
            font-size: 14px;
            color: #fff;
        }
    }
}
</style>