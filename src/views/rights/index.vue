<template>
<div>
  <el-table
    :data="rights"
    stripe
    style="width: 100%">
     <el-table-column
      type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
        {{ ['一级', '二级', '三级'][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import { getRightsList } from '@/api/rights'
export default {
  name: 'RightList',
  data () {
    return {
      rights: []
    }
  },
  created () {
    this.loadRights()
  },
  methods: {
    async loadRights () {
      const { data } = await getRightsList()
      // console.log(meta, data)
      this.rights = data
    }
  }
}
</script>

<style>

</style>
