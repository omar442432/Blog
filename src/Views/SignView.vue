<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const error = ref(null);
const signup = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Passwords must equal confirm password';
    return;
  }
  if (email.value == null) {
    error.value = 'Email is required';
    return;
  }
  if (password.value.length < 6) {
    error.value = 'Password must be at least 6 characters';
    return;
  }
  if (password.value == null) {
    error.value = 'Password is required';
    return;
  }

 await createUserWithEmailAndPassword(auth, email.value, password.value);
 router.push('/home');

}

</script>
<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="w-full max-w-sm rounded-xl bg-white p-8 shadow-lg">
      <h2 class="mb-6 text-center text-2xl font-bold text-gray-900">Create Account</h2>
      <form @submit.prevent="signup" class="space-y-5">

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="name@company.com"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="confirmPassword"
            class="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="••••••••"
          />
        </div>
        <div class="text-red-500">
           {{ error }}
        </div>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-600 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Sign Up
        </button>
        <p class="text-center text-sm text-gray-500">
          Already have an account?
          <a href="#" @click.prevent="router.push('/login')" class="font-medium text-blue-600 hover:text-blue-500 hover:underline"
            >Login</a
          >
        </p>
      </form>
    </div>
  </div>
</template>
<style scoped></style>
