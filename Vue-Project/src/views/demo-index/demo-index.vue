<template>
  <div>
    <Header :logo="logoMsg" @transferUser="getUsername">
      <!--slot=demoSlot这个 span 会替换掉子组件里 name="demoSlot" 的 slot 标签-->
      <span slot="demoSlot">这是父组件的内容，通过插槽slot的name，代替子组件对应的slot标签位置的内容</span>
    </Header>
    <span>这是从子组件拿到的值：{{usernameFormSon}}</span><br/>
    <el-row>
      <el-button type="success" round @click="goButton">按钮跳转</el-button>
      <router-link :to="{name:'HelloWorld'}">跳转</router-link>
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

    <div>
      <ul>
        <li v-for="(todo,index_todo) in todos" :key="index_todo">
          <label>{{index_todo+1}}.{{todo.value}}</label>
          <time>生成时间：{{todo.createTime | demoFormat}}</time>
        </li>
      </ul>
    </div>

    <div>
      <el-form :model="ruleForm" :rules="demoRules" ref="ruleForm" size="mini">
        <el-form-item label="验证用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="再次输入" prop="nameAgain">
          <el-input v-model="ruleForm.nameAgain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitBtn">提交</el-button>
          <el-button @click="resetBtn">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>
<script>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import Panel from '@/components/Panel.vue'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  moment.locale('zh-cn')

  export default {
    components:{
      Header,
      Footer,
      Panel
    },
    data () {
      //自定义规则，参数value是校验的值，callback是回调方法，用于显示校验不通过
      let validatePass=(rule,value,callback)=>{
        if(value === null || value === undefined){
          callback(new Error('用户名不能为空'))
        }else{
          //判断第二次输入是否是空，非空则校验第二次输入的内容
          if(this.ruleForm.nameAgain!=='' && this.ruleForm.nameAgain!==undefined){
            this.$refs.ruleForm.validateField('nameAgain')
          }
          callback()
        }
      }
      //判断第二次输入内容和首次输入内容是否一致
      let validatePass2=(rule,value,callback)=>{
        if(value === null || value === undefined){
          callback(new Error('请再次输入'))
        }else if(value !== this.ruleForm.name){
          callback(new Error('两次输入不相同'))
        }else{
          callback()
        }
      }
      return {
        msg:'hello vue',
        show2: true,
        logoMsg:'这是父组件给子组件传的字符串',
        username:'',
        usernameFormSon:'',
        radioContent:'Panel',
        chartDemo:'',
        dataFromBackground:'',
        todos:[
          {
            value:'todo列表1',
            createTime:Date.now()
          },{
            value:'todo列表2',
            createTime:Date.now() - 200000
          },{
            value:'todo列表3',
            createTime:Date.now() + 200000
          }
        ],
        demoNumber:Date.now(),
        ruleForm:{
        },
        //定义校验规则，一组规则以一个{ }标识，可以通过validator来引用自定义规则
        demoRules:{
          name:[
            {required:true,message:'不能为空',trigger:'blur'},
            {validator:validatePass,trigger:'blur'}
            ],
          nameAgain:[
            {required:true,message:'不能为空',trigger:'blur'},
            {validator:validatePass2,trigger:'blur'}
            ]
        }
      }

    },
    methods: {
      changeUsername:function() {
        this.$emit('transferUser',this.username)
      },
      // msg 就是 $event 即$emit('transferUser',this.username)的第二个参数值，vue会自动注入；前者是自定义事件名称
      getUsername:function (msg) {
        this.usernameFormSon=msg
      },

      /*this.$router.push('/home/first')// 字符串
        this.$router.push({ path: '/home/first' })// 对象
        this.$router.push({ name: 'home', params: { userId: wise }})// 命名的路由并且传参
      * */
      goButton:function () {
        this.$router.push({path:'/'})
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
      },
      submitBtn:function () {
        this.$refs.ruleForm.validate((valid)=>{
          if(valid){
            console.log('校验通过咯')
          }else{
            console.log('没通过呢')
          }
        })
      },
      resetBtn:function () {
        this.$refs.ruleForm.resetFields();
      }
    },
    //定义过滤器，在模板内以 {{  value | methodName }} 的格式进行过滤，前者是参数对应下方val，后者是方法名，对应下方demoFormat，返回值为显示输出值
    filters:{
      demoFormat(val){
        // val=this.demoNumber//不能使用this来获取值，会报undefined错误
        return moment(val).calendar()
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
