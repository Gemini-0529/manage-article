/*
  项目的启动入口
*/
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
//加载全局样式文件
import './styles/index.less'

Vue.use(ElementUI)//注册elementui组件库
Vue.config.productionTip = false
//解决vue-router报错
//Error: Navigation cancelled from "/" to "/article" with a new navigation
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

//创建vue根实例
//把router配置到根实例中
//通过render方法把app根组件(APP.vue)渲染到#app入口节点(index.html div中)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')//等价于el:'#app'
