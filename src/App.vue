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
  width: 100vw; /* 100% 视口宽度 */
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  flex:1;
}

</style>
