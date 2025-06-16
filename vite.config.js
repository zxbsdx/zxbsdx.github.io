import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  
  server: {
   
    fs: {
      allow: [
        // 允许访问项目根目录
        process.cwd(),
        // 显式添加 public 目录
        path.resolve(process.cwd(), 'public')
      ]
    }
  },
   proxy: {
      '/fonts': {
        target: 'http://localhost:5173',
        rewrite: (path) => path.replace(/^\/fonts/, '/public/fonts'),
        bypass: (req) => req.url.endsWith('.ttf') ? null : undefined
      }
    },
  
  assetsInclude: ['**/*.ttf'],  
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      
    }
  },
  
})
