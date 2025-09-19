<template>
  <div class="article-preview">
    <!-- 搜索结果提示 -->
    <div v-if="searchQuery" class="search-result-tip">
      {{ filteredArticles.length }} 篇关于 "{{ searchQuery }}" 的文章
    </div>
    
    <!-- 没有搜索结果时显示 -->
    <div v-if="searchQuery && filteredArticles.length === 0" class="no-results">
      没有找到包含 "{{ searchQuery }}" 的文章
    </div>
    
    <!-- 文章列表 -->
    <div v-for="article in filteredArticles" :key="article.id" class="article-card">
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
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import initialArticles from '@/assets/article.js';

export default {
  name: 'ArticlePreview',
  setup() {
    const articles = ref(initialArticles);
    const route = useRoute();
    const searchQuery = ref('');
    
    // 监听路由参数变化，获取搜索关键词
    watch(
      () => route.query.search,
      (newSearch) => {
        searchQuery.value = newSearch || '';
      },
      { immediate: true }
    );
    
    // 根据搜索关键词过滤文章
    const filteredArticles = computed(() => {
      if (!searchQuery.value) {
        return articles.value;
      }
      
      const query = searchQuery.value.toLowerCase();
      return articles.value.filter(article => 
        article.title.toLowerCase().includes(query)
      );
    });
    
    // 格式化日期
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString('zh-CN', options);
    };
    
    return {
      articles,
      filteredArticles,
      searchQuery,
      formatDate
    };
  }
};
</script>

<style scoped>
.article-preview {
  gap: 2rem;
  margin-top: 2rem;
  padding: 0 1rem;

}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
  margin-top: 20px;
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
  flex-wrap: wrap;
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

/* 搜索相关样式 */
.search-result-tip {
  color: #666;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
  color: #7f8c8d;
  background: #f9f9f9;
  border-radius: 8px;
}

@media (min-width: 768px) {
  .article-preview {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .article-preview {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
    