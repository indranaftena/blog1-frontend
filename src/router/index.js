import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/Post.vue'
import CategoryView from '../views/Category.vue'
import AllCategoriesView from '../views/AllCategories.vue'
import TagView from '../views/Tag.vue'
import AllTagsView from '../views/AllTags.vue'
import SignInView from '../views/SignIn.vue'
import SignUpView from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/post/:slug',
      name: 'post',
      component: PostView
    },
    {
      path: '/category/:category',
      name: 'category',
      component: CategoryView,
    },
    {
      path: '/categories',
      name: 'categories',
      component: AllCategoriesView,
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: TagView,     
    },
    {
      path: '/tags',
      name: 'tags',
      component: AllTagsView,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInView,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUpView,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { 
        top: 0,
        behavior: 'smooth',
      }
    }
  },
})

export default router
