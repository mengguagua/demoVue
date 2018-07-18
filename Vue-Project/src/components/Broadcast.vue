<template>
  <el-carousel
    :interval="interval"
    :type="type"
    :height="imgHeight"
    :autoplay="autoplay"
  >
    <el-carousel-item
      name=""
      :label="label"
      :imgList="imgList"
      v-for="(image,imgIndex) in imgList" :key="imgIndex"><!--key用于提高运行速度，建议添加，值建议为唯一的id字段-->
      <!--通过指定name，显示的传入路径的别名，避免修改路径配置后又要修改代码-->
      <router-link :to="{name : image.toUrl}"><img :src="image.url"/></router-link>

    </el-carousel-item>
  </el-carousel>
</template>

<script>
    export default {
        name: "Broadcast",
        //通过props来获取父组件的值
        props:{
          imgHeight:{
            default: '300px'
          },
          type:{
            default:''
          },
          interval:{
            default:4000
          },
          autoplay:{
            default:true
          },
          label:{
            default:''
          },
          imgList:{
            type: Array,
            required:true
          }

        },
        data(){
          return{

          }
        }
    }
</script>

<style scoped>
  .el-carousel__item img {
    width: 100%;
    height: 100%;
  }
</style>
