<template>
  <div class="article-top-bar">
    <div class="home">
      <nuxt-link to="/" class="el-icon-arrow-left" />
    </div>
    <div class="title">
      奇怪的背单词
    </div>
    <div class="home">
      <i class="el-icon-arrow-left" style="color: transparent" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleTopBar'
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/var.scss";

.article-top-bar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: $em-bg;
  box-shadow: $top-bar-shadow;
  height: $top-bar-height;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  .title {
    text-align: center;
    flex-grow: 1;
    font-size: 14px;
  }
  .home {
    font-size: 20px;
    padding-left: 10px;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
