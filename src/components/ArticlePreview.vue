<template>
  <div class="article-preview">
    <div v-for="article in articles" :key="article.id" class="article-card">
      <h2 class="article-title">
        <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
      </h2>
      <div class="article-meta">
        <span class="date">{{ formatDate(article.date) }}</span>
        <span class="tags" v-for="tag in article.tags" :key="tag">#{{ tag }}</span>
      </div>
      <p class="article-excerpt">{{ article.excerpt }}</p>
      <router-link :to="`/article/${article.id}`" class="read-more">阅读全文 →</router-link>
    </div>
  </div>
</template>

<script>
import initialArticles from '@/assets/article.js'
export default {
  name: 'ArticlePreview',
  data() {
    return {
      articles: initialArticles
    }
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString('zh-CN', options)
    }
  }
}
</script>

<style scoped>
.article-preview {
  display: grid;
  gap: 2rem;
  margin-top: 2rem;
}

.article-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.article-card:hover {
  transform: translateY(-4px);
}

.article-title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
}

.article-title a {
  color: #2c3e50;
  text-decoration: none;
}

.article-title a:hover {
  color: #42b983;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.tags {
  background: #f0f0f0;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.article-excerpt {
  color: #34495e;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.read-more {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.read-more:hover {
  text-decoration: underline;
}
</style>