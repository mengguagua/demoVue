<template>
  <div>
    <el-container>
      <el-header>
        <Broadcast
          imgHeight="300px"
          type="card"
          :imgList="imgList"
        ></Broadcast>
      </el-header>

      <el-main>

      </el-main>

      <el-footer></el-footer>

    </el-container>

  </div>
</template>

<script>
import Broadcast from "../components/Broadcast";
export default {
  components: { Broadcast},
  data(){
    return{
      imgList:[
        {
          url:'static/img/01.jpg',
          toUrl:'demoIndex'
        },
        {
          url:'static/img/02.jpg',
          toUrl:'demoIndex'
        },
        {
          url:'static/img/03.jpg',
          toUrl:'demoIndex'
        },
        {
          url:'static/img/04.jpg',
          toUrl:'demoIndex'
        },
      ],
    }
  }

}
</script>

<style scoped>
  body{
    margin: 0px;
  }
  .el-container {
    height: 100%;
  }
</style>
