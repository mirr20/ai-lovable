import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from './api'

export const useAuthStore = defineStore('auth', () => {
  // state — localStorage 에서 복원
  const user = ref(JSON.parse(localStorage.getItem('mb_user') || 'null'))
  const token = ref(localStorage.getItem('mb_token') || null)

  // getters
  const isLoggedIn = computed(() => !!user.value)
  const userName = computed(() => user.value?.name || '')
  const userEmail = computed(() => user.value?.email || '')

  // 로그인
  const login = async (email, password) => {
    const { data } = await api.get('/users', { params: { email, password } })
    if (!data.length) throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.')

    const found = data[0]
    // 간단한 토큰 시뮬레이션 (실무에서는 JWT 사용)
    const fakeToken = btoa(`${found.id}:${Date.now()}`)
    user.value = { id: found.id, name: found.name, email: found.email, username: found.username }
    token.value = fakeToken

    localStorage.setItem('mb_user', JSON.stringify(user.value))
    localStorage.setItem('mb_token', fakeToken)
    return user.value
  }

  // 회원가입
  const register = async ({ username, name, email, password }) => {
    // 이메일 중복 체크
    const { data: existing } = await api.get('/users', { params: { email } })
    if (existing.length) throw new Error('이미 사용 중인 이메일입니다.')

    // username 중복 체크
    const { data: existingUsername } = await api.get('/users', { params: { username } })
    if (existingUsername.length) throw new Error('이미 사용 중인 아이디입니다.')

    const { data: newUser } = await api.post('/users', {
      username,
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    })

    const fakeToken = btoa(`${newUser.id}:${Date.now()}`)
    user.value = { id: newUser.id, name: newUser.name, email: newUser.email, username: newUser.username }
    token.value = fakeToken

    localStorage.setItem('mb_user', JSON.stringify(user.value))
    localStorage.setItem('mb_token', fakeToken)
    return user.value
  }

  // 로그아웃
  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('mb_user')
    localStorage.removeItem('mb_token')
  }

  return {
    user, token,
    isLoggedIn, userName, userEmail,
    login, register, logout
  }
})
