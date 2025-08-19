import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path:'/barrage',
      name:'barrage',
      component: () => import('../views/BarrageView.vue')
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/news/:id',
      name: 'newsDetail',
      component: () => import('../views/NewsDetailView.vue')
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('../views/ActivityView.vue')
    },
    {
      path: '/activity/:id',
      name: 'activityDetail',
      component: () => import('../views/ActivityDetailView.vue')
    },
    {
      path:'/join',
      name:'join',
      component:()=>import('../views/Join.vue')
    }
  ],
})

export default router
