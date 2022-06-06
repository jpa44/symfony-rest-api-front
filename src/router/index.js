import Vue from 'vue'
import VueRouter from 'vue-router'
import {trailingSlash} from "@/util/helpers";
import {layout, route} from "@/util/routes";

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
  return to.path.endsWith('/') ? next() : next(trailingSlash(to.path))
})

export default router
