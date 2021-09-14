import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignIn.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/Calendar.vue')
    }
  ]
})

export default router