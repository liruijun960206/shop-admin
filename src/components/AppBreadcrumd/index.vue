<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <template v-for="item in list" >
      <template v-if="item.path">
      <el-breadcrumb-item :to="{ path: item.path }" :key="item.path">{{ item.label }}</el-breadcrumb-item>
      </template>
      <template v-else>
      <el-breadcrumb-item  :key="item.path">{{ item.label }}</el-breadcrumb-item>
      </template>
    </template>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'AppBreadcrumb',
  props: { // 建议的写法，更严谨友好
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>

</style>
