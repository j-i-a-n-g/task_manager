import { createRouter, createWebHistory } from 'vue-router'
// import Agent from '@/views/Agent.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@c/Search.vue')
  },
  {
    path: '/work',
    name: 'Work',
    component: () => import('@/views/Work.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
