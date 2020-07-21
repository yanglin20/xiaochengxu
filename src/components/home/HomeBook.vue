<template>
  <div class="home-book">
    <div class="home-book-header">{{title}}</div>
    <div class="home-book-content">
      <div class="home-book-row" v-for="(item,index) in bookData" :key="index">
        <div class="home-book-col" v-for="(book,bookIndex) in item" :key="bookIndex">
          <div
            class="book-wrapper"
            :style="{ flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row' }"
            @click="onBookClick"
            v-if="mode === modeCol || mode ===modeRow"
            >
            <ImageView :src="book.cover" />
            <div class="book-title-wrapper book-title-col" v-if="mode == HOME_BOOK_MODE.COL">
              <div class="book-title">{{book.title}}</div>
            </div>

            <div class="book-title-wrapper book-title-row" v-else>
              <div class="book-title">{{book.title}}</div>
              <div class="book-title book-author">{{book.author}}</div>
              <div class="book-title book-author">{{book.categoryText}}</div>
            </div>
          </div>
          <div
            class="category-wrapper"
            :style="{ flexDirection: mode === modeCol || mode === modeCategory ? 'column' : 'row' }"
            v-else

            @click="onBookClick"
            >
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer">
      <van-button round custom-class="home-book-btn" v-if="showBtn" @click="onMoreClick">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import ImageView from "@/components/base/ImageView";
import { HOME_BOOK_MODE } from "@/utils/const.js";
import {CATEGORY} from "@/utils/const.js";
export default {
  components: {
    ImageView
  },
  props: {
    title: String,
    data: {
      type: Array,
      default: []
    },
    btnText: String,
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 0
    },
    mode: {
      type: String,
      default: HOME_BOOK_MODE.ROW
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    bookData() {
      const { data, row, col } = this;

      // console.log(this.data);
      if (data && data.length > 0) {
          data.forEach(book => {
              book.text =  CATEGORY[book.categoryText.toLowerCase()]
          })
        const number = row * col;
        const _bookData = data.slice(0, number);
        // console.log(_bookData);
        const _bookDataRow = [];
        let _row = 0;
        while (_row < row) {
          //0 2
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col));
          _row++;
        }
        return _bookDataRow;
      } else {
        return [];
      }
    },
    HOME_BOOK_MODE() {
      return HOME_BOOK_MODE;
    },
    modeCol() {
      return HOME_BOOK_MODE.COL;
    },
    modeRow() {
      return HOME_BOOK_MODE.ROW;
    },
    modeCategory() {
      return HOME_BOOK_MODE.CATEGORY;
    }
  },
  methods: {
    onMoreClick() {
      this.$emit("onMoreClick", this.btnText);

    },
    onBookClick() {
      this.$emit("onBookClick");
    }
  },
  mounted() {
    
  }
};
</script>

<style lang="scss" scoped>
.home-book {
  .home-book-header {
    padding: 13px 0 0 20.5px;
    font-size: 16px;
    font-family: 'PingFangSC-Medium';
  }
  .home-book-content {
    padding: 0 12px;
    margin-top: 10.5px;
    .home-book-row {
      display: flex;
      flex-flow: row nowrap;
      margin-top: 12px;
      .home-book-col {
        box-sizing: border-box;
        padding: 0 8px;
        flex: 1;
        .book-wrapper {
          display: flex;
          flex-wrap: nowrap;
          width: 100%;
          .book-title-wrapper {
            &.book-title-col {
              .book-title {
                font-size: 12px;
                color: #212731;
                line-height: 16.5px;
                max-height: 33px;
                font-weight: 500;
                overflow: hidden;
                word-break: break-word;
              }
            }
            &.book-title-row {
              flex: 0 0 50%;
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .book-title {
                font-size: 12px;
                color: #1F1F1F;
                line-height: 14px;
                max-height: 28px;
                font-weight: 500;
                overflow: hidden;
                word-break: break-word;
              }
              .book-author {
                color: #868686;
                margin-top: 3px;
                max-height: 14px;
              }
            }
          }
        }

        .category-wrapper {
          position: relative;
          display: flex;
          background: #f5f5f5;
          border-radius: 10px;
          height: 96px;
          padding: 15px;
          box-sizing: border-box;

          .category-text {
            flex: 1;
            font-size: 16px;
            font-weight: 500;
            color: #333;
            width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .category-num {
            font-size: 12px;
            color: #999;
          }

          .category-img-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            font-size: 0;

            .category-img1 {
              position: absolute;
              right: 0;
              bottom: 0;
              z-index: 100;
              width: 50px;
              border-radius: 0 0 10px 0;
              overflow: hidden;
            }

            .category-img2 {
              position: absolute;
              right: 30px;
              bottom: 0;
              z-index: 90;
              width: 40px;
            }
          }
        }
      }
    }
  }
  .home-book-footer {
    padding: 12px 20px 20px;
  }
}
</style>
<style lang="scss">
.home-book-footer {
  .home-book-btn {
    width: 100%;
    color: #3696ef;
    font-size: 14px;
  }
}
</style>