<template>
  <div id="app">
    <BlogHeader />
    <main class="container">
      <router-view />
      <Content />
    </main>
    <BlogFooter />
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader.vue'
import BlogFooter from './components/BlogFooter.vue'
import Content from './components/Content.vue'


export default {
  components: {
    BlogHeader,
    BlogFooter,
    Content
  }
}
</script>

<style>
/* 全局样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
