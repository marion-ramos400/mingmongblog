import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '@/components/Home.vue'
import Posts from '@/components/Posts/Posts.vue'
import PostsItem from '@/components/Posts/PostsItem.vue'
import PostsForm from '@/components/Posts/PostsForm.vue'

import Contact from '@/components/Contact.vue'

const routes = [
  { path: '/', component: Home},
  { path: '/posts', component: Posts},
  { path: '/posts/:id', component: PostsItem},
  { path: '/posts/form', component: PostsForm},
  { path: '/contact', component: Contact},
]


const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;
