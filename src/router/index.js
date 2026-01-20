import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../Views/HomeView.vue'
import LoginView from '../Views/LoginView.vue'
import SignView from '../Views/SignView.vue'
import CreatePostView from '../Views/CreatePostView.vue'
import { auth } from '../firebase/config'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/sign',
      name: 'sign',
      component: SignView,
      meta: {
        requiresAuth: false,
      },
    },

    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      name: "createPost",
      path: "/create",
      component: CreatePostView,
      meta: {
        requiresAuth: true,
      },
    }
  ],
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;
  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});
export default router
