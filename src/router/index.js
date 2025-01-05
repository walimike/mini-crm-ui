
import { createRouter, createWebHistory } from 'vue-router/auto'

import DashboardView from '@/views/DashboardView.vue'
import RemindersView from '@/views/RemindersView.vue'
import NotesView from '@/views/NotesView.vue'
import ContactsView from '@/views/ContactsView.vue'
import LeadsView from '@/views/LeadsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/home", component: DashboardView },
    { path: "/leads", component: LeadsView },
    { path: "/contacts", component: ContactsView },
    { path: "/notes", component: NotesView },
    { path: "/reminders", component: RemindersView },
  ],
})

export default router
