<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  error.value = ''
  if (!email.value || !password.value) {
    error.value = '이메일과 비밀번호를 입력해주세요.'
    return
  }
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="auth-card">
      <!-- 로고 -->
      <div class="auth-brand">
        <div class="auth-brand-icon">
          <i class="fa-solid fa-wallet"></i>
        </div>
        <h1 class="auth-brand-title">MoneyBook</h1>
        <p class="auth-brand-sub">Smart Ledger</p>
      </div>

      <h2 class="auth-heading">로그인</h2>
      <p class="auth-desc">계정에 로그인하여 가계부를 관리하세요</p>

      <!-- 에러 메시지 -->
      <div v-if="error" class="auth-alert">
        <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
      </div>

      <form @submit.prevent="handleLogin" novalidate>
        <!-- 이메일 -->
        <div class="auth-field">
          <label class="auth-label">이메일</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-envelope auth-input-icon"></i>
            <input
              v-model="email"
              type="email"
              class="auth-input"
              placeholder="이메일을 입력하세요"
              autocomplete="email"
            />
          </div>
        </div>

        <!-- 비밀번호 -->
        <div class="auth-field">
          <label class="auth-label">비밀번호</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-lock auth-input-icon"></i>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              class="auth-input"
              placeholder="비밀번호를 입력하세요"
              autocomplete="current-password"
            />
            <button
              type="button"
              class="auth-input-toggle"
              @click="showPassword = !showPassword"
              tabindex="-1"
            >
              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="loading"><i class="fa-solid fa-spinner fa-spin"></i> 로그인 중...</span>
          <span v-else><i class="fa-solid fa-right-to-bracket"></i> 로그인</span>
        </button>
      </form>

      <div class="auth-divider"><span>또는</span></div>

      <p class="auth-switch">
        아직 계정이 없으신가요?
        <RouterLink to="/register" class="auth-link">회원가입</RouterLink>
      </p>

      <!-- 테스트 계정 안내 -->
      <div class="auth-demo">
        <p><i class="fa-solid fa-circle-info"></i> 테스트 계정</p>
        <p>이메일: <code>admin@moneybook.com</code></p>
        <p>비밀번호: <code>admin1234</code></p>
      </div>
    </div>
  </div>
</template>
