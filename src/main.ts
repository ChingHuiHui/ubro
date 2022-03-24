import { createApp, provide, h } from 'vue'
import App from './App.vue'

import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from '@/plugins/apolloClient'

import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { createI18n } from 'vue-i18n'
import { zh, en } from '@/lang'

import StoragePlugin from '@/plugins/storage'

import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/home.vue'
import Points from '@/pages/points.vue'
import Exchange from '@/pages/exchange.vue'
import AdminLogin from '@/pages/login.vue'
import Code from '@/pages/code.vue'
import UserRecords from '@/pages/records/get.vue'

import Products from '@/pages/products/index.vue'
import CreateProduct from '@/pages/products/create.vue'
import UpdateProduct from '@/pages/products/update.vue'

import './assets/styles/index.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

// state management - pinaia
const pinia = createPinia()

// fontawesome
const fontAwesomePackages = [fas, fab, far]

function loadFontAwesome() {
  fontAwesomePackages.forEach((pack) => library.add(pack))

  app.component('font-awesome-icon', FontAwesomeIcon)
}

loadFontAwesome()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    'zh-TW': zh,
    en,
  },
})

const routes = [
  { path: '/', component: Home, name: 'home' },
  {
    path: '/points',
    component: Points,
    name: 'user-points',
    meta: { requiresAuth: true },
  },
  {
    path: '/records',
    component: UserRecords,
    name: 'user-records',
    meta: { requiresAuth: true },
  },
  {
    path: '/exchange',
    component: Exchange,
    name: 'user-exchange',
    meta: { requiresAuth: true },
  },
  { path: '/admin/login', name: 'admin-login', component: AdminLogin },
  { path: '/admin/code', name: 'admin-code', component: Code },
  {
    path: '/admin/products',
    component: Products,
    name: 'admin-products.index',
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/products/create',
    component: CreateProduct,
    name: 'admin-products.store',
    meta: { requiresAdmin: true },
  },
  {
    path: '/admin/products/:id/update',
    component: UpdateProduct,
    name: 'admin-products.update',
    meta: { requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory('ubro'),
  routes,
})

app.use(StoragePlugin)
app.use(pinia)
app.use(i18n)
app.use(router)

app.mount('#app')
