import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TaskGridView from '@/views/TaskGridView.vue'
import type { ObjectListViewData } from '@/types/ObjectListViewData'
import ObjectListView from '@/views/ObjectListView.vue'
import { ObjectListObjectType } from '@/enums/ObjectListObjectType'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard-startup',
      component: DashboardView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/companies',
      name: 'companies',
      component: ObjectListView,
      props: (): ObjectListViewData => ({
        objectName: 'company',
        objectType: ObjectListObjectType.Companies,
        title: 'Companies',
        icon: 'company',
      }),
    },
    {
      path: '/positions',
      name: 'positions',
      component: ObjectListView,
      props: (): ObjectListViewData => ({
        objectName: 'position',
        objectType: ObjectListObjectType.Positions,
        title: 'Positions',
        icon: 'position',
      }),
    },
    // {
    //   path: '/appointments',
    //   name: 'appointments',
    //   component: AppointmentListView,
    // },
    // {
    //   path: '/applications',
    //   name: 'applications',
    //   component: ApplicationListView,
    // },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskGridView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }
  ],
})

export default router
