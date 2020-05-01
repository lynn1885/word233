<template>
  <div class="index">
    <!-- 搜索栏 -->
    <div class="search-bar">
      <el-autocomplete
        v-model="searchWord"
        size="small"
        suffix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        placeholder="查单词"
        :trigger-on-focus="false"
      />
    </div>
    <!-- 信息栏 -->
    <div class="info-bar">
      <div class="item number">
        累积收录: {{ wordsArr.length }} 个
      </div>
      <div class="item offical-account">
        公众号: 奇怪的背单词
      </div>
    </div>

    <!-- 列表 -->
    <ul class="word-list">
      <li
        v-for="word of curWordsArr"
        :key="word"
        class="word"
        @click="gotoWordPage(word)"
      >
        <div class="left">
          <div class="title">
            {{ wordsInfo[word].title }}
          </div>
          <div class="info">
            <div class="word item">
              {{ word }}
            </div>
            <div class="meaning item">
              {{ wordsInfo[word].meaning }}
            </div>
          </div>
        </div>
        <div class="blank" />
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
import axios from 'axios'
import { mapMutations } from 'vuex'

const pageSize = 10

interface WordInfo {
  meaning: string,
  title: string,
  stars: number,
}

export default Vue.extend({
  // 运行在服务器端
  async asyncData () {
    const result = {
      wordsInfo: null,
      wordsArr: [''],
      curWordsArr: ['']
    }
    // word info
    await axios.get('http://localhost:3000/words-res/all-words.json')
      .then((res) => {
        result.wordsInfo = res.data
        result.wordsArr = Object.keys(res.data)
        result.curWordsArr = result.wordsArr.slice(0, pageSize)
      })
      .catch(() => {
        console.error('获取所有单词json信息失败')
      })
    return result
  },
  // 数据
  data () {
    return {
      searchWord: '',
      pageSize,
      currentPage: 1,
      wordsInfo: {}, // asyncData
      wordsArr: [''], // asyncData
      curWordsArr: [''] // asyncData
    }
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
        const wordInfo: any = this.wordsInfo[word]
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
  background: rgb(250, 243, 234);
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 6px 0px #ddd;
  .el-autocomplete {
    width: 96%;
  }
  /deep/ .el-input__inner {
    border: none;
    background: rgb(252, 251, 249);
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
  font-size: 12px;
  color: #999;
  .item {
    padding: 2px 6px;
    margin: 0px 2px;
    background: #f4f4f4;
    border-radius: 2px;
  }
}

// 单词列表
.word-list {
  width: 100%;
  box-sizing: border-box;
}
.word {
  display: flex;
  padding: 10px;
  border-bottom: 1.5px dashed #eee;
  &:hover {
    background: #f4f4f4;
  }
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
      .item {
        font-size: 13px;
        padding: 2px 6px;
        margin-right: 4px;
        background: #f4f4f4;
        border-radius: 2px;
        color: #999;
      }
    }
  }
  .blank {
    flex-grow: 1;
  }
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
    background: rgb(241, 232, 220)!important;
  }
}
</style>
