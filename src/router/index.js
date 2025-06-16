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