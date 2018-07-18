<template>
  <div>
    <Header :logo="logoMsg" @transferUser="getUsername"></Header>
    <span>这是从子组件拿到的值：{{usernameFormSon}}</span><br/>
    <el-row>
      <el-button type="success" round @click="goButton">按钮跳转</el-button>
      <router-link to="/demo">跳转</router-link>
      <el-button type="success" round @click="goBackground">访问后台</el-button>
      <span>这是后台请求返回的数据：{{dataFromBackground}}</span>
    </el-row>
    <span>{{msg}}</span><br/>

    <el-button @click="show2 = !show2">Click Me</el-button>
    <div style="display: flex; margin-top: 20px; height: 100px;">
      <transition name="el-zoom-in-center">
        <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
      </transition>
      <transition name="el-zoom-in-top">
        <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
      </transition>
      <transition name="el-zoom-in-bottom">
        <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
      </transition>
    </div><br/>

    <p>下面的gcc通过vuex获取的可以高效更新的全局变量</p>
    <p>Copyright&nbsp;&copy;&nbsp;{{author}} - 2018 All rights reserved</p>

    <!--组件扩展，可以将多个子组件，都挂载在同一个位置，通过变量来切换组件。Vue 用的<component> 元素，将组件动态绑定到 is 特性上。类似tab-->
    <div>
      <el-radio-group v-model="radioContent">
        <el-radio-button label="Panel">选项一</el-radio-button>
        <el-radio-button label="Footer">选项二</el-radio-button>
      </el-radio-group>
      <component :is="radioContent"></component>
    </div>

    <!--图表的容器必须指定宽高，也就是说 width，height 不能使用百分比，只能用 px。 charts加了层容器，让图在加载时可以按比例缩放-->
    <div class="charts">
      <div id="chartDemo" :style="{height:'300px',weight:'400px'}"></div>
    </div>

  </div>
</template>
<script>
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import Panel from '../components/Panel.vue'
  export default {
    components:{
      Header,
      Footer,
      Panel
    },
    data () {
      return {
        msg:'hello vue',
        show2: true,
        logoMsg:'这是父组件给子组件传的字符串',
        username:'',
        usernameFormSon:'',
        radioContent:'Panel',
        chartDemo:'',
        dataFromBackground:''
      }
    },
    methods: {
      changeUsername:function() {
        this.$emit('transferUser',this.username)
      },
      getUsername:function (msg) {
        this.usernameFormSon=msg
      },
      /*
      * this.$router.push('/home/first')// 字符串
        this.$router.push({ path: '/home/first' })// 对象
        this.$router.push({ name: 'home', params: { userId: wise }})// 命名的路由并且传参
      * */
      goButton:function () {
        this.$router.push({path:'/demo'})
      },
      // 用于使chart在加载时自适应高度和宽度
      resizeCharts:function () {
        let chartBox = document.getElementsByClassName('charts')[0]
        let chartDemo=document.getElementById('chartDemo')
        chartDemo.style.width = chartBox.style.width + 'px'
        chartDemo.style.height = chartBox.style.height + 'px'
        return chartDemo
      },
      goBackground:function () {
        this.$post('api/vue/index.json',{
          username:'gcc',
          city:'杭州'
        }).then(resp => {
          this.dataFromBackground = resp.data
        }).catch(err => {
          console.log(err)
        })
      }
    },
    computed:{
      author(){
        return this.$store.state.author
      }
    },
    mounted(){
      let chartDemo=this.resizeCharts()
      chartDemo = this.$echarts.init(chartDemo)

      // 指定图表的配置项和数据
      let optionDemo = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        xAxis: {
          data: ["篮球","足球","橄榄球","羽毛球","排球","网球"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
      chartDemo.setOption(optionDemo)

    }
  }
</script>
<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
