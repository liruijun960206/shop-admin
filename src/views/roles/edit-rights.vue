<template>
  <el-dialog title="角色授权" :visible.sync="dialogFormVisible">
  <el-tree
    :data="rights"
    show-checkbox
    node-key="id"
    default-expand-all
    ref="tree"
    :default-checked-keys="defaultChecked"
    :props="defaultProps">
  </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRightsList } from '@/api/rights'
import { updateRoleRights } from '@/api/roles'
export default {
  data () {
    return {
      dialogFormVisible: false,
      rights: [],
      role: {},
      defaultChecked: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  methods: {
    async handleSubmit () {
      const treeEl = this.$refs.tree
      const rids = [...treeEl.getCheckedKeys(), ...treeEl.getHalfCheckedKeys()].join(',')
      const { meta } = await updateRoleRights(this.role.id, rids)
      // console.log(this.role.id)
      // console.log(meta, data)
      if (meta.status === 200) {
        this.$emit('edit-success')
        this.dialogFormVisible = false
      }
    },
    show (role) {
      this.dialogFormVisible = true
      this.loadRights()
      this.role = role
      // console.log(role.children)
      this.getRights(role.children)
    },
    async loadRights () {
      const { data, meta } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },
    getRights (roleRights) {
      const tmp = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => {
            tmp.push(third.id)
          })
        })
      })
      this.defaultChecked = tmp
    }
  }
}
</script>

<style>

</style>
