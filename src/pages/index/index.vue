<template>
  <div >
    <div class="home" v-if="isAuto">
      <searchBar :hotSearch="hotSearch"></searchBar>

    <!-- <ImageView src="https://www.youbaobao.xyz/mpvue-res/big.jpg" mode="scaleToFill"></ImageView>
    <div>嘿嘿嘿</div>-->
    <HomeCard :data="homeCard"></HomeCard>
    
    <HomeBanner
      :data="banner"
    ></HomeBanner>
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
    <div v-else>
      <Auth></Auth>
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
import {getHomeData,recommend,freeRead,hotBook} from "@/api/index"
import {getSetting} from "@/api/wechat"
export default {
  components: {
    searchBar,
    HomeCard,
    HomeBanner,
    HomeBook
  },
  data() {
    return {
   
      banner:{},
      category:[],
      freeRead:[],
      hotBook:[],
      hotSearch:[],
      recommend:[],
      cardList:{},
      userInfo:{},
      homeCard:{},
      isAuth:false
    };
  },
  computed:{
    homeCardData() {

        return {
          bookList: this.cardList,
          userInfo: this.userInfo,
          num:2
        }
      },
  },
  methods: {
    // jump() {
    //   // this.$router.push('/pages/index/main')
    //   post("https://coding.imooc.com/learn/list/376.html", "").then(
    //     response => {
    //       // console.log("hahah");
    //     }
    //   );
    // },
    BOOKMoreClick(data){
      console.log(data)
    },
    onBookClick(){
      console.log('book')
    },
    recommendChange(key){
      console.log(key)
      switch (key){
        case "recommend":
          recommend().then( (response)=> {
            // console.log( response)
            this.recommend = response.data.data
          })
          break;
        case "freeRead":
          freeRead().then( (response)=> {
            // console.log( response)
            this.freeRead = response.data.data
          })
          break;
        case "hotBook":
           hotBook().then( (response)=> {
            console.log( response)
            this.hotBook = response.data.data
          })
          break;

      }
    },
    getHomeDate1(){
      getHomeData({
        openId:'123'
      }).then(res => {
        console.log(res)
        const {
          data:{
            banner,
            category,
            freeRead,
            hotBook,
            hotSearch:{
              keyword
            },
            recommend,
            shelf,
            shelfCount
          }
        } = res.data;
        
        this.hotBook = hotBook
        this.banner = banner
        this.category = category
        this.hotSearch = keyword
    
        this.freeRead = freeRead
        this.recommend = recommend

        
        this.cardList = shelf
        this.userInfo= {
            avatar:'https://www.youbaobao.xyz/mpvue-res/logo.jpg',
            nickName:'米老鼠'
          
        }
        this.homeCard ={
          bookList:shelf,
          userInfo:{
            avatar:'https://www.youbaobao.xyz/mpvue-res/logo.jpg',
            nickName:'米老鼠'
          },
          num:shelfCount
        }
        
        
      
       
      }).catch(err => {
        console.log(err)
        console.log(err.data.msg)
      })
    },

    getSetting(){
      getSetting('userInfo',
      ()=>{
        console.log('成功')
      },
      ()=>{
        console.log('失败')
      }
      
      )
    }

  },

  mounted() {
    this.getHomeDate1()

    this.getSetting()
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
