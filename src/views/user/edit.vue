<template>
  <el-dialog title="编辑用户" :visible.sync="editFormVisible">
    <el-form :model="editFormData" width="50%" ref="editFormEl" :rules="rules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="editFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="editFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { findUserById, editById } from '@/api/user'
export default {
  name: 'UserEdit',
  data () {
    return {
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' }
        ]
      },
      editFormVisible: false,
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    async handleEdit () {
      const { meta } = await editById(this.editFormData.id, this.editFormData)
      if (meta.status === 200) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.editFormVisible = false
        // this.$refs.editFormEl.resetFields()
        this.$emit('success-edit')
      }
    },
    async showEditDialog (item) {
      const { data, meta } = await findUserById(item.id)
      if (meta.status === 200) {
        this.editFormVisible = true
        this.editFormData = data
      }
    }
  }
}
</script>

<style>

</style>
