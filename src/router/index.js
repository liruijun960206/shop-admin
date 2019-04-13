import Vue from 'vue'
import Router from 'vue-router'
import { getToken } from '@/utils/auth'

import Login from '@/views/login'
import Layout from '@/views/layout'
import Home from '@/views/home'
import UserList from '@/views/user'
import RoleList from '@/views/roles'
import RightsList from '@/views/rights'
import GoodsList from '@/views/goods'
import GoodsAdd from '@/views/goods/add'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout, // 先把 Layout 展示到 App.vue 的 router-view 中
      meta: { label: '首页' },
      children: [
        // Home 展示到父路由的 router-view 中，path 为空，则默认作为 / Layout 展示的组件
        { name: 'home', path: '', component: Home },
        {
          path: '/users',
          component: {
            render: c => c('router-view') // 这个路由是一个直接渲染了 router-view 标签的组件
          },
          meta: { label: '用户管理' },
          children: [ // 当你访问 /users/users 的时候，
            { name: 'users-list', path: 'users', component: UserList, meta: { label: '用户列表' } } // meta 字段用于用户添加自定义数据，随便加
          ]
        },
        {
          path: '/rights',
          component: {
            render: c => c('router-view') // 这个路由是一个直接渲染了 router-view 标签的组件
          },
          meta: { label: '权限管理' },
          children: [ // 当你访问 /users/users 的时候，
            { name: 'role-list', path: 'roles', component: RoleList, meta: { label: '角色列表' } },
            { name: 'rights-list', path: 'rights', component: RightsList, meta: { label: '权限列表' } }
          ]
        },
        {
          path: '/goods',
          component: {
            render: c => c('router-view') // 这个路由是一个直接渲染了 router-view 标签的组件
          },
          meta: { label: '商品管理' },
          children: [ // 当你访问 /users/users 的时候，
            { name: 'goods', path: 'goods', component: GoodsList, meta: { label: '商品列表' } },
            { name: 'goods-add', path: 'add', component: GoodsAdd, meta: { label: '添加商品' } }
          ]
        }
      ]
    }
  ]
})

/**
 * 路由拦截器，或者说导航守卫，所有请求都会经过它
 * to 去哪里
 * from 来自哪里
 * next 通行方法
 */
router.beforeEach((to, from, next) => {
  // 1. 如果请求的 /login ，则直接允许通过
  if (to.path === '/login') {
    next()
  }

  // 2. 如果不是 /login，就检查登录状态
  // const token = window.localStorage.getItem('token')
  const token = getToken()

  // 如果没有 token，则让其跳转到 /login
  if (!token) {
    return next('/login')
  }

  // 验证 token 是否有效
  // 首先 token 是服务器签发生成的，应该由服务器来验证
  // 所有最好有一个接口，传递一个 token 参数，返回该 token 是否有效
  //
  // 我们这里也没必要需要有这么一个单独的接口来验证登录的有效性
  // 因为我们每个页面几乎都会发请求（请求用户列表、请求商品列表）
  // 而除了登录接口，其它的接口都需要提供身份令牌才能使用
  // 所以我们只需要在发起具体的业务请求的响应结果中查看 token 身份令牌是否有效（服务器会告诉你）

  // 如果有 token，则直接通过
  next()
})

export default router
