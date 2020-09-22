import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import MyProfile from './views/MyProfile.vue'
import About from './views/About.vue'
import Faq from './views/Faq.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/my-profile',
      name: 'myProfile',
      component: MyProfile
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq
    }
  ]
})
