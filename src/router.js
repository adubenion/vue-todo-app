import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import Todos from './views/Todos.vue'
import Friends from './views/Friends.vue'
import Groups from './views/Groups.vue'
import Messages from './views/Messages.vue'
import User from './views/User.vue'
import Group from './views/Group.vue'
import ErrorPage from './views/ErrorPage.vue'
import axios from 'axios';
axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(VueCookies)


let user
 const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends,
      props: {username:'testing...'},
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/messages',
      name: 'messages',
      component: Messages,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      'name': 'sign-up',
      component: SignUp
    },
    {
      path: '/user/:username',
      name: 'user',
      component: User,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/group/:group',
      name: 'group',
      component: Group,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/error',
      name: 'error',
      component: ErrorPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!window.$cookies.isKey('todo_app')) {
        next({
          path: '/login',
          query: {
            redirect: to.fullPath,
          },
        });
      } else {
        axios.get('http://localhost:3000/auth')
        .then((response) => {
          if (!(response.status > 200)) {
            next()
          } else {
            next({
          path: '/error',
          query: {
            redirect: to.fullPath,
          },
        })
          }
        }).catch(e => {
          console.log(e)
            next({
              path: '/error',
              query: {
                redirect: to.fullPath,
              },
            });
        })
        next();
      }
    } else {
      next();
    }
})

 export default router
