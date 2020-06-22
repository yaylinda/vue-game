import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/games/:gameId',
    name: 'Games',
    component: () => import('../views/Game.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: '/vue-game/',
  routes
})

export default router
