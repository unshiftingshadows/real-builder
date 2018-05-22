
export default [
  { path: '/', redirect: '/dashboard' },

  {
    path: '/',
    component: () => import('layouts/builder'),
    children: [
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/ODashboard') },
      { path: 'list/:type', name: 'olist', component: () => import('pages/OList') },
      { path: 'media/:type', name: 'omedia', component: () => import('pages/OMedia') },
      { path: 'series/:id', name: 'oseries', component: () => import('pages/OSeries') },
      { path: 'lesson/:id', name: 'olesson', component: () => import('pages/OLesson') },
      { path: 'sermon/:id', name: 'osermon', component: () => import('pages/OSermon') },
      { path: 'scratch/:id', name: 'oscratch', component: () => import('pages/OScratchPad') },
      { path: 'settings', name: 'osettings', component: () => import('pages/Settings') },
      { path: 'addusers', name: 'addusers', component: () => import('pages/AddUsers') }
    ],
    meta: {
      requiresAuth: true,
      requiresREAL: false
    }
  },

  {
    path: '/real',
    component: () => import('layouts/real'),
    children: [
      { path: 'dashboard', name: 'realdashboard', component: () => import('pages/RDashboard') },
      { path: 'list/:type', name: 'rlist', component: () => import('pages/RList') },
      { path: 'series/:seriesid', name: 'rseries', component: () => import('pages/RSeries') },
      { path: 'series/:seriesid/lesson/:lessonid', name: 'rlesson', component: () => import('pages/RLesson') },
      { path: 'settings', name: 'rsettings', component: () => import('pages/Settings') }
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
      { path: '', name: 'login', component: () => import('pages/Login') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
