import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Dashboard from '../views/Dashboard.vue'
import Transactions from '../views/Transactions.vue'
import AddTransaction from '../views/AddTransaction.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/login',    name: 'login',    component: Login,    meta: { guest: true } },
    { path: '/register', name: 'register', component: Register, meta: { guest: true } },
    { path: '/',         name: 'dashboard',    component: Dashboard,       meta: { requiresAuth: true } },
    { path: '/transactions', name: 'transactions', component: Transactions, meta: { requiresAuth: true } },
    { path: '/add',      name: 'add',      component: AddTransaction,  meta: { requiresAuth: true } }
  ]
})

// 네비게이션 가드
router.beforeEach((to) => {
  const auth = useAuthStore()

  // 로그인 필요한 페이지 → 미로그인이면 /login 으로
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'login' }
  }

  // 이미 로그인한 상태에서 /login, /register 접근 → 대시보드로
  if (to.meta.guest && auth.isLoggedIn) {
    return { name: 'dashboard' }
  }
})

export default router
