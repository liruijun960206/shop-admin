<template>
<el-dialog title="添加角色" :visible.sync="dialogFormVisible">
  <el-form v-model="form">
    <el-form-item label="角色名称" label-width="80px">
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述" label-width="80px">
      <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { addRole } from '@/api/roles'

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
    show () {
      this.dialogFormVisible = true
    },

    async handleSubmit () {
      const { roleName, roleDesc } = this.form
      const { meta } = await addRole({ roleName, roleDesc })
      if (meta.status === 201) {
        this.form = ''
        this.dialogFormVisible = false // 隐藏对话框
        this.$emit('add-success')
      }
    }
  }
}
</script>

<style>
</style>
