<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="4">
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="loadGoodsList"></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="$router.push({name: 'goods-add'})">添加用户</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="goods"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
       <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | dataForMat('YYYY-MM-DD') }}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="loadGoods"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="goodsTotal">
    </el-pagination>
  </div>
</template>

<script>
import { getGoodsList } from '@/api/good'
export default {
  name: 'GoodsList',
  data () {
    return {
      goods: [],
      searchText: '',
      page: 1,
      goodsTotal: 0,
      pagesize: 20
    }
  },
  created () {
    this.loadGoods()
  },
  methods: {
    async loadGoods (pagenum = 1) {
      const { data } = await getGoodsList({ query: this.searchText, pagesize: this.pagesize, pagenum })
      this.goods = data.goods
      this.goodsTotal = data.total
    },
    handleSizeChange (pagesize) {
      this.page = 1
      this.pagesize = pagesize
      this.loadGoods(1)
    },
    loadGoodsList () {
      this.page = 1
      this.loadGoods(1)
    }
  }
}
</script>

<style>

</style>
