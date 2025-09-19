<template>
  <div class="message-board">
    <!-- 页面标题 -->
    <header class="board-header">
      <h1>留言板</h1>
      <p class="subtitle">留下你想对自己说的话吧,留言仅自己可见～</p>
    </header>

    <!-- 发布留言表单 -->
    <section class="post-form">
      <div class="form-group">
        <label for="username">昵称</label>
        <input
          type="text"
          id="username"
          v-model="newMessage.username"
          placeholder="请输入你的昵称"
          required
          maxlength="16"
        >
      </div>

      <div class="form-group">
        <label for="content">留言内容</label>
        <textarea
          id="content"
          v-model="newMessage.content"
          placeholder="请输入留言内容（支持简单换行）"
          required
          maxlength="200"
          rows="4"
        ></textarea>
        <p class="word-count">{{ newMessage.content.length }}/200</p>
      </div>

      <button 
        class="submit-btn" 
        @click="submitMessage"
        :disabled="!newMessage.username || !newMessage.content.trim()"
      >
        发布留言
      </button>
    </section>

    <!-- 留言列表 -->
    <section class="message-list">
      <h2 class="list-title">最新留言（{{ messages.length }}）</h2>
      
      <!-- 空列表提示 -->
      <div class="empty-tip" v-if="messages.length === 0">
        <i class="icon"></i>
        <p>暂无留言，快来发布第一条留言吧～</p>
      </div>

      <!-- 留言项 -->
      <div class="message-item" v-for="(msg, index) in messages" :key="msg.id">
        <div class="msg-header">
          <span class="msg-username">{{ msg.username }}</span>
          <span class="msg-time">{{ formatTime(msg.time) }}</span>
        </div>
        <div class="msg-content">{{ msg.content }}</div>
        <button 
          class="delete-btn" 
          @click="deleteMessage(index)"
          title="删除留言"
        >
          删除
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';

const newMessage = ref({
  username: '',
  content: '',
  id: '',
  time: ''
});

// 留言列表（初始从本地存储读取）
const messages = ref([]);

onMounted(() => {
  const savedMessages = localStorage.getItem('messageBoard');
  if (savedMessages) {
    messages.value = JSON.parse(savedMessages);
  }
});

const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

const submitMessage = () => {
  // 生成唯一ID（时间戳 + 随机数，避免重复）
  const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
  
  // 组装新留言数据
  const messageToAdd = {
    ...newMessage.value,
    id: uniqueId,
    time: new Date().toISOString() // 存储标准时间格式，便于后续格式化
  };

  messages.value.unshift(messageToAdd);

  localStorage.setItem('messageBoard', JSON.stringify(messages.value));

  newMessage.value = {
    username: '',
    content: '',
    id: '',
    time: ''
  };

  alert('留言发布成功！');
};

const deleteMessage = (index) => {
  if (confirm('确定要删除这条留言吗？')) {
    messages.value.splice(index, 1);
    localStorage.setItem('messageBoard', JSON.stringify(messages.value));
  }
};
</script>

<style scoped>
/* 全局样式重置与基础设置 */
.message-board {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333;
  line-height: 1.6;
}

/* 标题区域 */
.board-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.board-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.board-header .subtitle {
  font-size: 1rem;
  color: #7f8c8d;
}

/* 发布表单区域 */
.post-form {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #2c3e50;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.1);
}

.form-group textarea {
  resize: vertical;
}

.word-count {
  text-align: right;
  font-size: 0.85rem;
  color: #7f8c8d;
  margin-top: 0.3rem;
}

.submit-btn {
  width: 100%;
  padding: 0.9rem;
  background: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background: #2980b9;
}

/* 留言列表区域 */
.message-list {
  margin-top: 2.5rem;
}

.list-title {
  font-size: 1.3rem;
  color: #2c3e50;
  margin-bottom: 1.2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f1f1f1;
}

/* 空列表提示 */
.empty-tip {
  text-align: center;
  padding: 3rem 1rem;
  background: #f9f9f9;
  border-radius: 8px;
  color: #7f8c8d;
}

.empty-tip .icon {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23bdc3c7' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'%3E%3C/path%3E%3C/svg%3E") no-repeat center;
  background-size: contain;
}

/* 留言项样式 */
.message-item {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
}

.msg-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.msg-username {
  font-weight: 600;
  color: #2c3e50;
}

.msg-time {
  font-size: 0.8rem;
  color: #7f8c8d;
  position: relative;
  bottom: -36px;
}

.msg-content {
  color: #34495e;
  line-height: 1.8;
  white-space: pre-line;
  margin-bottom: 0.5rem;
}

.delete-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  color: #e74c3c;
  background: transparent;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.delete-btn:hover {
  background: #e74c3c;
  color: #fff;
}

/* 响应式适配（移动端） */
@media (max-width: 768px) {
  .message-board {
    padding: 1.5rem 0.8rem;
  }

  .board-header h1 {
    font-size: 1.7rem;
  }

  .post-form {
    padding: 1.2rem;
  }

  .message-item {
    padding: 1rem;
  }

  .delete-btn {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
  }
}
</style>