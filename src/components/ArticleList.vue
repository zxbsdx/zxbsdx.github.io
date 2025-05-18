
<template>
  <div class="article-list">
    <h2>最新文章</h2>
    <div v-for="article in articles" :key="article.id" class="article">
      <h3>{{ article.title }}</h3>
      <p class="meta">发布于 {{ article.date }} · 作者 {{ article.author }}</p>
      <p class="excerpt">{{ article.excerpt }}</p>
      <router-link :to="`/article/${article.id}`">阅读全文</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articles']
}
</script>