<template>
  <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"


  >
    <el-menu-item index="0">

      <router-link  :to="{ name: 'home' } " >
        <img
            style="width: 50px; height: 50px"
            src="../assets/head_logo.png"
            alt="Element logo"
        />
      </router-link>

    </el-menu-item>







    <el-link type="info" >
      <router-link  :to="{ name: 'home' } "  style="text-decoration: none;">
        <el-menu-item index="1">主页</el-menu-item>
      </router-link>
    </el-link>

    <el-link type="info" href="https://www.qiniu.com/">
      <el-menu-item index="2">关于我们</el-menu-item>
    </el-link>



  </el-menu>

</template>

<script>
export default {
  name: 'PageHead',
  props: {
    msg: String
  }
}

</script>

<style>

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;

}

.el-menu-item > .router-link {

}
</style>