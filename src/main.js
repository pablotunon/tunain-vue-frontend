import { createApp, nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import LoginView from './components/LoginView.vue'
import LogoutView from './components/LogoutView.vue'
import HomeView from './components/HomeView.vue'
import WelcomeView from './components/WelcomeView.vue'
import BookView from './components/BookView.vue'


import store from './store.js'


const app = createApp(App)

// Store
app.use(store)
app.config.globalProperties.$store = store; // Allow store in all componenets this.$store

// Router
const routes = [
  {
    name: 'Login',
    path: '/login',
    component: LoginView
  },
  {
    name: 'Logout',
    path: '/logout',
    component: LogoutView,
  },
  {
    name: 'Home',
    path: '/',
    component: HomeView,
    children: [
      {
        name: 'Welcome',
        path: '',
        component: WelcomeView
      },
      {
        name: 'Book',
        path: 'book',
        component: BookView
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  // linkActiveClass: "active",
  // linkExactActiveClass: "active",
  routes,
})

// Guard pages to be accessed without being authenticated
router.beforeEach((to, from, next) => {
  if (store.getters.isLoggedIn) {
    if (to.name == 'Login') {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    // if (['Login', 'Home', 'Welcome'].includes(to.name)) {
    //   next()
    // } else {
    //   store.commit("next_page", to)
    //   next({ name: 'Home' })
    // }
    next()
  }
})

// Change page title
const DEFAULT_TITLE = 'Tunain';
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title ? DEFAULT_TITLE + ' - ' + to.meta.title : DEFAULT_TITLE;
  });
});

app.use(router)

// Mount app
app.mount('#app')
