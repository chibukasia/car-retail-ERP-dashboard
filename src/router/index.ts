import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // { path: '/', redirect: '/home' },
    {
      path: '/',
      name: 'Home',
      component: () => import('../layouts/default.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'My Search',
          component: () => import('../pages/home.vue'),
          children: [],
        },
        {
          path: 'my-search/search-list/:categoryId/:groupName',
          name: 'Search List',
          component: () => import('../pages/my-search/search-list.vue'),
          props: true,
        },
        {
          path: 'my-search/parts-categories/:id',
          name: 'Parts Categories',
          component: () => import('../pages/my-search/parts-categories.vue'),
          props: true,
        },
        {
          path: 'my-search/:id/:artNumber/:supId',
          name: 'My Search Details',
          component: () => import('../pages/my-search/search-product.vue'),
          props: true,
        },

        {
          path: 'account-settings',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
