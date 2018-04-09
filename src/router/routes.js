
export default [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/',
    component: () => import('layouts/builder'),
    children: [
      { path: 'odashboard', name: 'odashboard', component: () => import('pages/ODashboard') },
      { path: 'olist/:type', name: 'olist', component: () => import('pages/OList') },
      { path: 'oseries/:id', name: 'oseries', component: () => import('pages/OSeries') },
      { path: 'olesson/:id', name: 'olesson', component: () => import('pages/OLesson') },
      { path: 'osermon/:id', name: 'osermon', component: () => import('pages/OSermon') }
    ],
    meta: {
      requiresAuth: true,
      requiresREAL: false
    }
  },

  {
    path: '/',
    component: () => import('layouts/real'),
    children: [
      { path: 'rdashboard', name: 'rdashboard', component: () => import('pages/RDashboard') },
      { path: 'rlist/:type', name: 'rlist', component: () => import('pages/RList') },
      { path: 'rseries/:id', name: 'rseries', component: () => import('pages/RSeries') }
    ],
    meta: {
      requiresAuth: true,
      requiresREAL: true
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
