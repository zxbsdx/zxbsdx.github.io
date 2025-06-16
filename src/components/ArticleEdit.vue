
<template>
  <div class="article-editor">
    <h2>{{ editing ? '编辑文章' : '写新文章' }}</h2>
    <form @submit.prevent="submitArticle">
   
      <div class="form-group">
        <label>标题</label>
        <input 
          v-model="article.title" 
          type="text" 
          required
          placeholder="输入文章标题"
        >
      </div>

  
      <div class="form-group">
        <label>内容</label>
        <textarea
          v-model="article.content"
          rows="10"
          required
          placeholder="输入文章内容（支持Markdown语法）"
        ></textarea>
      </div>

    
      <div class="form-group" v-if="!editing">
        <label>作者</label>
        <input
          v-model="article.author"
          type="text"
          placeholder="您的名字"
        >
      </div>

      <!-- 提交按钮 -->
      <div class="actions">
        <button type="submit" class="submit-btn">
          {{ editing ? '更新文章' : '发布文章' }}
        </button>
        <button 
          v-if="editing" 
          type="button" 
          class="cancel-btn"
          @click="$router.go(-1)"
        >
          取消
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    editing: { type: Boolean, default: false },
    existingArticle: { type: Object, default: null }
  },
  data() {
    return {
      article: this.existingArticle || {
        title: '',
        content: '',
        author: '匿名',
        date: new Date().toISOString().slice(0, 10),
        id: null
      }
    }
  },
  methods: {
    submitArticle() {
    
      if (!this.editing) {
        this.article.id = Date.now()
      }

   
      this.article.excerpt = this.article.content.substring(0, 100) + '...'

      // 触发事件
      this.$emit(this.editing ? 'article-updated' : 'article-created', this.article)

 
      if (!this.editing) {
        this.article = {
          title: '',
          content: '',
          author: '匿名',
          date: new Date().toISOString().slice(0, 10),
          id: null
        }
      }

      // 跳转到文章详情页
      this.$router.push(`/article/${this.article.id}`)
    }
  }
}
</script>

<style scoped>
.article-editor {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.submit-btn {
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f0f0f0;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>