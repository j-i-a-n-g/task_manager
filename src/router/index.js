import { createRouter, createWebHistory } from 'vue-router'
// import Agent from '@/views/Agent.vue'

const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/views/Main.vue'),
    beforeEnter: (to, from, next) => {
      if (from.path === '/') {
        to.params = { tag: 1 }
      }
      next()
    }
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
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('@/views/Setting.vue')
  },
  {
    path: '/addwork',
    name: 'AddWork',
    component: () => import('@/views/AddWork.vue')
  },
  {
    path: '/reviseUsername',
    name: 'Username',
    component: () => import('@/components/Username.vue')
  },
  {
    path: '/collect',
    name: 'Collect',
    component: () => import('@/views/Collect.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const arrCookie = document.cookie.split(';')
  let userid = ''
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=')
    if (arr[0] === 'connect.sid') {
      userid = arr[0]
      break
    }
  }
  // 如果前往的页面不是登录页面且没有cookie标志，这跳转到登录页面
  if (to.path !== '/login') {
    if (!userid) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    // 如果前往的页面是登录页面
    if (userid) {
      next({ path: '/' })
    } else {
      next()
    }
  }
})

export default router
