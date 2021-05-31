export default [
  {
    path: '/admin',
    name: 'admin',
    meta: {
      requiresAuth: true,
      page: 'organizationAdmin'
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/containers/Organizer.vue')
    }
  },
  {
    path: '/admin/organizations/:id',
    props: true,
    name: 'allAdminContainer',
    meta: {
      role: 'organizer',
      requiresAuth: true,
      page: 'organizationAdmin'
    },
    // route level code-splitting
    // this generates a separate chunk (a bout.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/containers/AllAdminContainer.vue')
    },
    children: [
      {
        path: 'members',
        props: true,
        name: 'Members',
        meta: {
          role: 'organizer',
          requiresAuth: true,
          page: 'organizationAdmin'
        },
        component: () => {
          return import(/* webpackChunkName: "login" */ '../views/adminPages/MembersView.vue')
        }
      }

    ]
  }
]
