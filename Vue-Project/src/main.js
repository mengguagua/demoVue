// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './vuex/store'
/*
* 安装其他插件的时候，可以直接在 main.js 中引入并 Vue.use()，但是 axios 并不能 use，只能在每个需要发送请求的组件中即时引入。
  为了解决这个问题，在引入 axios 之后，可以修改原型链，方法内就可直接使用：
  this.$ajax({
      method: 'post',
      url: '/user',
      data: {
        name: 'gcc',
        info: 'xxx'
      }
   }).then(function(res){
    console.log(res)
  }).catch(function(err){
    console.log(err)
  })
  当请求成功时，会执行 .then，否则执行 .catch ;两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例。
  这时只要添加一个 .bind(this) 就能解决这个问题：
  .then(function(res){
    console.log(this.data)
  }.bind(this)
* */
import axios from 'axios'

/*
* 和axios雷同，修改原型链来全局使用：
* let myChart = this.$echarts.init(document.getElementById('myChart'))
* */
import echarts from 'echarts'
import AjaxPlugin from './plugins/ajax'

Vue.prototype.$echarts = echarts
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

//去掉地址栏的#号
/*const router = new VueRouter({
  mode: 'history',
  routes: routers
})*/

/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(AjaxPlugin)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
