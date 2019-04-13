<template>
  <el-dialog title="分类用户" :visible.sync="FormVisible">
    <el-form :model="FormData" width="50%">
      <el-form-item label="用户名" label-width="80px">
        <el-input v-model="FormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px">
        <el-select v-model="FormData.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="FormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEditRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { findUserById, changeRole } from '@/api/user'
import { getRolelist } from '@/api/roles'
export default {
  data () {
    return {
      FormData: {
        username: '',
        email: '',
        mobile: ''
      },
      roles: [],
      FormVisible: false
    }
  },
  methods: {
    async handleEditRole () {
      const { id: userId, rid: roleId } = this.FormData
      const { meta, data } = await changeRole(userId, roleId)
      console.log(meta, data)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.FormVisible = false
      }
    },
    async showEditRoleDialog (item) {
      const [ userData, roleMeta ] = await Promise.all([
        findUserById(item.id),
        getRolelist()
      ])
      if (userData.meta.status === 200) {
        this.FormVisible = true
        this.FormData = userData.data
      }
      if (roleMeta.meta.status === 200) {
        this.roles = roleMeta.data
      }
      // this.FormVisible = true
      // const { meta, data } = await findUserById(item.id)
      // if (meta.status === 200) {
      //   this.FormData = data
      // }
      // const { data: roleData, meta: roleMeta } = await getRolelist()
      // if (roleMeta.status === 200) {
      //   this.roles = roleData
      // }
    }
  }
}
</script>

<style>

</style>
