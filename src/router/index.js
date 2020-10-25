import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/index.vue'
import layout from '@/views/layout/index.vue'


Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component: login
  },
  {
    path:'/',
    component: layout,
    children: [
      {
        path:'',//path为空，会作为默认子路由渲染
        name:'home',
        component: home
      },
      
    ]
  },
  
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   //路由懒加载
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
