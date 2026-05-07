import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import DashboardView from '@/views/DashboardView.vue'
import TaskGridView from '@/views/TaskGridView.vue'
import type { ObjectListViewData } from '@/types/ObjectListViewData'
import ObjectListView from '@/views/ObjectListView.vue'
import { ObjectListObjectType } from '@/enums/ObjectListObjectType'
import { useAuthStore } from '@/stores/authStore'
import { getObjectListViewData } from './objectListViewConfig'

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
      props: (): ObjectListViewData => getObjectListViewData(ObjectListObjectType.Companies)
    },
    {
      path: '/positions',
      name: 'positions',
      component: ObjectListView,
      props: (): ObjectListViewData => getObjectListViewData(ObjectListObjectType.Positions)
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
      meta: {
        ignoreAuth: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        ignoreAuth: true,
      }
    }
  ],
})


router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.ignoreAuth == true) return true;

   if (!authStore.isAuthenticated()) {
        return '/login';
    }
})

function isAuth_Temp() {
  return true;
}

export default router
