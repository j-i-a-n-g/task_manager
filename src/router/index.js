import { createRouter, createWebHistory } from 'vue-router'
// import Agent from '@/views/Agent.vue'

const routes = [
  {
    path: '/agent',
    name: 'Agent',
    component: () => import('@/views/Agent.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@c/Search.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
