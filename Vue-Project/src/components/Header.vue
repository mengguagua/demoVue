<template>
  <div>
    <div>{{logo}}</div>
    <h1>Vue Demo by gcc</h1>
    <div>
      <el-input
        placeholder="用户名-子组件传值到父组件"
        @change="changeUsername"
        v-model="username"
        clearable>
      </el-input>

      <el-input
        placeholder="通过子组件修改store的state的值"
        @change="changeState"
        v-model="stateValue"
        clearable>
      </el-input>
      <slot name="demoSlot"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        username: '',
        stateValue:''
      }
    },
    methods: {
      changeUsername:function() {
        this.$emit('transferUser',this.username)
      },
      changeState:function () {
        // this.$store.state.author=this.stateValue
        this.$store.commit('changeAuthor',this.stateValue)//官方推荐方式，使用 $store.commit 提交对应的方法名，并将‘值’传给msg，从而修改author
      }
    },
    props:['logo']
  }
</script>
