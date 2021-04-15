<template>
  <div class="login">
    <div class="loginContent">
      <el-tabs v-model="activeName">
        <el-tab-pane label="密码登录" name="first">
          <PasswordLogin></PasswordLogin>
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="second">
          <VerificationLogin></VerificationLogin>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import PasswordLogin from '@/views/login/PasswordLogin.vue'
import VerificationLogin from '@/views/login/VerificationLogin.vue'
export default {
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  },
  name: 'Login',
  components: {
    VerificationLogin,
    PasswordLogin
  }
}
</script>
<style lang="scss">
.login {
  height: 100vh;
  background: #2d3a4b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .loginContent {
    width: 500px;
    padding: 30px 50px;
    border: 5px solid #eee;
    border-radius: 10px;
    margin: auto;
    background: #fff;
  }
}
</style>
