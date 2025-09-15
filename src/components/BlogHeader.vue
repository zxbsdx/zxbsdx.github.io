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
              <router-link to="/categories" class="nav-link">搜索</router-link>
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
    <!-- 添加看板娘 看牌 -->
    <div class="image">
      <img src="https://api.boxmoe.com/random.php?size=mw1024*500">
      <div class="blur-effect"></div>
    </div>
  </template>
  
  <style scoped>
  /* left width的绝对数值会导致移动端窗口的左右溢出 */
  .image{
    position: relative;
    height: 500px;
    width: 100vw;
    top: 57px;
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
  </style>