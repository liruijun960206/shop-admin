<template>
<el-container>
  <el-header>
    <AppHeader/>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <NavMenu/>
    </el-aside>
    <el-main>
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- <AppBreadcrumb :list="[{ label: '首页', path: '/' }, { label: '用户管理' }, { label: '用户列表' }]"></AppBreadcrumb> -->
        <AppBreadcrumb :list="getBreadcrumbs()"></AppBreadcrumb>
      </div>
      <!-- Layout 的子路由将被渲染到这里 -->
      <router-view></router-view>
      </el-card>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import AppHeader from './header'
import NavMenu from './navmenu'

export default {
  name: 'Layout',
  data () {
    return {}
  },
  methods: {
    getBreadcrumbs () {
      const breads = [{ label: '首页', path: '/' }]
      this.$route.matched.slice(1).forEach(route => {
        breads.push({
          label: route.meta.label
        })
      })
      return breads
    }
  },

  components: {
    AppHeader,
    NavMenu
  }
}
</script>

<style scoped>
  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #ffffff;
  }

  .el-aside {
    background-color: #21262a;
  }

  .el-main {
    background-color: #f1f1f1;
  }

  .el-row {
    display: flex;
    align-items: center;
  }

  .el-menu {
    height: 100%;
  }
</style>
