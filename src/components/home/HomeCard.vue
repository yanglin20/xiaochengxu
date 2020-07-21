<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avater-wrap">
          <ImageView :src="avatar" round></ImageView>
        </div>
     
        <div class="nick-name">{{nickName}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别推荐</div>
      </div>
      <div class="book-info">
        <div class="book-wrap">
          <div class="book-img-wrap"  v-for="(item,index) in dataList" :key="index" >
            <ImageView
              :src="item.cover"
            ></ImageView>
          </div>
        </div>
        <div class="shelf-wrap">
          <div class="shelf">书架</div>
          <van-icon class="arrow" name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrap" @click="fankui">反馈</div>
      <van-dialog id="van-dialog" />

     
    </div>
  </div>
</template>

<script>
import ImageView from "@/components/base/ImageView";
import Dialog from "vant-weapp/dist/dialog/dialog";
export default {
  components: {
    ImageView
  },
  props:["data"],
  computed:{
    avatar(){
   
      return this.data && this.data.userInfo && this.data.userInfo.avatar
    },
    nickName(){
      return this.data && this.data.userInfo && this.data.userInfo.nickName || '哈哈哈'
    },
    dataList(){
      return this.data.bookList
    }
  },
  methods: {
    fankui() {
      Dialog.confirm({
        title: "反馈",
        message: "你是否提交反馈信息",
        confirmButtonText:'是',
        cancelButtonText:'否'
      })
        .then(() => {
          console.log('是')
     
        })
        .catch(() => {
        
        });
    }
  },
  mounted(){

  }
};
</script>

<style lang="scss" scoped>
.home-card {
  background-image: linear-gradient(-90deg, #54575f 0%, #595b60 100%);
  border-radius: 15px;
  margin: 20px 22px 0 22px;
  .home-card-inner {
    position: relative;
    box-sizing: border;
    padding: 21.5px 20px 20px 20px;
    .user-info {
      display: flex;
      align-items: center;
      .avater-wrap {
        width: 20px;
        height: 20px;
      }
      .nick-name,
      .shelf-text {
        font-size: 12px;
        color: #fff;
        margin-left: 8.5px;
      }
      .shelf-text {
        opacity: 0.7;
      }
      .round-item {
        width: 4px;
        height: 4px;
        background: #a2a2a2;
        border-radius: 50%;
        margin: 0 0 0 8.5px;
      }
    }
    .book-info {
      display: flex;
      .book-wrap {
        flex: 1;
        display: flex;
        justify-content: space-around;
        margin-top: 18px;
        .book-img-wrap {
          width: 72px;
          height: 101px;
        }
      }
      .shelf-wrap {
        display: flex;
        align-items: center;
        .shelf {
          font-size: 11px;
          width: 11px;
          color: #fff;
          opacity: 0.8;
        }
      }
    }
    .feedback-wrap {
      width: 44.5px;
      height: 23.5px;
      background: #707070;
      border-radius: 200px 0 0 200px;
      line-height: 23.5px;
      text-align: center;
      position: absolute;
      right: 0;
      top: 19.5px;
      font-size: 11px;
      color: #fff;
    }
  }
}
</style>