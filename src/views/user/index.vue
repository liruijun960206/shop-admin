<template>
<div>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="loadUser()"></el-button>
      </el-input>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" @click="addFormVisible = true">添加用户</el-button>
    </el-col>
  </el-row>
  <el-table
      :data="tableData"
      stripe
      border
      v-loading="loading"
      style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :disabled="scope.row.stateDisabled"
            @change="editChange(scope.row)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="$refs.userEditEl.showEditDialog(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-check"
          @click="$refs.userEditRoleEl.showEditRoleDialog(scope.row)">分配角色</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @current-change="loadUser"
      :current-page="currentPage"
      :page-size="5"
      layout="prev, pager, next"
      :total="userTotal">
  </el-pagination>
  <el-dialog title="添加用户" :visible.sync="addFormVisible">
    <el-form v-model="addFormData" width="50%" ref="addFormEl" :rules="rules">
      <el-form-item label="用户名" label-width="80px" prop="username">
        <el-input v-model="addFormData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="80px" prop="password">
        <el-input v-model="addFormData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="addFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleAdd" :disabled="addButtonDisabled">确 定</el-button>
    </div>
  </el-dialog>
  <heandleEdit ref="userEditEl" @success-edit="loadUser"></heandleEdit>
  <editRole ref="userEditRoleEl"></editRole>
</div>
</template>

<script>
import * as User from '@/api/user'
import heandleEdit from './edit'
import editRole from './editrole'
export default {
  name: 'User',
  created () {
    this.loadUser()
  },
  components: {
    heandleEdit,
    editRole
  },
  data () {
    return {
      tableData: [],
      searchText: '',
      addFormVisible: false,
      addButtonDisabled: false,
      userTotal: 0,
      loading: true,
      currentPage: 1,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
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
      }
    }
  },
  methods: {
    // loadUsers(val) {
    //   console.log(`当前页: ${val}`);
    // },
    async loadUser (val) {
      this.currentPage = val
      this.loading = true
      const { data, meta } = await User.find({ pagenum: val, pagesize: 5, query: this.searchText })
      if (meta.status === 200) {
        data.users.forEach(item => {
          item.stateDisabled = false
        })
        this.loading = false
        this.tableData = data.users
        this.userTotal = data.total
      }
    },
    handleAdd () {
      this.addButtonDisabled = true
      this.$refs.addFormEl.validate((valid) => {
        if (valid) { this.submitAdd() } else { return false }
      })
    },
    async submitAdd () {
      const { meta } = await User.create(this.addFormData)
      if (meta.status === 201) {
        this.$refs.addFormEl.resetFields()
        this.addFormVisible = false
        this.loadUser()
        this.$message({
          showClose: true,
          message: '添加成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: `添加失败：${meta.msg}`
        })
      }
      this.addButtonDisabled = false
    },
    async editChange (item) {
      item.stateDisabled = true
      const { data, meta } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        item.stateDisabled = false
        this.$message({
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`,
          type: 'success'
        })
      }
    },
    handleDelete (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => { // "确认"
        const { meta } = await User.deleteById(item.id)
        if (meta.status === 200) {
          this.loadUser(this.currentPage)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => { // "取消"
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-row {
  margin:20px 0;
}
</style>
