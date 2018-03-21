
export default [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/',
    component: () => import('layouts/builder'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard') },
      { path: 'rlist/:type', name: 'rlist', component: () => import('pages/RList') },
      { path: 'rseries/:id', name: 'rseries', component: () => import('pages/RSeries') },
      { path: 'olist/:type', name: 'olist', component: () => import('pages/OList') },
      { path: 'oseries/:id', name: 'oseries', component: () => import('pages/OSeries') },
      { path: 'olesson/:id', name: 'olesson', component: () => import('pages/OLesson') }
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
