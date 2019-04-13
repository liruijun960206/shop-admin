<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    :router="true"
    :unique-opened="true"
    active-text-color="#ffd04b">
    <el-submenu v-for="first in menus" :key="first.id" :index="first.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ first.authName }}</span>
      </template>
        <el-menu-item v-for="second in first.children" :key="second.id" :index="`/${first.path}/${second.path}`">
          <i class="el-icon-menu"></i>
          <span slot="title">{{ second.authName }}</span>
        </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getRightsMenu } from '@/api/rights'
export default {
  name: 'NavMenu',
  created () {
    this.loadRightsMenu()
  },
  data () {
    return {
      menus: []
    }
  },
  methods: {
    handleOpen (key, keyPath) {
    },
    handleClose (key, keyPath) {
    },
    async loadRightsMenu () {
      const { data } = await getRightsMenu()
      this.menus = data
    }
  }
}
</script>

<style>

</style>
