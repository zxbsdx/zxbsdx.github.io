<template>
  <div id="app">
    <BlogHeader />
    <main class="container">
        
        <router-view />


    </main>
    <BlogFooter />
  </div>

</template>

<script>
import BlogHeader from './components/BlogHeader.vue'
import BlogFooter from './components/BlogFooter.vue'
import Content from './components/Content.vue'
import ArticlePreview from './components/ArticlePreview.vue'

// 添加左键出现小图标

export default {
  components: {
    BlogHeader,
    BlogFooter,
    Content,
    ArticlePreview
  }
}
</script>

<style>
  /* 全局样式 */
  .container {
    width: 75vw; /* 100% 视口宽度 */
    max-width: 100%;
    margin: 0 auto;
    padding: 20px;
    margin-top: 30px;
    flex:1;
  }

</style>
