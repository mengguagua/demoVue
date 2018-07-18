import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/demo-index/hello/HelloWorld.vue'
import demoIndex from '@/views/demo-index/demo-index.vue'
import gccIndex from '@/views/gcc-index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:gccIndex
    },{
      name: 'demoIndex',
      path: '/demo-index',
      component: demoIndex,
      children:[
        {
          name: 'HelloWorld',
          path: 'hello',
          component: HelloWorld
        }
      ]
    }
  ]
})
