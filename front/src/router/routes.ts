import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', alias: 'employee', name: '0', component: () => import('pages/Employee.vue') },
      //{ path: 'users', name: '0', component: () => import('pages/User.vue') },
      { path: 'synthesis', name: '1', component: () => import('pages/Synthesis.vue') },
      { path: 'audits', name: '2',component: () => import('pages/Audit.vue') },
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
