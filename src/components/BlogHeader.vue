<!--主页头部菜单-->
<template>
    <header class="blog-header">
      <div class="header-container">
  
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link">首页</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/messages" class="nav-link">留言</router-link>
            </li>
            <li class="nav-item">
              <button @click="toggleSearch" class="nav-link search-trigger">搜索</button>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">关于我</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">更多</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
    <!-- 搜索框 -->
    <div class="search-container" :class="{ 'active': isSearchVisible }">
      <input 
        type="text" 
        v-model="searchKeyword" 
        placeholder="搜索文章标题..." 
        class="search-input"
        @keyup.enter="performSearch"
      >
      <button @click="performSearch" class="search-btn">搜索</button>
    </div>
    <!-- 添加看板娘 看牌 -->
    <div class="image">
      <img src="https://api.boxmoe.com/random.php?size=mw1024*500">
      <div class="blur-effect"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRouter } from 'vue-router';
  
  const isSearchVisible = ref(false);
  const searchKeyword = ref('');
  const router = useRouter();
  
  // 切换搜索框显示/隐藏
  const toggleSearch = () => {
    isSearchVisible.value = !isSearchVisible.value;
    // 如果显示搜索框，自动聚焦
    if (isSearchVisible.value) {
      setTimeout(() => {
        document.querySelector('.search-input')?.focus();
      }, 100);
    }
  };
  
  // 执行搜索
  const performSearch = () => {
    if (searchKeyword.value.trim()) {
      // 导航到首页并附带搜索参数
      router.push({ 
        path: '/', 
        query: { search: searchKeyword.value.trim() } 
      });
    }
  };
  
  // 监听路由变化，当离开首页时隐藏搜索框
  watch(
    () => router.currentRoute.value.path,
    (newPath) => {
      if (newPath !== '/') {
        isSearchVisible.value = false;
      }
    }
  );
  </script>

  <style scoped>
  /* left width的绝对数值会导致移动端窗口的左右溢出 */
  .image{
    background-color: aqua;
    position: relative;
    padding-left: 4.5px;
    padding-right: 4.5px;
    border-radius: 12px;
    height: 500px;
    width: 98vw;
    top: 70px;
  }
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 底部虚化效果 */
  .blur-effect {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100px;
      background: linear-gradient(to top, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(255, 255, 255, 0.4) 30%,
          transparent 70%);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      mask: linear-gradient(to top, 
          rgba(0, 0, 0, 1) 0%, 
          rgba(0, 0, 0, 0.7) 50%,
          transparent 100%);
  }

  .blog-header {
    position: fixed;
    top: 0;         
    left: 0;
    width: 100%;
    z-index: 1000;  
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1rem 0;
    
  }
  
  .header-container {
    position: relative;
    max-width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: center;
  }

  .nav-list {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    
  }
  
  .nav-item {
    margin-left: 1.5rem;
  }
  
  .nav-link {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #007bff;
  }
  
  .nav-link.router-link-exact-active {
    color: #007bff;
    border-bottom: 2px solid #007bff;
    padding-bottom: 4px;
  }

  /* 搜索框样式 */
  .search-container {
    position: relative;
    height: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    top: 78px;

  }
  
  .search-container.active {
    height: 50px;
  }
  
  .search-input {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 0.9rem;
    width: 200px;
    transition: height 0.3s ease;
  }
  
  .search-input:focus {
    width: 250px;
    outline: none;
    border-color: #007bff;
  }
  
  .search-btn {
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .search-btn:hover {
    background-color: #0056b3;
  }
  
  </style>