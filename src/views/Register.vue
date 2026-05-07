<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = ref({
  username: '',
  name: '',
  email: '',
  password: '',
  passwordConfirm: ''
})
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const showConfirm = ref(false)

const validate = () => {
  if (!form.value.username || !form.value.name || !form.value.email || !form.value.password) {
    return '모든 항목을 입력해주세요.'
  }
  if (!/^[a-zA-Z0-9_]{3,20}$/.test(form.value.username)) {
    return '아이디는 영문, 숫자, 밑줄(_)로 3~20자여야 합니다.'
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    return '올바른 이메일 형식을 입력해주세요.'
  }
  if (form.value.password.length < 6) {
    return '비밀번호는 6자 이상이어야 합니다.'
  }
  if (form.value.password !== form.value.passwordConfirm) {
    return '비밀번호가 일치하지 않습니다.'
  }
  return null
}

const handleRegister = async () => {
  error.value = ''
  const msg = validate()
  if (msg) { error.value = msg; return }

  loading.value = true
  try {
    await auth.register({
      username: form.value.username,
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    })
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

      <h2 class="auth-heading">회원가입</h2>
      <p class="auth-desc">새 계정을 만들어 가계부를 시작하세요</p>

      <!-- 에러 메시지 -->
      <div v-if="error" class="auth-alert">
        <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
      </div>

      <form @submit.prevent="handleRegister" novalidate>
        <!-- 아이디 -->
        <div class="auth-field">
          <label class="auth-label">아이디</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-user auth-input-icon"></i>
            <input
              v-model="form.username"
              type="text"
              class="auth-input"
              placeholder="영문, 숫자, 밑줄 3~20자"
              autocomplete="username"
            />
          </div>
        </div>

        <!-- 이름 -->
        <div class="auth-field">
          <label class="auth-label">이름</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-id-card auth-input-icon"></i>
            <input
              v-model="form.name"
              type="text"
              class="auth-input"
              placeholder="이름을 입력하세요"
              autocomplete="name"
            />
          </div>
        </div>

        <!-- 이메일 -->
        <div class="auth-field">
          <label class="auth-label">이메일</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-envelope auth-input-icon"></i>
            <input
              v-model="form.email"
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
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="auth-input"
              placeholder="6자 이상 입력하세요"
              autocomplete="new-password"
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

        <!-- 비밀번호 확인 -->
        <div class="auth-field">
          <label class="auth-label">비밀번호 확인</label>
          <div class="auth-input-wrap">
            <i class="fa-solid fa-lock auth-input-icon"></i>
            <input
              v-model="form.passwordConfirm"
              :type="showConfirm ? 'text' : 'password'"
              class="auth-input"
              :class="{ 'auth-input-error': form.passwordConfirm && form.password !== form.passwordConfirm }"
              placeholder="비밀번호를 다시 입력하세요"
              autocomplete="new-password"
            />
            <button
              type="button"
              class="auth-input-toggle"
              @click="showConfirm = !showConfirm"
              tabindex="-1"
            >
              <i :class="showConfirm ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </div>
          <p
            v-if="form.passwordConfirm && form.password !== form.passwordConfirm"
            class="auth-field-error"
          >
            비밀번호가 일치하지 않습니다.
          </p>
        </div>

        <button type="submit" class="auth-btn" :disabled="loading">
          <span v-if="loading"><i class="fa-solid fa-spinner fa-spin"></i> 가입 중...</span>
          <span v-else><i class="fa-solid fa-user-plus"></i> 회원가입</span>
        </button>
      </form>

      <div class="auth-divider"><span>또는</span></div>

      <p class="auth-switch">
        이미 계정이 있으신가요?
        <RouterLink to="/login" class="auth-link">로그인</RouterLink>
      </p>
    </div>
  </div>
</template>
