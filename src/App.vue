<template>
  <div class="common-layout">
    <el-container>
      <el-header>
      <page-head></page-head>
      </el-header>
      <el-main>
        <HelloWorld></HelloWorld>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import HelloWorld from './components/PageHome.vue'
import PageHead from './components/PageHead.vue'



export default {
  name: 'App',
  components: {
    HelloWorld,
    PageHead
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
