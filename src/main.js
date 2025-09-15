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

document.title = '谢谢你~(>_<)!!!';

const icons = ['heart', 'star', 'thumbs-up', 'smile', 'circle', 'check', 'bolt', 'fire'];

const colors = ['#ff2d95', '#ffdd00', '#00c2ff', '#32de84', '#ff7700', '#9d4edd', '#ff2600', '#00f5d4'];

// 监听全局点击事件 屏幕下滑后就会出现误差
document.addEventListener('click', function(e) {
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const icon = document.createElement('i');
    icon.className = `fas fa-${randomIcon} click-effect`;
    
    // 添加页面滚动位置
    const x = e.clientX + window.scrollX;
    const y = e.clientY + window.scrollY;
    icon.style.left = `${x}px`;
    icon.style.top = `${y}px`;
    icon.style.color = randomColor;
    icon.style.fontSize = `${24 + Math.random() * 20}px`;   

    document.body.appendChild(icon);
    
    setTimeout(() => {
        icon.remove();
    }, 800);
});

function showLoader() {
  document.getElementById('globalLoader').style.display = 'flex';
}

function hideLoader() {
  document.getElementById('globalLoader').style.display = 'none';
}

async function loadContent() {
  showLoader();

  hideLoader();
}
loadContent();

