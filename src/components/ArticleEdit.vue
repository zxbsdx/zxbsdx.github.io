<!-- src/components/ArticleEditor.vue -->
<template>
  <div class="editor">
    <h2>写新文章</h2>
    <form @submit.prevent="submitArticle">
      <input v-model="newArticle.title" placeholder="标题" required>
      <textarea v-model="newArticle.content" placeholder="内容" required></textarea>
      <button type="submit">发布</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newArticle: {
        title: '',
        content: '',
        date: new Date().toISOString().split('T')[0]
      }
    }
  },
  methods: {
    submitArticle() {
      // 生成文章摘要
      const excerpt = this.newArticle.content.substring(0, 100) + '...'
      
      // 创建完整文章对象
      const article = {
        ...this.newArticle,
        id: Date.now(), // 使用时间戳作为ID
        excerpt,
        author: "当前用户" // 这里可以替换为实际用户
      }
      
      // 触发添加文章事件
      this.$emit('article-added', article)
      
      // 清空表单
      this.newArticle = { title: '', content: '' }
    }
  }
}
</script>