<template>
<div class="goods-add-wrap">
  <!-- 步骤条 -->
  <el-steps :active="1" simple>
    <el-step title="步骤 1" icon="el-icon-edit"></el-step>
    <el-step title="步骤 2" icon="el-icon-upload"></el-step>
    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    <el-step title="步骤 3" icon="el-icon-picture"></el-step>
  </el-steps>
  <!-- /步骤条 -->

  <!-- 标签页导航 -->
  <el-tabs tab-position="left">
    <el-tab-pane label="基本信息">
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="formData.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <!--
            .number 修饰符将用户的输入转换为数字同步到数据中
           -->
          <el-input v-model.number="formData.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model.number="formData.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="formData.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <!--
            级联选择器
            options 数据
            v-model="结果数据" 它会把用户选中的所有节点的 value 都同步到这个数据中
            change 选中的改变事件
           -->
          <el-cascader
            :options="goodsCategories"
            v-model="formData.goods_cat"
            @change="handleChange"
            :props="{ value: 'cat_id', label: 'cat_name', children: 'children' }">
          </el-cascader>
        </el-form-item>
        <el-form-item label="是否促销">
          <el-radio-group v-model="formData.is_promote">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品参数">
     <el-row class="param-row" v-for="param in goodsCategoryParams" :key="param.attr_id">
      <el-col :span="4">{{ param.attr_name }}</el-col>
      <el-col :span="20">
        <el-checkbox-group size="small" v-model="param.attr_selected_vals">
          <el-checkbox
            :label="val"
            border
            v-for="val in param.attr_vals.split(',')"
            :key="val + Math.random()"></el-checkbox>
        </el-checkbox-group>
      </el-col>
    </el-row>
    </el-tab-pane>
    <el-tab-pane label="商品属性">
      <el-form label-width="150px">
        <el-form-item :label="attr.attr_name"  v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-input v-model="attr.attr_vals"></el-input>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="商品图片">
      <el-upload
        action="http://localhost:8888/api/private/v1/upload"
        :headers="uploadHeaders"
        :on-success="handleUploadSuccess"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-tab-pane>
    <el-tab-pane label="商品内容">
      <quill-editor v-model="formData.goods_introduce" ref="myQuillEditor">
      </quill-editor>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-tab-pane>
  </el-tabs>
  <!-- /标签页导航 -->
</div>
</template>

<script>
import { getGoodsCategoryList, addGoods, getGoodsCategoryAttrList } from '@/api/good'
import { getToken } from '@/utils/auth'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'GoodsAdd',
  data () {
    return {
      uploadHeaders: { // 配置上传的请求头
        Authorization: getToken()
      },
      formData: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: false,
        pics: [],
        goods_introduce
      },
      goodsCategories: [], // 所有商品分类数据
      goodsCategoryAttrs: [], // 商品属性
      goodsCategoryParams: [] // 商品参数
    }
  },
  components: {
    quillEditor
  },
  created () {
    this.loadGoodsCategories()
  },

  methods: {
    async loadGoodsCategories () {
      const { data, meta } = await getGoodsCategoryList()
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },
    handleChange (value) {
      // console.log(value)
      const catId = value.pop()
      this.loadGoodsCategoryAttrs(catId)
      this.loadGoodsCategoryParams(catId)
    },
    async loadGoodsCategoryAttrs (catId) {
      const { meta, data } = await getGoodsCategoryAttrList(catId)
      if (meta.status === 200) {
        data.forEach(param => {
          param.attr_selected_vals = param.attr_vals.split(',')
        })
        this.goodsCategoryParams = data
      }
    },
    async loadGoodsCategoryParams (catId) {
      const { meta, data } = await getGoodsCategoryAttrList(catId, 'only')
      if (meta.status === 200) {
        this.goodsCategoryAttrs = data
      }
    },
    // 提交商品
    async handleSubmit () {
      const { goods_name, goods_cat, goods_price, goods_number, goods_weight, is_promote, pics, goods_introduce } = this.formData
      // 商品属性
      const categoryAttrs = this.loadGoodsCategoryAttrs.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })

      const categoryParams = this.loadGoodsCategoryParams.map(item => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_selected_vals.join(',')
        }
      }).filter(item => item.attr_value.length > 0)
      const attrs = [...categoryParams, ...categoryAttrs]

      const { meta } = await addGoods({ goods_name, goods_cat: goods_cat.join(','), goods_price, goods_number, goods_weight, is_promote, pics, attrs, goods_introduce })
      if (meta.status === 201) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$router.replace('/goods/goods')
      }
    },
    handleUploadSuccess (response, file) {
      this.formData.pics.push({
        pic: response.data.tmp_path
      })
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-top: 20px;
}

.el-cascader {
  width: 100%;
}

.param-row {
  margin-bottom: 15px;
}
</style>
