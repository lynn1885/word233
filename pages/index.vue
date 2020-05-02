<template>
  <div class="index">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-autocomplete
        v-model="searchWord"
        size="small"
        suffix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        placeholder="搜索功能暂不可用哦, 持续开发中~"
        :trigger-on-focus="false"
      />
    </div>
    <!-- 信息栏 -->
    <div class="info-bar">
      <div class="tag number">
        收录: {{ wordsArr.length }} 个  整理中...
      </div>
      <div class="tag offical-account">
        公众号: 奇怪的背单词
      </div>
      <div class="tag">
        5.2 夏
      </div>
    </div>

    <!-- 列表 -->
    <ul class="word-list">
      <li
        v-for="word of curWordsArr"
        :key="word"
        class="word-list-item"
        @click="gotoWordPage(word)"
      >
        <!-- 左侧 -->
        <div class="left">
          <div class="title">
            {{ wordsInfo[word].title }}
          </div>
          <div class="info">
            <div class="word tag">
              {{ word }}
            </div>
            <div class="meaning tag">
              {{ wordsInfo[word].meaning }}
            </div>
          </div>
        </div>
        <div class="blank" />
        <!-- 右侧 -->
        <div class="right">
          <img :src="/words-res/ + word + '/poster.jpg'">
        </div>
      </li>
    </ul>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="wordsArr.length"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapMutations } from 'vuex'

const pageSize = 10

interface WordInfo {
  meaning: string,
  title: string,
  stars: number,
}

export default Vue.extend({
  // 运行在服务器端
  async asyncData ({ app }) {
    const result = {
      wordsInfo: null,
      wordsArr: [''],
      curWordsArr: ['']
    }
    // word info

    await app.$axios.$get('words-res/all-words.json')
      .then((res: any) => {
        result.wordsInfo = res
        result.wordsArr = Object.keys(res)
        result.curWordsArr = result.wordsArr.slice(0, pageSize)
      })
      .catch(() => {
        console.error('获取所有单词json信息失败')
      })
    return result
  },
  // 数据
  data () {
    interface IndexData {
      searchWord: string,
      pageSize: number,
      currentPage: number,
      wordsInfo: {
        [index: string]: any,
      },
      wordsArr: string[],
      curWordsArr: string[],
    }
    const d: IndexData = {
      searchWord: '',
      pageSize,
      currentPage: 1,
      wordsInfo: {}, // asyncData
      wordsArr: [''], // asyncData
      curWordsArr: [''] // asyncData
    }
    return d
  },
  watch: {
    currentPage (newPageSize) {
      this.curWordsArr = this.wordsArr.slice((newPageSize - 1) * pageSize, newPageSize * pageSize)
    }
  },
  created () {
    this.currentPage = this.$store.state.currentPage
  },
  methods: {
    ...mapMutations([
      'updateCurrentPage'
    ]),
    querySearch (str: string, cb: Function) {
      const res = []
      let i = 0
      const maxNum = 10
      for (const word in this.wordsInfo) {
        const wordInfo = this.wordsInfo[word]
        if (word.includes(str) || wordInfo.meaning.includes(str)) {
          res.push({ value: `${word}  ${wordInfo.meaning}`, path: word })
          i++
          if (i === maxNum) {
            break
          }
        }
      }
      cb(res)
    },
    searchHandler () {
    },
    gotoWordPage (word: string) {
      this.updateCurrentPage(this.currentPage)
      this.$router.push(`/words/${word}`)
    }
  }
})
</script>
<style lang="scss" scoped>
@import "@/assets/css/var.scss";

// root
.index {
  margin-bottom: 20px;
}

// 搜索栏
.search-bar {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 46px;
  width: 100%;
  background: $em-bg;
  justify-content: center;
  align-items: center;
  box-shadow: $top-bar-shadow;
  .el-autocomplete {
    width: 96%;
  }
  /deep/ .el-input__inner {
    border: none;
    background: lighten($color: $main-bg, $amount: 1) ;
  }
}

// 信息栏
.info-bar {
  padding-top: 72px;
  padding-bottom: 16px;
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
}

// 单词列表
.word-list {
  width: 100%;
  box-sizing: border-box;
}
.word-list-item {
  display: flex;
  padding: 10px;
  border-bottom: 1.5px dashed #eee;
  &:hover {
    background: $info-bg;
  }
  // 左侧
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
        flex-grow: 1;
        display: flex;
        align-items: center;
      }
    .info {
      display: flex;
      flex-grow: 1;
      align-items: center;
    }
  }
  .blank {
    flex-grow: 1;
  }
  // 右侧
  .right {
    width: 120px;
    overflow: hidden;
    border-radius: 2px;
    flex-shrink: 0;
    img {
      height: 80px;
      min-width: 100%;
    }
  }
}
// 分页
.pagination {
  padding: 10px;
  display: flex;
  justify-content: center;
  /deep/.el-pagination .active {
    background: darken($color: $em-bg, $amount: 3)!important;
    color: $main-color!important;
    font-weight: 300!important;
  }
  /deep/.el-pagination .number {
    font-weight: 300!important;
  }
}
</style>
