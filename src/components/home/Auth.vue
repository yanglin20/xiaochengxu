<template>
  <div class="auth-wrapper">
    <div class="auth-inner-wrapper">
      <div class="auth-info">
        <div class="auth-img">
          <imageView 
          src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" 
          round
          height="100%"
          mode="scaleToFill"
          ></imageView>
        </div>
        <div class="sub-title">登录哈哈读书</div>
        <div class="title">全球好书免费读</div>
      </div>
      <button class="auth-btn" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import ImageView from "@/components/base/ImageView";
export default {
  components: {
    ImageView
  },
  methods: {
    bindGetUserInfo(e) {
      console.log(e);
      if (e.mp.detail.rawData) {
        //用户按了允许授权按钮
        console.log("用户按了允许授权按钮");
      } else {
        //用户按了拒绝按钮
        console.log("用户按了拒绝按钮");
      }
      this.$emit("getUserInfo");
    }
  }
};
</script>

<style lang="scss" scoped>
.auth-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #999;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  .auth-inner-wrapper {
    position: relative;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px;
    .auth-info {
      margin-top: 20px;
      text-align: center;
      .auth-img {
        width: 74px;
        height: 74px;
        margin: 22.5px auto;
      }
      .sub-title {
        font-size: 13px;
        color: #999999;
        margin-top: 3.5px;
      }
      .title {
        font-size: 16px;
        color: #333;
      }
    }
    .auth-btn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 45px;
      line-height: 45px;
      font-size: 15px;
      background-image: linear-gradient(90deg, #1ea3f5 0%, #0f87fc 100%);
      border-radius: 0 0 18px 18px;
      color: #fff;
    }
  }
}
</style>