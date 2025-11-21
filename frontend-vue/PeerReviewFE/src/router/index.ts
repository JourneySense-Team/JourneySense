import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'home', 
    component: () => import('@/views/Home.vue')
  },
  { 
    path: '/login', 
    name: 'login', 
    component: () => import('@/views/Login.vue')
  },
  { 
    path: '/register', 
    name: 'register', 
    component: () => import('@/views/Register.vue')
  },
  { 
    path: '/dashboard', 
    name: 'dashboard', 
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router