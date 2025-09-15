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
        <div class="article-content markdown-body" v-if="compiledMarkdown" v-html="compiledMarkdown"></div>
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
    max-width: 1200px;
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
    min-height: 85vh; /* 至少占据视口高度的80% */
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

  /* Markdown 内容样式 */
  .markdown-body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      word-wrap: break-word;
  }
  
  .markdown-body h1,
  .markdown-body h2,
  .markdown-body h3,
  .markdown-body h4,
  .markdown-body h5,
  .markdown-body h6 {
      margin-top: 24px;
      margin-bottom: 16px;
      font-weight: 600;
      line-height: 1.25;
      color: #2c3e50;
  }
  
  .markdown-body h1 {
      font-size: 2em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
  }
  
  .markdown-body h2 {
      font-size: 1.5em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
  }
  
  .markdown-body h3 {
      font-size: 1.25em;
  }
  
  .markdown-body p {
      margin-bottom: 16px;
  }
  
  .markdown-body ul, 
  .markdown-body ol {
      padding-left: 2em;
      margin-bottom: 16px;
  }
  
  .markdown-body li {
      margin-bottom: 0.25em;
  }
  
  .markdown-body blockquote {
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
      margin-bottom: 16px;
  }
  
  .markdown-body code {
      padding: 0.2em 0.4em;
      margin: 0;
      font-size: 85%;
      background-color: rgba(27,31,35,0.05);
      border-radius: 3px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  }
  
  .markdown-body pre {
      padding: 16px;
      overflow: auto;
      font-size: 85%;
      line-height: 1.45;
      background-color: #f6f8fa;
      border-radius: 6px;
      margin-bottom: 16px;
  }
  
  .markdown-body pre code {
      background: none;
      padding: 0;
      margin: 0;
      font-size: 100%;
      word-break: normal;
      white-space: pre;
      border: 0;
  }
  
  .markdown-body table {
      border-spacing: 0;
      border-collapse: collapse;
      margin-bottom: 16px;
      width: 100%;
  }
  
  .markdown-body table th,
  .markdown-body table td {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
  }
  
  .markdown-body table th {
      font-weight: 600;
      background-color: #f6f8fa;
  }
  
  .markdown-body table tr {
      background-color: #fff;
      border-top: 1px solid #c6cbd1;
  }
  
  .markdown-body table tr:nth-child(2n) {
      background-color: #f6f8fa;
  }
  
  .markdown-body img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #fff;
      margin-bottom: 16px;
      border-radius: 6px;
  }
  
  .markdown-body hr {
      height: 0.25em;
      padding: 0;
      margin: 24px 0;
      background-color: #e1e4e8;
      border: 0;
  }
</style>

<script>
import initialArticles from '@/assets/article.js'
import { marked } from 'marked';
import hljs from 'highlight.js'; // 导入highlight.js
import 'highlight.js/styles/github.css'; // 导入高亮样式

marked.setOptions({
  highlight: function(code, lang) {
    try {
      // 若指定语言且存在，用指定语言高亮；否则自动识别
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return hljs.highlightAuto(code).value;
    } catch (err) {
      // 高亮失败时返回原始代码（避免阻断渲染）
      console.warn('代码高亮失败:', err);
      return code;
    }
  },
  langPrefix: 'hljs language-',
  breaks: true,
  gfm: true, // 支持GitHub风格Markdown
  breaks: true, // 支持换行
  pedantic: false, // 关闭“严格语法检查”（避免轻微格式问题导致解析失败）
});

export default {
  data() {
    return {
      articles: initialArticles,
      loading: true,
      article: null // 初始化article数据
    }
  },
  computed: {
    // 计算属性：将Markdown内容转换为HTML
    compiledMarkdown() {
      if (!this.article || !this.article.content || typeof this.article.content !== 'string') {
        return ''; // 内容为空时返回空字符串，不触发marked解析
      }
      try {
        return marked.parse(this.article.content);
      } catch (err) {
        console.error('Markdown解析失败:', err);
        return this.article.content; // 解析失败时显示原始内容
      }
    }
  },
  created() {
    this.loadArticle()
  },
  watch: {
    // 修复watch属性的写法
    '$route.params.id': {
      handler: 'loadArticle',
      immediate: true
    }
  },
  methods: {
    loadArticle() {
      this.loading = true;
      const articleId = parseInt(this.$route.params.id);
      
      // 模拟异步加载
      setTimeout(() => {
        try {
          const localArticles = JSON.parse(localStorage.getItem('articles')) || [];
          const allArticles = [...this.articles, ...localArticles];
          
          this.article = allArticles.find(a => a.id === articleId);
          
          if (!this.article) {
            console.warn(`未找到文章ID: ${articleId}`);
          }
        } catch (error) {
          console.error('加载文章失败:', error);
        } finally {
          this.loading = false;
        }
      }, 300);
    }
  }
}
</script>
