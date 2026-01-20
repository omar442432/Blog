<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div v-if="route.path === '/'" class="flex min-h-screen items-center justify-center bg-gray-50">
    <div class="text-center w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
      <h1 class="mb-8 text-4xl font-extrabold text-blue-600">Welcome</h1>
      <p class="mb-8 text-gray-600 text-lg">Please choose an option to continue</p>

      <div class="flex flex-col gap-4">
        <router-link
          to="/login"
          class="block w-full rounded-lg bg-blue-600 px-6 py-4 text-center text-lg font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Login
        </router-link>

        <router-link
          to="/sign"
          class="block w-full rounded-lg bg-white border-2 border-blue-600 px-6 py-4 text-center text-lg font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Account
        </router-link>
      </div>
    </div>
  </div>

  <router-view />
</template>

<style scoped></style>
