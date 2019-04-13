import http from '@/utils/request'

export const getRightsList = (type = 'list') => http({
  method: 'GET',
  url: `/rights/${type}`
}).then(res => res.data)

export const getRightsMenu = () => http({
  method: 'GET',
  url: '/menus'
}).then(res => res.data)
