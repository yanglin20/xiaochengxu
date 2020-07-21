<template>
    <div class="search-bar">
       <div class="search-bar-wrapper">
           <van-icon 
                class="search"
                name="search"
                size='16px'
                color="#858c96"
                >
            </van-icon>
            <input 
                class="search-bar-input" 
                type="search"
                :disabled="disabled"
                v-model="searchWord"
                :placeholder="hotSearch.length ===0 ? '搜索':hotSearch"
                placeholder-style ="color:#ADB4BE"
            >
            
            <van-icon 
                class="clear"
                name="clear"
                size='16px'
                color="#858c96"
                @click="onClearClick"
                >

            </van-icon>
       </div>
    </div>
</template>

<script>
    export default {
        props: {
            focus:{
                type:Boolean,
                dafault:false
            },
            disabled:{
                type:Boolean,
                dafault:true
             },
             hotSearch:{
                type:String,
                dafault:'123'
             }
        },
        data(){
            return{
                searchWord:'',
            }
        },
        methods:{
            onClearClick(){
                console.log(1)
                this.searchWord =''
                this.$emit('onclear')
            },
            onChange(e){
                console.log(e)
            }
        }
    }
</script>

<style lang="scss" scoped>
.search-bar{
    padding:  15px 15.5px;
    .search-bar-wrapper{
        box-sizing: border-box;
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        background: #f5f7f9;
        border-radius: 20px;
        padding: 12px 17px;
        .search-bar-input{
            flex:1;
            margin: 0 8px;
            line-height: 100%;
        }
        .search,.clear{
            display: flex;
            align-items: center;
            height: 100%;
        }
    }
}
</style>