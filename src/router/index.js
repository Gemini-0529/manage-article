import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login.vue'
import home from '@/views/home/'
import layout from '@/views/layout/'
import article from '@/views/article/'
import publish from '@/views/publish'
import image from '@/views/image'


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
      {
        path:'/article',
        name:'article',
        component: article
      },
      {
        path:'/publish',
        name:'publish',
        component: publish
      },
      {
        path:'/image',
        name:'image',
        component: image
      }
      
      
      
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

//导航守卫(路由拦截，所有页面得导航都会经过这里。防止用户未登录访问页面)
//      beforeEach是全局前置守卫
router.beforeEach((to, from, next) => {
  //to:要去的路由
  //from：从哪个路由来的
  const user = JSON.parse(window.localStorage.getItem('user'))
  if(to.path !== '/login') {//如果要去的不是/login
    if(user){//如果有用户信息，证明登陆过
      next()//放行
    }else{//否则强制跳转到login页
      next('/login')
    }
  }{//否则通过，进入/login
    next()
  }
  //调用next就会执行用户路由，允许通过
})
export default router
