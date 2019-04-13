import http from '@/utils/request'
// const { data, meta } = (await http.post('/login', loginForm)).data
export const login = data => http({
  method: 'POST',
  url: '/login',
  data: {
    username: data.username,
    password: data.password
  }
}).then(res => res.data)
