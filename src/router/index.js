import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

// OIDC
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'
import Callback from '../views/oidc/Callback.vue'
import Logout from "../views/oidc/Logout.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: "register-test-covid",
    component: () => import("../views/RegisterTestCovid.vue")
  },
  {
    path: "/register-test-covid",
    name: "register-test-covid",
    component: () => import("../views/RegisterTestCovid.vue")
  },
  {
    path: "/vaccination",
    name: "vaccination",
    
    beforeEnter: () => {
      window.location.href = 'https://www.panamadigital.gob.pa/Vacunacion';
    }
},
{
  path: "/user-profile",
  name: "user-profile",
  
  beforeEnter: () => {
    window.location.href = 'https://www.panamadigital.gob.pa/Perfil';
  }
}
,
  {
    path: "/pharmacy/:pharmacyId",
    name: "pharmacy",
    component: () => import("../views/RegisterTestCovidPharmacy.vue"),
    props: true
  },
  // OIDC
  {
    path: '/oidc-callback',
    name: 'oidcCallback',
    component: Callback,
    meta: { isPublic: true }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(vuexOidcCreateRouterMiddleware(store, 'oidcStore'));

export default router
