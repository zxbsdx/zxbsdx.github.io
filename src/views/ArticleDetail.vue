
<template>
  <div class="article-detail" v-if="article">
    <h1>{{ article.title }}</h1>
    <div class="meta">
      <span>发布于 {{ article.date }}</span>
      <span>作者 {{ article.author }}</span>
    </div>
    <div class="content">{{ article.content }}</div>
    <router-link to="/">返回首页</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      article: null
    }
  },
  created() {
    const articleId = parseInt(this.$route.params.id)
    const allArticles = JSON.parse(localStorage.getItem('articles')) || []
    this.article = allArticles.find(a => a.id === articleId)
  }
}
</script>