<template>
  <div class="article-detail">
    <!-- 加载状态提示 -->
    <div v-if="loading" class="loading-spinner">
      <div class="spinner"></div>
      <p>正在加载文章...</p>
    </div>
    
    <!-- 文章内容 -->
    <div v-if="article" class="article-container">
      <h1 class="article-title">{{ article.title }}</h1>
      
      <div class="meta-info">
        <span class="publish-date"><i class="far fa-calendar-alt"></i> {{ article.date }}</span>
        <span class="author" v-if="article.author"><i class="fas fa-user"></i> {{ article.author }}</span>
        <div class="tags" v-if="article.tags && article.tags.length">
          <span class="tag" v-for="tag in article.tags" :key="tag">
            <i class="fas fa-tag"></i> {{ tag }}
          </span>
        </div>
      </div>
      
      <div class="content-box">
        <div class="article-content">{{ article.content }}</div>
      </div>
    </div>
    
    <!-- 未找到提示 -->
    <div v-else-if="!loading" class="not-found">
      <i class="fas fa-exclamation-triangle"></i>
      <p>未找到该文章</p>
      <router-link to="/" class="home-link">返回首页</router-link>
    </div>
    
    <router-link to="/" class="back-link">
      <i class="fas fa-arrow-left"></i> 返回首页
    </router-link>
  </div>
</template>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Maple Mono', 'JetBrains Mono', Consolas, monospace;
  color: #333;
  line-height: 1.6;
}

/* 加载动画 */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 文章容器 */
.article-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin: 2rem auto; /* 保持上下边距，水平居中 */
  width: 90%; /* 默认宽度 */
  max-width: 1200px; /* 最大宽度限制 */
  min-height: 80vh; /* 至少占据视口高度的80% */
}

@media (min-width: 768px) {
  .article-container {
    width: 85%; /* 在大屏幕上稍宽一些 */
    padding: 3rem; /* 更大的内边距 */
  }
}

@media (min-width: 1200px) {
  .article-container {
    width: 80%; /* 在超大屏幕上保持80%宽度 */
  }
}

.article-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  font-weight: 600;
  line-height: 1.2;
}

/* 元信息样式 */
.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  align-items: center;
}

.meta-info i {
  margin-right: 0.3rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f1f1f1;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* 内容区域 */
.content-box {
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #34495e;
}

/* 未找到提示 */
.not-found {
  text-align: center;
  padding: 3rem;
  background: #fff8e1;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.not-found i {
  font-size: 3rem;
  color: #ff9800;
  margin-bottom: 1rem;
}

.not-found p {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

/* 返回链接 */
.back-link, .home-link {
  display: inline-flex;
  align-items: center;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.5rem 1rem;
  border: 1px solid #3498db;
  border-radius: 4px;
}

.back-link:hover, .home-link:hover {
  color: white;
  background: #3498db;
}

.back-link i, .home-link i {
  margin-right: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 1rem;
  }
  
  .article-container {
    padding: 1.5rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
}
</style>

<script>
import initialArticles from '@/assets/article.js'
export default {
  data() {
    return {
      articles: initialArticles,
      loading: true
    }
  },
  created() {
    this.loadArticle()
  },
  watch: {
    '$route.params.id': {
      handler: 'loadArticle',
      immediate: true,
      article: null
    }
  },
  methods: {
    loadArticle() {
      this.loading = true
      const articleId = parseInt(this.$route.params.id)
      
     
      setTimeout(() => {
        const localArticles = JSON.parse(localStorage.getItem('articles')) || []
        const allArticles = [...this.articles, ...localArticles]
        
        this.article = allArticles.find(a => a.id === articleId)
        this.loading = false
        
        if(!this.article) {
          console.warn(`未找到文章ID: ${articleId}`)
        }
      }, 300)
    }
  }
}
</script>

