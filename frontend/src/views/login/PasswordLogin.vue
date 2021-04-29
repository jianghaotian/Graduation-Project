<template>
  <div>
    <el-form :model="passwordLogin" :rules="rules" ref="passwordLogin" label-width="100px" class="demo-dynamic">
      <el-form-item prop="username" label="邮箱/手机号">
        <el-input
          maxlength="32"
          type="text"
          name="username"
          v-model="passwordLogin.username"
          placeholder="请输入邮箱/手机号"
          autofocus="autofocus"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input placeholder="请输入密码" v-model="passwordLogin.password" name="password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="isLogining" @click.native.prevent="pLogin">登录</el-button>
        <el-button @click="register1"> 注册 </el-button>
        <el-link target="_blank" @click="forgetPassword" class="forgetPassword" :underline="false">忘记密码?</el-link>
      </el-form-item>
    </el-form>
    <el-dialog :title="'注册'" width="35%" :visible.sync="isEditDialogVisible" :close-on-click-modal="false">
      <el-form
        :model="register"
        :rules="rules2"
        ref="register"
        label-position="left"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="isEditLoading"
      >
        <el-form-item prop="username" label="邮箱/手机号" size="mini">
          <el-input
            maxlength="32"
            type="text"
            name="username"
            v-model="register.username"
            placeholder="请输入邮箱/手机号"
            autofocus="autofocus"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码" size="mini">
          <el-input placeholder="请输入密码" v-model="register.password" name="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="checkPassword" label="确认密码" size="mini">
          <el-input
            placeholder="请确认密码"
            v-model="register.checkPassword"
            name="checkPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="verification" label="验证码" size="mini">
          <!-- <el-button type="primary" @click="captcha()">获取验证码</el-button> -->
          <el-input type="text" placeholder="请输入验证码" v-model="register.verification" name="verification">
            <el-button slot="append" type="primary" :loading="isgettingLoading" @click="captcha()">{{
              buttonName1
            }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="name" label="用户名" size="mini">
          <el-input
            type="text"
            placeholder="请输入用户名"
            v-model="register.name"
            name="name"
            maxlength="20"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible = false"> 取消 </el-button>
        <el-button size="mini" type="primary" :loading="isEditSubmitting" @click="create()"> 注册 </el-button>
      </div>
    </el-dialog>

    <el-dialog :title="'找回密码'" width="35%" :visible.sync="isEditDialogVisible2" :close-on-click-modal="false">
      <el-form
        :model="verificationChange"
        :rules="rules3"
        ref="verificationChange"
        label-position="left"
        label-width="100px"
        class="demo-ruleForm"
        v-loading="isEditLoading2"
      >
        <el-form-item prop="username" label="邮箱/手机号" size="mini">
          <el-input
            maxlength="32"
            type="text"
            name="username"
            v-model="verificationChange.username"
            placeholder="请输入邮箱/手机号"
            autofocus="autofocus"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verification" label="验证码" size="mini">
          <el-input
            type="text"
            placeholder="请输入验证码"
            v-model="verificationChange.verification"
            name="verification"
          >
            <el-button slot="append" type="primary" :loading="isgettingLoading2" @click="captcha2()">{{
              buttonName2
            }}</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码" size="mini">
          <el-input
            show-password
            name="newPassword"
            v-model="verificationChange.newPassword"
            placeholder="请输入新密码"
            autofocus="autofocus"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible2 = false"> 取消 </el-button>
        <el-button size="mini" type="primary" :loading="isEditSubmitting2" @click="changePassword()"> 确定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/account'
export default {
  data() {
    let checkPwd = (rule, value, callback) => {
      let pwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (pwd.test(value)) {
          callback()
        } else {
          callback(new Error('请输入6-20位字母和数字组合的密码'))
        }
      }
    }
    let checkPassword2 = (rule, value, callback) => {
      if (value == '' || value == undefined) {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.register.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    let checkUserName = (rule, value, callback) => {
      let phone = /^1\d{10}$/
      let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (value === '') {
        callback(new Error('请输入邮箱/手机号'))
      } else {
        if (phone.test(value)) {
          callback()
        } else if (email.test(value)) {
          callback()
        } else {
          callback(new Error('输入邮箱、手机号格式不正确'))
        }
      }
    }
    return {
      passwordLogin: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            validator: checkUserName,
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            validator: checkPwd,
            trigger: ['blur', 'change']
          }
        ]
      },
      register: {
        username: '',
        password: '',
        checkPassword: '',
        verification: '',
        name: ''
      },
      rules2: {
        username: [
          {
            required: true,
            validator: checkUserName,
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            validator: checkPwd,
            trigger: ['blur', 'change']
          }
        ],
        checkPassword: [
          {
            required: true,
            validator: checkPassword2,
            trigger: ['blur', 'change']
          }
        ],
        verification: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          }
        ],
        name: [
          {
            required: true,
            message: '请输入用户名',
            trigger: ['blur', 'change']
          }
        ]
      },
      verificationChange: {
        username: '',
        verification: '',
        newPassword: ''
      },
      rules3: {
        username: [
          {
            required: true,
            validator: checkUserName,
            trigger: ['blur', 'change']
          }
        ],
        verification: [
          {
            required: true,
            message: '请输入验证码',
            trigger: ['blur', 'change']
          }
        ],
        newPassword: [
          {
            required: true,
            validator: checkPwd,
            trigger: ['blur', 'change']
          }
        ]
      },
      isEditDialogVisible: false,
      isEditLoading: false,
      isEditSubmitting: false,
      isgettingLoading: false,
      isEditDialogVisible2: false,
      isEditLoading2: false,
      isEditSubmitting2: false,
      isgettingLoading2: false,
      isLogining: false,
      captchaNum: '',
      otherQuery: {},
      redirect: '',
      buttonName1: '获取验证码',
      buttonName2: '获取验证码',
      time1: 60,
      time2: 60
    }
  },
  methods: {
    userNameType(str) {
      let phone = /^1\d{10}$/
      let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (phone.test(str)) {
        return 'phone'
      } else if (email.test(str)) {
        return 'email'
      }
    },
    pLogin() {
      this.$refs.passwordLogin.validate((valid) => {
        if (valid) {
          this.isLogining = true
          let content = {}
          content.username = this.passwordLogin.username
          content.type = this.userNameType(this.passwordLogin.username)
          content.password = this.passwordLogin.password
          api
            .login(content)
            .then((response) => {
              console.log(response)
              if (response.data.code === 0) {
                this.$message({ message: '登录成功。', type: 'success' })
                this.$router.push('/')
              } else {
                this.$message({ message: '登录失败。', type: 'error' })
              }
            })
            .catch(() => {})
            .finally(() => {
              this.isLogining = false
            })
        }
      })
    },
    register1() {
      this.register = {}
      this.isEditDialogVisible = true
      this.$nextTick(() => {
        this.$refs.register.clearValidate()
      })
    },
    captcha() {
      if (this.register.username) {
        let phone = /^1\d{10}$/
        let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (phone.test(this.register.username) || email.test(this.register.username)) {
          this.isgettingLoading = true
          let content = {}
          content.username = this.register.username
          content.type = this.userNameType(this.register.username)
          content = JSON.stringify(content)
          let me = this
          // me.isDisabled = true
          let interval = window.setInterval(function () {
            me.buttonName1 = '（' + me.time1 + '秒）后可重新发送'
            --me.time1
            if (me.time1 < 0) {
              me.buttonName1 = '重新发送'
              me.time1 = 60
              // me.isDisabled = false
              me.isgettingLoading = false
              window.clearInterval(interval)
            }
          }, 1000)
          // loginApi
          //   .verification(content)
          //   .then((response) => {
          //     console.log(response)
          //     if (response.data.code === 0) {
          //       this.captchaNum = response.data.data
          //       this.$message({ message: '获取成功。', type: 'success' })
          //     } else {
          //       this.$message({ message: '获取失败。', type: 'error' })
          //     }
          //     this.isgettingLoading = false
          //   })
          //   .catch(() => {})
          //   .then(() => {
          //     this.isEditSubmitting = false
          //   })
        } else {
          this.$message.error('邮箱/手机号格式填写不正确')
        }
      } else {
        this.$message.error('请先填写邮箱/手机号')
      }
    },
    create() {
      this.$refs.register.validate((valid) => {
        if (valid) {
          this.register.type = this.userNameType(this.register.username)
          delete this.register.checkPassword
          // this.register = JSON.stringify(this.register)
          console.log(this.register)
          this.isEditSubmitting = true
          // loginApi
          //   .register(this.register)
          //   .then((response) => {
          //     if (response.data.code === 0) {
          //       this.isEditDialogVisible = false
          //       this.$message({ message: '注册成功。', type: 'success' })
          //     } else {
          //       this.$message({ message: '注册失败。', type: 'error' })
          //     }
          //   })
          //   .catch(() => {})
          //   .then(() => {
          //     this.isEditSubmitting = false
          //   })
        }
      })
    },
    forgetPassword() {
      this.verificationChange = {}
      this.isEditDialogVisible2 = true
      this.$nextTick(() => {
        this.$refs.verificationChange.clearValidate()
      })
    },
    captcha2() {
      if (this.verificationChange.username) {
        let phone = /^1\d{10}$/
        let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (phone.test(this.verificationChange.username) || email.test(this.verificationChange.username)) {
          this.isgettingLoading2 = true
          let content = {}
          content.username = this.verificationChange.username
          content.type = this.userNameType(this.verificationChange.username)
          content = JSON.stringify(content)
          let me = this
          // me.isDisabled = true
          let interval = window.setInterval(function () {
            me.buttonName2 = '（' + me.time2 + '秒）后可重新发送'
            --me.time2
            if (me.time2 < 0) {
              me.buttonName2 = '重新发送'
              me.time2 = 60
              // me.isDisabled = false
              me.isgettingLoading2 = false
              window.clearInterval(interval)
            }
          }, 1000)
          // loginApi
          //   .verification(content)
          //   .then((response) => {
          //     console.log(response)
          //     if (response.data.code === 0) {
          //       this.$message({ message: '获取成功。', type: 'success' })
          //     } else {
          //       this.$message({ message: '获取失败。', type: 'error' })
          //     }
          //     this.isgettingLoading2 = false
          //   })
          //   .catch(() => {})
          //   .then(() => {
          //     this.isEditSubmitting2 = false
          //   })
        } else {
          this.$message.error('邮箱/手机号格式填写不正确')
        }
      } else {
        this.$message.error('请先填写邮箱/手机号')
      }
    },
    changePassword() {
      this.$refs.verificationChange.validate((valid) => {
        if (valid) {
          this.verificationChange.type = this.userNameType(this.verificationChange.username)
          // this.verificationChange = JSON.stringify(this.verificationChange)
          console.log(this.verificationChange)
          this.isEditSubmitting2 = true
          // loginApi
          //   .changeVerification(this.verificationChange)
          //   .then((response) => {
          //     if (response.data.code === 0) {
          //       this.isEditDialogVisible2 = false
          //       this.$message({ message: '找回成功。', type: 'success' })
          //     } else {
          //       this.$message({ message: '找回失败。', type: 'error' })
          //     }
          //     // console.log(this.tablePage.content)
          //   })
          //   .catch(() => {})
          //   .then(() => {
          //     this.isEditSubmitting2 = false
          //   })
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.forgetPassword {
  float: right;
  line-height: 40px;
}
</style>
