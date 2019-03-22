<template>
  <div class="login-wrap">
    <div class="login-container"> <el-form label-position="top" label-width="80px" :model="loginForm" :rules="rules"  ref="ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
        password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
      }
    }
  },
  methods: {
    async handleLogin () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) { this.login() } else { return false }
      })
    },
    async login () {
      const loginForm = this.loginForm
      const { meta } = (await axios.post('http://localhost:8888/api/private/v1/login', loginForm)).data
      if (meta.status === 200) {
        this.$message({ message: '登陆成功', type: 'success'
        })
      } else {
        this.$message.error(`登录失败：${meta.msg}`)
      }
    }
  }
}
</script>

<style scoped>
.login-wrap {
  height: 100%;
  background-color: #2f4050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  /*width: 300px;
    height: 100px;*/
  background-color:#fff;
  border-radius: 10px;
  padding: 20px 120px;
}
.login-btn {
  width: 100%;
}
</style>
