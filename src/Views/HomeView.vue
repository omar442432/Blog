<script setup>
import { ref, onMounted, computed } from 'vue'
import { auth, db } from '../firebase/config'

import { useRouter } from 'vue-router'
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore'

const router = useRouter()
const posts = ref([
  {
    id: 1,
    title: 'Getting Started with Vue 3',
    excerpt:
      'Vue 3 brings many new features and performance improvements. Learn how to get started with the Composition API.',
    author: 'Sarah Jenkins',
    date: 'Jan 19, 2026',
    category: 'Development',
  },
])
const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, 'posts', id))
    fetchPosts()
  } catch (e) {
    console.error('Error deleting post: ', e)
  }
}
const editingPostId = ref(null)
const editForm = ref({
  title: '',
  content: '',
})

const startEditing = (post) => {
  editingPostId.value = post.id
  editForm.value = {
    title: post.title,
    content: post.content || post.excerpt,
  }
}

const searchPost = ref('')

const filteredPosts = computed(() => {
  if (!searchPost.value) return posts.value
  const query = searchPost.value.toLowerCase()
  return posts.value.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.content && post.content.toLowerCase().includes(query)) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(query)),
  )
})

const cancelEdit = () => {
  editingPostId.value = null
  editForm.value = { title: '', content: '' }
}

const saveEdit = async (id) => {
  try {
    await updateDoc(doc(db, 'posts', id), {
      title: editForm.value.title,
      content: editForm.value.content,
      excerpt: editForm.value.content,
    })
    editingPostId.value = null
    fetchPosts()
  } catch (e) {
    console.error('Error editing post: ', e)
  }
}
const fetchPosts = async () => {
  try {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    posts.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (e) {
    console.error('Error fetching posts: ', e)
  }
}

onMounted(() => {
  fetchPosts()
})

const signout = async () => {
  await auth.signOut()
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-gray-900">Dev Blog</h1>
          </div>
          <div class="flex items-center gap-4">
            <div
              class="h-6 flex items-center justify-center text-blue-600 font-semibold cursor-pointer"
            >
              {{ auth?.currentUser?.email }}
            </div>
            <button
              @click="signout"
              class="text-sm font-medium text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header & Actions -->
      <div class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-900">Latest Articles</h2>
          <p class="mt-2 text-gray-600">Insights and tutorials from our engineering team.</p>
        </div>

        <div class="flex items-center gap-4 w-full sm:w-auto">
          <!-- Search -->
          <div class="relative flex-1 sm:flex-initial">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              v-model="searchPost"
              type="text"
              placeholder="Search posts..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64 transition-all duration-200"
            />
          </div>

          <!-- Create Button -->
          <router-link
            to="/create"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Create Post
          </router-link>
        </div>
      </div>

      <!-- Blog Grid -->
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
        >
          <div class="mb-4 flex items-center gap-2">
            <span class="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
              {{ post.category }}
            </span>
            <span class="text-xs text-gray-500">
              {{ post.date || post.createdAt?.toDate().toLocaleDateString() }}
            </span>
          </div>

          <div v-if="editingPostId === post.id" class="mb-4">
            <input
              v-model="editForm.title"
              class="w-full mb-2 px-2 py-1 border rounded text-lg font-bold"
              placeholder="Title"
              @click.stop
            />
            <textarea
              v-model="editForm.content"
              class="w-full px-2 py-1 border rounded text-gray-600 h-24 resize-none"
              placeholder="Content"
              @click.stop
            ></textarea>
          </div>
          <template v-else>
            <h3 class="mb-2 text-xl font-bold text-gray-900">
              {{ post.title }}
            </h3>
            <p class="mb-4 text-gray-600 line-clamp-3">
              {{ post.excerpt || post.content }}
            </p>
          </template>

          <div class="flex items-center justify-between border-t pt-4">
            <template v-if="editingPostId === post.id">
              <div class="flex gap-2">
                <button
                  @click.stop="saveEdit(post.id)"
                  class="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  @click.stop="cancelEdit()"
                  class="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </template>
            <template v-else>
              <span class="text-xs text-gray-500">{{ post.userEmail }}</span>
              <span
                @click.stop="deletePost(post.id)"
                class="text-xs text-gray-500 cursor-pointer hover:text-red-500"
                >delete</span
              >
              <span
                @click.stop="startEditing(post)"
                class="text-xs text-gray-500 cursor-pointer hover:text-blue-500"
                >edit</span
              >

              <span class="text-sm font-medium text-gray-900">{{ post.author }}</span>
              <span class="text-sm font-medium text-blue-600 hover:text-blue-500 cursor-pointer"
                >Read more &rarr;</span
              >
            </template>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
