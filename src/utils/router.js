import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/PageHome.vue';
import UserInfo from '../components/UserInfo.vue';



const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/UserInfo/:id',
    name: 'UserInfo',
    component: UserInfo
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
