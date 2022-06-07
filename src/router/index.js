import Vue from 'vue'
import VueRouter from 'vue-router'
import {trailingSlash} from "@/util/helpers";
import {layout, route} from "@/util/routes";
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  },
  layout('Default', [
    route('Dashboard', null, '/dashboard'),
    route('DocumentType', null, '/document_type'),
    route('User', null, '/users'),
  ]),
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/'];
  const restrictedPages = ['/users/', '/document_type/'];
  const loggedIn = store.state.auth.userToken;
  
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (!publicPages.includes(to.path) && !loggedIn) {
    next('/');
  } 

  const roles = store.state.user ? store.state.user.user.roles : []
  if (restrictedPages.includes(to.path) && loggedIn && roles.includes('ROLE_USER')) {
    next('/dashboard');
  } 

  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
