<template>
  <div class="word">
    <article-top-bar />
    <article-title
      :title="curWordInfo.title"
      :word="word"
      :meaning="curWordInfo.meaning"
      :stars="curWordInfo.stars"
    />
    <div class="passage" v-html="passageHtml" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import ArticleTopBar from '@/components/ArticleTopBar'
import ArticleTitle from '@/components/ArticleTitle'

export default Vue.extend({
  components: {
    ArticleTopBar,
    ArticleTitle
  },

  // 运行在服务器端
  async asyncData ({ params }) {
    const word = params.word
    const result = {
      word,
      curWordInfo: null,
      passageHtml: ''
    }

    // word info
    await axios.get('http://localhost:3000/words-res/all-words.json')
      .then((res) => {
        result.curWordInfo = res.data[word]
      })
      .catch(() => {
        console.error('获取单词json信息失败', word)
      })

    // article
    if (word) {
      await axios.get(`http://localhost:3000/words-res/${word}/index.html`)
        .then((res) => {
          result.passageHtml = res.data
        })
        .catch(() => {
          console.error('获取单词article失败', word)
        })
    }
    return result
  },
  data () {
    return {
      // curWordInfo
      // passageHtml
    }
  },
  // url中比如传递单词信息, 否则跳转到404
  // 如: http://localhost:3000/words/haha 就可以
  // 如: http://localhost:3000/words 就不行
  // 运行在服务器端
  validate ({ params }) {
    if (params.word) {
      return true
    } else {
      return false
    }
  }
})
</script>
<style lang="scss" scoped>
// root
.word {
  padding: 0px 12px;
  border-bottom: 2px dashed #eee;
  margin-bottom: 200px;
}

// passage
/deep/ .passage {
  box-sizing: border-box;
  font-size: 14px;
  line-height: 1.7;
  color: #333;
  padding-bottom: 40px;
  // text
  .strong {
    font-weight: 600;
  }
  .center {
    text-align: center;
  }
  .big {
    font-size: 17px;
  }
  .small {
    font-size: 13px;
  }
  .red {
    color: red;
  }
  // image
  img {
    width: 100%;
    &.border {
      border: 2px solid #666;
    }
    box-sizing: border-box;
  }

  // audio
  audio {
    width: 70%;
    height: 60px;
    margin: 10px 15%;
    outline: none;
  }

  // 文章
  .article {
    padding-bottom: 40px;
  }

  // 记忆
  .memory, .addition {
    color: #666;
    background: #f4f4f4;
    border-radius: 4px;
    margin: 20px 0px;
    padding: 8px 10px 16px 10px;
    line-height: 2;
    .item {
      font-weight: 600;
    }
    .title {
      text-align: center;
      font-size: 14px;
      color: #ccc;
      font-weight: 600;
      letter-spacing: 10px;
      margin-bottom: 10px;
    }
  }
  .memory {
    .word, .mem {
      font-weight: 600;
    }
  }

  // 补充
  .addition {
    .item {
      font-weight: 600;
    }
  }
}

</style>
