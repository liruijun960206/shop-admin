import http from '@/utils/request'

export const getRolelist = () => http({
  method: 'GET',
  url: '/roles'
}).then(res => res.data)

export const addRole = ({ roleName, roleDesc }) => http({
  method: 'POST',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

export const updateRoleRights = (roleId, rids) => http({
  method: 'POST',
  url: `/roles/${roleId}/rights`,
  data: {
    rids
  }
}).then(res => res.data)

export const deleteRightsByRoleId = (roleId, rid) => http({
  method: 'DELETE',
  url: `/roles/${roleId}/rights/${rid}`
}).then(res => res.data)

export const delRoleRights = roleId => http({
  method: 'delete',
  url: `/roles/${roleId}`
}).then(res => res.data)

export const editByRoleId = roleId => http({
  method: 'GET',
  url: `roles/${roleId}`
}).then(res => res.data)

export const updateRole = (roleId, data) => http({
  method: 'PUT',
  url: `roles/${roleId}`,
  data: {
    roleName: data.roleName,
    roleDesc: data.roleDesc
  }
}).then(res => res.data)
