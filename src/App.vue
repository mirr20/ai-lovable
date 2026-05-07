<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<template>
  <!-- 비로그인: 사이드바 없이 전체 화면 -->
  <RouterView v-if="!auth.isLoggedIn" />

  <!-- 로그인: 사이드바 + 메인 레이아웃 -->
  <div v-else class="app-shell">
    <aside class="sidebar">
      <div class="brand">
        <i class="fa-solid fa-wallet brand-icon"></i>
        <div>
          <div class="brand-title">MoneyBook</div>
          <div class="brand-sub">Smart Ledger</div>
        </div>
      </div>

      <nav class="nav flex-column gap-1">
        <RouterLink to="/" class="nav-link" active-class="active" exact-active-class="active">
          <i class="fa-solid fa-chart-pie"></i> <span>대시보드</span>
        </RouterLink>
        <RouterLink to="/transactions" class="nav-link" active-class="active">
          <i class="fa-solid fa-list-ul"></i> <span>거래 내역</span>
        </RouterLink>
        <RouterLink to="/add" class="nav-link" active-class="active">
          <i class="fa-solid fa-plus-circle"></i> <span>거래 추가</span>
        </RouterLink>
      </nav>

      <!-- 사용자 정보 + 로그아웃 -->
      <div class="sidebar-user">
        <div class="sidebar-user-avatar">
          {{ auth.userName.charAt(0) }}
        </div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">{{ auth.userName }}</div>
          <div class="sidebar-user-email">{{ auth.userEmail }}</div>
        </div>
        <button class="sidebar-logout-btn" @click="handleLogout" title="로그아웃">
          <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      </div>

      <div class="sidebar-footer">
        <i class="fa-solid fa-circle-info"></i> Vue 3 · Pinia · Bootstrap 5
      </div>
    </aside>

    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>
