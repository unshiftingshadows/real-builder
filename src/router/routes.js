
export default [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/',
    component: () => import('layouts/builder'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard') }
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/login',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/Login') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
