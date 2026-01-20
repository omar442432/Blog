<template>
  <div class="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Create New Post</h2>
        <p class="mt-2 text-center text-sm text-gray-600">Share your thoughts with the world</p>
      </div>
      <form @submit.prevent="createPost" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Title Input -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700"> Post Title </label>
            <div class="mt-1">
              <input
                v-model="title"
                id="title"
                name="title"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                placeholder="Enter an interesting title"
              />
            </div>
          </div>

          <!-- Content Textarea -->
          <div>
            <label for="content" class="block text-sm font-medium text-gray-700"> Content </label>
            <div class="mt-1">
              <textarea
                v-model="content"
                id="content"
                name="content"
                rows="6"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                placeholder="Write your post content here..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/pencil-alt -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"
                />
                <path
                  fill-rule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Publish Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { addDoc, collection } from 'firebase/firestore'
  import { auth } from '../firebase/config'
  import { db } from '../firebase/config'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  const title = ref('')
  const content = ref('')
  const createPost = async () => {
    await addDoc(collection(db, 'posts'), {
      title: title.value,
      content: content.value,
      userId: auth.currentUser.uid,
      userEmail: auth.currentUser.email,
      createdAt: new Date(),
    })
    router.push('/home')
    title.value = ''
    content.value = ''

  }
</script>

<style scoped></style>
