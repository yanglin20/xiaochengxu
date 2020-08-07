<template>
    <div>
        <input type="text" v-model="text">
        <img :src="imgsrc" alt="">

        <button @click="copy">复制</button>
    </div>
</template>

<script>
import {
  copyImage,copyText
} from "@/api/wechat";
    export default {
        data() {
            return {
                text: "今天天气真好",
                imgsrc:"https://www.youbaobao.xyz/book/img/loading2.ae9e5924.jpeg"
            }
        },
        methods:{
            copy(){
                // copyImage(this.imgsrc)
                copyText(this.text)
            }
        }

    }
</script>

<style lang="scss" scoped>

</style>