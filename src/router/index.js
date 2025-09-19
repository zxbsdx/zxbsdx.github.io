import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') 
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/messages',
    name: 'Messages',
    component: () => import('@/views/Messages.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    beforeEnter: (to, from, next) => {
      const div = document.createElement('div');
      div.style.padding = '20px';
      div.style.position = 'absolute';
      div.style.width = '200px';
      div.style.top = '60px';
      div.style.left = '20px';
      div.textContent = '暂无更多内容哦~';
      document.body.appendChild(div);
    }
  },
  {
  path: '/article/:id',
  name: 'Article',
  component: () => import('@/views/ArticleDetail.vue')
  },
  {
  path: '/oiha',
  name: 'Edit',
  component: () => import('@/components/ArticleEdit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router