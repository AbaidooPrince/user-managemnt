import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import adminRoutes from './admin'
import membersRoutes from './members'
import { isLoggedIn } from '../Services/auth'
import goTo from 'vuetify/es5/services/goto'

Vue.use(VueRouter)

const indexRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "register" */ '../views/SignUp.vue')
    }
  },
  {
    path: '/loading',
    name: 'loading',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "register" */ '../views/containers/LoaderPage.vue')
    }
  },
  {
    path: '/pages',
    props: true,
    name: 'Pages',
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "group-page" */ '../views/Pages.vue')
    }
  },
  {
    path: '/pages/:organizationUrl',
    props: true,
    name: 'OrganizationPage',
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "group-page" */ '../views/containers/OrganizationPage.vue')
    }
  },
  {
    path: '/pages/:organizationUrl/login',
    name: 'OrganizationLogin',
    props: true,
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/pages/:organizationUrl/register',
    name: 'OrganizationRegister',
    props: true,
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/containers/OrganizationRegister.vue')
    }
  },
  {
    path: '/user/:organizationUrl',
    props: true,
    name: 'OrganizationAuthPage',
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "group-page" */ '../views/containers/OrganizationPage.vue')
    }
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      requiresAuth: false,
      page: 'general'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/slots',
    name: 'Slots',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Slots.vue')
    }
  },
  {
    path: '/users',
    name: 'Users',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Users.vue')
    }
  },
  {
    path: '/403',
    name: '403',
    meta: {
      requiresAuth: false,
      page: 'user'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/containers/Forbidden.vue')
    }
  },
  {
    path: '/404',
    name: '404',
    meta: {
      requiresAuth: false,
      page: 'error'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/containers/404.vue')
    }
  },
  {
    path: '/profile',
    meta: {
      requiresAuth: true,
      page: 'user'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/Profile.vue')
    },
    children: [
      {
        path: '/profile',
        name: 'Profile',
        meta: {
          requiresAuth: true,
          page: 'user'
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/profile/General.vue')
        }
      },
      {
        path: 'education',
        name: 'Education',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/profile/Education.vue')
        }
      },
      {
        path: 'employment',
        name: 'Employment',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
          return import(/* webpackChunkName: "about" */ '../components/profile/Employment.vue')
        }
      }
    ]
  }
]
const routes = indexRoutes.concat(adminRoutes, membersRoutes)
const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth === true) {
    if (!(to.meta.page === 'general') && !isLoggedIn()) {
      next({
        path: '/403',
        query: { redirect: to.fullPath }
      })
    } else if ((to.meta.page === 'user') && !isLoggedIn()) {
      next({
        path: '/403',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
  //
})

export default router
