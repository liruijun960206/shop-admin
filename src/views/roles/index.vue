<template>
  <div>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-button type="primary" @click="addShow">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table
      :data="roles"
      border
      stripe
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- 第一 -->
          <el-row class="first" v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag closable @close="handleDeleteRights(scope.row,first)">{{ first.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <!-- 二级 -->
              <el-row class="second" v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag closable type="success" @close="handleDeleteRights(scope.row,second)">{{ second.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <!-- 三级 -->
                  <el-tag
                    class="third"
                    type="warning"
                    closable
                    v-for="third in second.children" :key="third.id" @close="handleDeleteRights(scope.row,third)">{{ third.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="assigningRoles(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
      </el-table>
    </el-card>
    <AddRole ref="roleAddEl" @add-success="loadRole"/>
    <EditRights ref="roleEditRightsEl" @edit-success="loadRole"/>
    <EditRole ref="EditRoleEl" @update-success="loadRole"/>
  </div>
</template>

<script>
import { getRolelist, deleteRightsByRoleId, delRoleRights } from '@/api/roles'
import AddRole from './add'
import EditRights from './edit-rights'
import EditRole from './edit-role'
export default {
  name: 'RoleList',
  data () {
    return {
      roles: []
    }
  },
  created () {
    this.loadRole()
  },
  methods: {
    async loadRole () {
      const { meta, data } = await getRolelist()
      if (meta.status === 200) {
        this.roles = data
      }
    },
    handleEdit (item) {
      this.$refs.EditRoleEl.show(item)
    },
    async handleDelete (item) {
      console.log(item.id)
      const { meta, data } = await delRoleRights(item.id)
      console.log(meta, data)
      if (meta.status === 200) {
        this.$message({
          message: '删除成功', type: 'success'
        })
        this.loadRole()
      }
    },
    assigningRoles (role) {
      this.$refs.roleEditRightsEl.show(role)
    },
    addShow () {
      this.$refs.roleAddEl.show()
    },
    async handleDeleteRights (role, rights) {
      // console.log(role, rights)
      const { meta, data } = await deleteRightsByRoleId(role.id, rights.id)
      if (meta.status === 200) {
        role.children = data
      }
      // console.log(meta)
    }
  },
  components: {
    AddRole,
    EditRights,
    EditRole
  }
}
</script>

<style scoped>
.first,.second,.third{
  margin-bottom: 5px;
}
.third{
  margin-right: 10px;
}
</style>
