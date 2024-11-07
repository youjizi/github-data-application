<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <page-head class="page-head"></page-head>
      </el-header>
      <el-main>
    <router-view>
    </router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import PageHead from './components/PageHead.vue'

</script>

<style >

*{
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #1f2328;

}

.header {
  display: flex; /* 使用 Flexbox 布局 */
  padding: 0; /* 重置内边距 */
  margin: 0; /* 重置外边距 */

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  height: 60px; /* 设置 header 的高度 */

}

.page-head {
  flex: 1; /* 使 page-head 占据所有可用空间 */
  padding: 0; /* 重置内边距 */
  margin: 0; /* 重置外边距 */
  box-sizing: border-box; /* 确保宽度计算包括内边距和边框 */
  background-color: #f6f8fa;

}

.el-main {
  margin-top: 60px; /* 根据 header 的高度调整主内容区域的顶部间距 */
  padding: 10px 250px;
}


</style>
