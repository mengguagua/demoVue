/*
  Vuex 应用的状态 state 都应当存放在 store.js 里面，Vue 组件可以从 store.js 里面获取状态，可以把 store 通俗的理解为一个全局变量的仓库。
  但是和单纯的全局变量又有一些区别，主要体现在当 store 中的状态发生改变时，相应的 vue 组件也会得到高效更新。
*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'gcc'
  },
  /*官方推荐方式，一个参数 state 就是 $store.state，第二个参数 msg 需要另外传入*/
  mutations:{
    changeAuthor(state ,msg){
      state.author = msg
    }
  }
})

export default store

