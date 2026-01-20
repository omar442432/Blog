<script setup>
import { sendPasswordResetEmail } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { auth } from '../firebase/config'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref(null)
const password = ref(null)
const error = ref(null)

const signin = async () => {
  if (email.value == null) {
    error.value = 'Email is required'
    return
  }
  if (password.value == null) {
    error.value = 'Password is required'
    return
  }

  await signInWithEmailAndPassword(auth, email.value, password.value)
  router.push('/home')
}

const forgotPassword = async () => {
  if (email.value == null) {
    error.value = 'Email is required'
    return
  }
  await sendPasswordResetEmail(auth, email.value)
  error.value = 'Check your email for a reset link'
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
      <h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Login</h2>
      <div
        v-if="error"
        class="mb-4 text-center text-sm font-medium text-red-600 bg-red-50 p-2 rounded-lg"
      >
        {{ error }}
      </div>
      <form @submit.prevent="signin" class="space-y-5">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>
        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span class="text-gray-500">Remember me</span>
          </label>
          <a
            @click.prevent="forgotPassword"
            href="#"
            class="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >Forgot password?</a
          >
        </div>
        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Sign In
        </button>
        <p class="text-center text-sm text-gray-500">
          Don't have an account?
          <a href="#" @click.prevent="router.push('/sign')" class="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >Sign up</a
          >
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
