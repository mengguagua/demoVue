<template>
  <div>
    <el-row class="navMenu">
      <el-col :span="6"><div>&nbsp;</div></el-col>
      <el-col :span="12">
        <div>
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#ffffff"
            text-color=""
            active-text-color=""
            @select="handleSelect">
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="6"><div>&nbsp;</div></el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
      name: "MoveMenu",
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style scoped>
    .navMenu{
      background: #ffffff;
      /*position: fixed;*/
      /*top: 0px;*/
    }
</style>
