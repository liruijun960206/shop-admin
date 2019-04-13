<template>
<el-dialog title="编辑角色" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="角色名称" label-width="80">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" label-width="80">
      <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="editRole">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { editByRoleId, updateRole } from '@/api/roles'
export default {
  data () {
    return {
      dialogFormVisible: false,
      form: {
        roleName: '',
        roleDesc: ''
      }
    }
  },
  methods: {
    async show (role) {
      this.dialogFormVisible = true
      const { meta, data } = await editByRoleId(role.id)
      if (meta.status === 200) {
        this.form = data
      }
    },
    async editRole () {
      const { roleId, roleDesc, roleName } = this.form
      const { meta } = await updateRole(roleId, { roleDesc, roleName })
      if (meta.status === 200) {
        this.dialogFormVisible = false
        this.$emit('update-success')
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      }
    }
  }
}
</script>

<style>

</style>
