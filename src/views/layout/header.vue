<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16">
      黑马电商管理系统
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="handleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { removeToken } from '@/utils/auth'
export default {
  name: 'Appheader',
  data () {
    return {}
  },
  methods: {
    handleLogout () {
      this.$confirm('确定退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        removeToken()
        this.$router.replace('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-col{
  font-size: 24px;
  font-weight: 700;
}
</style>
