const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../pages/Home.vue')
      }
    ]
  }
]

export default routes