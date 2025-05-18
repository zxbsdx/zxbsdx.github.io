<template>
    <div>这里是文章预览内容</div>
    <ArticlePreview />
    <div class="home">
       
        
    </div>
</template>

<script>
    import ArticlePreview from '../components/ArticlePreview.vue'
    import initialArticles from '@/assets/article.js'
    export default {
    components: { 
        ArticlePreview,

    },
    data() {
    return {
      articles: initialArticles
    }
    },
    methods: {
        addArticle(newArticle) {
        this.articles.unshift(newArticle) // 添加到数组开头
        this.saveArticles() // 保存到本地存储
        },
        saveArticles() {
        localStorage.setItem('articles', JSON.stringify(this.articles))
        }
    },
    created() {
        // 从本地存储加载文章
        const savedArticles = localStorage.getItem('articles')
        if (savedArticles) {
        this.articles = JSON.parse(savedArticles)
        }
    }

}
</script>
