import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import SignUp from './views/SignUp.vue'
import axios from 'axios';
axios.defaults.withCredentials = true

Vue.use(VueRouter)
Vue.use(VueCookies)

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
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      'name': 'sign-up',
      component: SignUp
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
          if (!response.status > 200) {
            next()
          }
        }).catch(e => {
          console.log(e)
            next({
              path: '/login',
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
