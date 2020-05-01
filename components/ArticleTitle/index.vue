<template>
  <div class="article-title">
    <h1>{{ title }}</h1>
    <div class="info">
      <div class="item author">
        公众号: 奇怪的背单词
      </div>
      <div class="item word">
        {{ word }}
      </div>
      <el-rate
        :value="stars"
        disabled
        text-color="#ff9900"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    word: {
      type: String,
      required: true
    },
    meaning: {
      type: String,
      required: true
    },
    stars: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-title {
  padding: 50px 10px 40px 10px;
  color: #333;
  // 标题
  h1 {
    text-align: center;
    font-size: 18px;
    padding: 16px;
  }
  // 信息栏
  .info {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #999;
    .item {
      padding: 2px 6px;
      margin: 0px 2px;
      background: #f4f4f4;
      border-radius: 2px;
    }
    .el-rate {
      margin-left: 10px;
    }
    /deep/ .el-rate__icon {
      margin: 0;
    }
  }
}
</style>
