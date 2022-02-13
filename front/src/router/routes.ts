import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', alias: 'employee', component: () => import('pages/Employee.vue') },
      { path: 'users', component: () => import('pages/User.vue') },
      { path: 'synthesis', component: () => import('pages/Synthesis.vue') },
      { path: 'services', component: () => import('pages/Service.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },

];

export default routes;
