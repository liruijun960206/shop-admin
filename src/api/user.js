import http from '@/utils/request'

// 查询内容
export const find = ({ pagenum = 1, pagesize = 5, query = '' }) => http({
  method: 'GET',
  url: 'users',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

// 增加列表
export const create = data => http({
  method: 'POST',
  url: 'users',
  data: {
    username: data.username,
    password: data.password,
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

// 删除
export const deleteById = userId => http({
  method: 'DELETE',
  url: `/users/${userId}`
}).then(res => res.data)

// 编辑
export const editById = (userid, data) => http({
  method: 'PUT',
  url: `/users/${userid}`,
  data: {
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

// 改变用户状态
export const changeState = (userid, state) => http({
  method: 'put',
  url: `users/${userid}/state/${state}`
}).then(res => res.data)

// 根据id查询用户
export const findUserById = userid => http({
  method: 'GET',
  url: `/users/${userid}`
}).then(res => res.data)

// 分配角色
export const changeRole = (userId, roleId) => http({
  method: 'PUT',
  url: `/users/${userId}/role`,
  data: {
    rid: roleId
  }
}).then(res => res.data)
