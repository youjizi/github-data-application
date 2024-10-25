<template>
  <el-menu
      :default-active="1"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      background-color="#36d9f5"

  >
    <el-menu-item index="0">
      <img
          style="width: 50px; height: 50px"
          src="../assets/head_logo.jpg"
          alt="Element logo"
      />
    </el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
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
</style>