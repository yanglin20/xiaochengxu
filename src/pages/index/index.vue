<template>
  <div>
    <div class="home" v-if="isAuth && !showPreload">
      <searchBar :hotSearch="hotSearch" @onSearchBarClick="onSearchBarClick"></searchBar>
      <HomeCard :data="homeCard"></HomeCard>

      <HomeBanner :data="banner" v-if="banner"></HomeBanner>
      <div class="home-book">
        <HomeBook
          title="为你推荐"
          :row="1"
          :col="3"
          :data="recommend"
          mode="col"
          btnText="换一批"
          @onMoreClick="recommendChange('recommend')"
          @onBookClick="onBookClick"
        ></HomeBook>

        <HomeBook
          title="免费阅读"
          :row="2"
          :col="2"
          :data="freeRead"
          mode="row"
          btnText="换一批"
          @onMoreClick="recommendChange('freeRead')"
          @onBookClick="onBookClick"
        ></HomeBook>

        <HomeBook
          title="当前最热"
          :row="1"
          :col="4"
          :data="hotBook"
          mode="col"
          btnText="换一批"
          @onMoreClick="recommendChange('hotBook')"
          @onBookClick="onBookClick"
        ></HomeBook>

        <HomeBook
          title="分类"
          :row="3"
          :col="2"
          :data="category"
          mode="category"
          btnText="查看全部"
          @onMoreClick="BOOKMoreClick"
          @onBookClick="onBookClick"
        ></HomeBook>
      </div>
    </div>
    <HomePreload v-if=" showPreload"></HomePreload>
    <div v-if="!isAuth">
      <Auth v-if="showSQ" @getUserInfo="init"></Auth>
    </div>
  </div>
</template>

<script>
import { post } from "@/utils/request.js";
import searchBar from "@/components/home/searchBar";
import HomeCard from "@/components/home/HomeCard";
import HomeBanner from "@/components/home/HomeBanner";
import HomeBook from "@/components/home/HomeBook";
import Auth from "@/components/home/Auth";
import HomePreload from "@/pages/preload/HomePreload";
import {
  getHomeData,
  recommend,
  freeRead,
  hotBook,
  register
} from "@/api/index";
import {
  getSetting,
  getUserInfo,
  setStorageSync,
  getStorageSync,
  getUserOpenId,
  showLoading,
  hideLoading
} from "@/api/wechat";
export default {
  components: {
    searchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth,
    HomePreload
  },
  data() {
    return {
      banner: {},
      category: [],
      freeRead: [],
      hotBook: [],
      hotSearch: [],
      recommend: [],
      cardList: {},
      userInfo: {},
      homeCard: {},
      isAuth: false,
      showSQ: false,
      showPreload: true
    };
  },
  computed: {
    homeCardData() {
      return {
        bookList: this.cardList,
        userInfo: this.userInfo,
        num: 2
      };
    }
  },
  methods: {
    onSearchBarClick(){
      console.log("222")
      this.$router.push("/pages/search/main")
    },
    BOOKMoreClick(data) {
      console.log(data);
    },
    onBookClick() {
      console.log("book");
    },
    recommendChange(key) {
      console.log(key);
      switch (key) {
        case "recommend":
          recommend().then(response => {
            // console.log( response)
            this.recommend = response.data.data;
          });
          break;
        case "freeRead":
          freeRead().then(response => {
            // console.log( response)
            this.freeRead = response.data.data;
          });
          break;
        case "hotBook":
          hotBook().then(response => {
            console.log(response);
            this.hotBook = response.data.data;
          });
          break;
      }
    },
    getHomeDate1(openId, userInfo) {
      getHomeData({
        openId: openId
      })
        .then(res => {
          console.log(res);
          hideLoading();
          const {
            data: {
              banner,
              category,
              freeRead,
              hotBook,
              hotSearch: { keyword },
              recommend,
              shelf,
              shelfCount
            }
          } = res.data;

          this.hotBook = hotBook;
          this.banner = banner;
          this.category = category;
          this.hotSearch = keyword;

          this.freeRead = freeRead;
          this.recommend = recommend;

          this.cardList = shelf;
          this.userInfo = {
            avatar: "https://www.youbaobao.xyz/mpvue-res/logo.jpg",
            nickName: "米老鼠"
          };
          this.homeCard = {
            bookList: shelf,
            userInfo,
            num: shelfCount
          };
          this.showPreload = false;
        })
        .catch(err => {
          console.log(err);
          console.log(err.data.msg);
        });
    },

    getSetting() {
      var that = this;
      getSetting(
        "userInfo",
        () => {
          this.isAuth = true;
          showLoading("加载中");
          this.getUserInfo();
          console.log("成功!");
        },
        () => {
          this.isAuth = false;
          this.showSQ = true;
        }
      );
    },
    getUserInfo() {
      const getOpenIdComplete = (openId, userInfo) => {
        console.log("哈哈哈");
        this.getHomeDate1(openId, userInfo);
        //  register(openId,userInfo ).then( (res) => {
        //    console.log(res)
        //    console.log("注册")
        //  })
      };
      getUserInfo(
        userInfo => {
          setStorageSync("userInfo", userInfo);
          const openId = getStorageSync("openId");

          if (!openId || openId.length === 0) {
            console.log("请求openId");
            getUserOpenId(openid => {
              getOpenIdComplete(openid, userInfo);
            });
          } else {
            console.log("已获得openId");
            getOpenIdComplete(openId, userInfo);
          }
        },
        res => {
          console.log(res);
          hideLoading();
        }
      );
    },

    init() {
      console.log("授权之后 点击");
      this.getSetting();
    }
  },

  mounted() {
    // this.getHomeDate1();

    this.init();
  }
};
</script>

<style lang="scss" scoped>
h2 {
  color: #ccc;
}
.home-book {
  margin-top: 23px;
}
</style>
