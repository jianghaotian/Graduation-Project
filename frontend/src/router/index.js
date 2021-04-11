import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
      },
      // 所有仓库
      {
        path: '/repositories',
        name: 'Repositories',
        component: () => import('@/views/repositories')
      },
      // 进入单个仓库
      {
        path: '/repository/:id',
        name: 'Repository',
        component: () => import('@/views/repository')
      },
      // ----- 404 -----
      {
        path: '/404',
        name: 'notFound',
        component: () => import('@/views/notFound')
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
