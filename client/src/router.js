import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SignUp from './views/SignUp'
import SignIn from './views/SignIn'
import MyProfile from './views/MyProfile.vue'
import About from './views/About.vue'
import Faq from './views/Faq.vue'
import MySettings from './views/MySettings'
import MyShoppingLists from './views/MyShoppingLists'
import MyRecipes from '@/views/MyRecipes'
import CreateRecipePage from '@/views/CreateRecipePage'
import RecipePage from '@/views/RecipePage'

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
    },
    {
      path: '/my-settings',
      name: 'mySettings',
      component: MySettings
    },
    {
      path: '/my-shopping-lists',
      name: 'myShoppingLists',
      component: MyShoppingLists
    },
    {
      path: '/my-recipes',
      name: 'MyRecipes',
      component: MyRecipes
    },
    {
      path: '/create-recipe',
      name: 'CreateRecipePage',
      component: CreateRecipePage
    },
    {
      path: '/recipe',
      name: 'recipe-page',
      component: RecipePage
    }
  ]
})
