import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard'),
      },
      {
        path: '/church_management',
        name: 'Church Management',
        component: () => import('../views/ChurchManagement'),
      }
    ]
  }
]

const router = createRouter({
  history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(process.env.BASE_URL),
  routes
})

export default router
