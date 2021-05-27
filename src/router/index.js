import { createRouter, createWebHistory } from 'vue-router'
import AuthLandingPage from '../views/auth/AuthLandingPage'
import CreateAccount from '../views/auth/CreateAccount'

const routes = [
  {
    // mainPath: 'auth-landing-page',
    path: '/',
    name: 'AuthLandingPage',
    component: AuthLandingPage
  },
  {
    path: '/create-account',
    name: 'CreateAccount',
    component: CreateAccount
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
