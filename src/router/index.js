import { createRouter, createWebHistory } from 'vue-router/auto';

import DashboardView from '@/views/DashboardView.vue';
import RemindersView from '@/views/RemindersView.vue';
import NotesView from '@/views/NotesView.vue';
import ContactsView from '@/views/ContactsView.vue';
import LeadsView from '@/views/LeadsView.vue';
import SignInView from '@/views/SignInView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/home', component: DashboardView, meta: { requiresAuth: true } },
    { path: '/leads', component: LeadsView, meta: { requiresAuth: true } },
    { path: '/contacts', component: ContactsView, meta: { requiresAuth: true } },
    { path: '/notes', component: NotesView, meta: { requiresAuth: true } },
    { path: '/reminders', component: RemindersView, meta: { requiresAuth: true } },
    { path: '/sign-in', component: SignInView },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.accessToken || null
  
  if (!token) {
    return next('/sign-in');
  }
  next();
});

export default router;
