import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3857acde = () => interopDefault(import('..\\pages\\auth\\signin.vue' /* webpackChunkName: "pages/auth/signin" */))
const _387bdddc = () => interopDefault(import('..\\pages\\auth\\signout.vue' /* webpackChunkName: "pages/auth/signout" */))
const _0f2afff2 = () => interopDefault(import('..\\pages\\auth\\signup.vue' /* webpackChunkName: "pages/auth/signup" */))
const _4a989716 = () => interopDefault(import('..\\pages\\boards\\_id.vue' /* webpackChunkName: "pages/boards/_id" */))
const _9db723ca = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/auth/signin",
    component: _3857acde,
    name: "auth-signin"
  }, {
    path: "/auth/signout",
    component: _387bdddc,
    name: "auth-signout"
  }, {
    path: "/auth/signup",
    component: _0f2afff2,
    name: "auth-signup"
  }, {
    path: "/boards/:id?",
    component: _4a989716,
    name: "boards-id"
  }, {
    path: "/",
    component: _9db723ca,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
