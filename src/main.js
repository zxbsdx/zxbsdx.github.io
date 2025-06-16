import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')

// 实现双标题
document.addEventListener('visibilitychange', () => {
  document.title = document.hidden 
    ? '戳戳我~(-_-)' 
    : '谢谢你~(>_<)!!!';
});

// 初始加载时也设置一次
document.title = '谢谢你~(>_<)!!!';
