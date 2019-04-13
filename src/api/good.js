import http from '@/utils/request'

/**
 * 获取商品列表
 */
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => http({
  method: 'GET',
  url: '/goods',
  params: {
    query,
    pagenum,
    pagesize
  }
}).then(res => res.data)

export const getGoodsCategoryList = (type = 3) => http({
  method: 'GET',
  url: 'categories',
  params: {
    type
  }
}).then(res => res.data)
// 添加商品
export const addGoods = ({
  goods_name,
  goods_cat,
  goods_price,
  goods_number,
  goods_weight,
  goods_introduce = '',
  pics = {},
  attrs = []
}) => http({
  method: 'POST',
  url: '/goods',
  data: {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs
  }
}).then(res => res.data)
// 获取分类参数
export const getGoodsCategoryAttrList = (catId, sel = 'many') => http({
  method: 'GET',
  url: `/categories/${catId}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)
