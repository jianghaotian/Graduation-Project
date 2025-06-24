<template>
  <header class="header">
    <div class="logo">星原协作</div>
    <div class="user">
      <el-dropdown @command="handleDropdown">
        <div class="container">
          <el-avatar :size="32" src="https://empty">
            <img src="@/assets/images/default-user.png" />
          </el-avatar>
          <span class="name">{{ info.name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="feedback">意见反馈</el-dropdown-item>
          <el-dropdown-item command="setting" @click.native="setup()">账号设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="'个人信息'"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="isEditDialogVisible"
      width="520px"
    >
      <el-upload
        class="upload-demo"
        action="/v1/user/head"
        :on-success="handlesuccess"
        multiple
        ref="upload"
        :limit="1"
        :headers="{ Authorization: `Bearer ${$store.getters.token}` }"
        :on-remove="remove"
      >
        <el-avatar :size="64" :src="info.head_thumb" style="margin-left: 50px">
          <img src="@/assets/images/default-user.png" />
        </el-avatar>
      </el-upload>
      <el-form :model="IDSetup" :rules="rules" ref="IDSetup">
        <el-form-item label="用户id" size="mini" prop="id" label-width="100px">
          <span>{{ info.id }}</span>
        </el-form-item>
        <el-form-item label="用户名" size="mini" prop="name" label-width="100px">
          <el-input
            v-show="nameShow"
            v-model="IDSetup.name"
            maxlength="20"
            show-word-limit
            style="width: 50%"
          ></el-input>
          <el-button v-show="nameShow" size="mini" @click="nameShow = false" style="margin-left: 10px">取消</el-button>
          <el-button v-show="nameShow" size="mini" @click="changeName" type="primary" style="margin-left: 10px"
            >确定</el-button
          >
          <span v-show="!nameShow">{{ info.name }}</span>
          <el-button
            v-show="!nameShow"
            size="mini"
            @click="nameShow = true"
            icon="el-icon-edit"
            style="margin-left: 10px"
            >修改</el-button
          >
        </el-form-item>
        <el-form-item label="邮箱" size="mini" prop="email" label-width="100px">
          <!-- <el-input v-model="IDSetup.email" maxlength="20" show-word-limit style="width: 100%"></el-input> -->
          <span>{{ info.email }}</span>
          <el-button size="mini" @click="isEditDialogVisible1 = true" icon="el-icon-edit" style="margin-left: 10px"
            >修改</el-button
          >
        </el-form-item>
        <el-form-item label="电话" size="mini" prop="phone" label-width="100px">
          <!-- <el-input v-model="IDSetup.phone" maxlength="20" show-word-limit style="width: 100%"></el-input> -->
          <span>{{ info.phone }}</span>
          <el-button size="mini" @click="isEditDialogVisible2 = true" icon="el-icon-edit" style="margin-left: 10px"
            >修改</el-button
          >
        </el-form-item>
        <el-form-item label="创建时间" size="mini" prop="create_time" label-width="100px">
          <span>{{ $moment(info.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible = false">确 定</el-button>
        <!-- <el-button size="mini" type="primary" @click="save()">确 定</el-button> -->
      </div>
    </el-dialog>
    <el-dialog :title="'修改邮箱'" width="35%" :visible.sync="isEditDialogVisible1" append-to-body>
      <el-form :model="changeEmail" ref="changeEmail" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username" label="邮箱" size="mini">
          <el-input
            maxlength="32"
            type="text"
            name="username"
            v-model="changeEmail.email"
            placeholder="请输入新的邮箱"
            autofocus="autofocus"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verification" label="验证码" size="mini">
          <el-input type="text" placeholder="请输入验证码" v-model="changeEmail.verification" name="verification">
            <el-button slot="append" type="primary" :loading="isgettingLoading1" @click="captcha1()">{{
              buttonName1
            }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible1 = false"> 取消 </el-button>
        <el-button size="mini" type="primary" @click="changeEmail1()"> 确定 </el-button>
      </div>
    </el-dialog>
    <el-dialog
      :title="'修改电话'"
      width="35%"
      :visible.sync="isEditDialogVisible2"
      :close-on-click-modal="false"
      append-to-body
    >
      <el-form :model="changePhone" ref="changePhone" label-position="left" label-width="100px" class="demo-ruleForm">
        <el-form-item prop="username" label="电话" size="mini">
          <el-input
            maxlength="32"
            type="text"
            name="username"
            v-model="changePhone.phone"
            placeholder="请输入新的电话"
            autofocus="autofocus"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verification" label="验证码" size="mini">
          <el-input type="text" placeholder="请输入验证码" v-model="changePhone.verification" name="verification">
            <el-button slot="append" type="primary" :loading="isgettingLoading2" @click="captcha2()">{{
              buttonName2
            }}</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible2 = false"> 取消 </el-button>
        <el-button size="mini" type="primary" @click="changePhone1()"> 确定 </el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
import userApi from '@/api/user'
import api from '@/api/account'

export default {
  name: 'Header',
  data() {
    let checkEmail = (rule, value, callback) => {
      let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else {
        if (email.test(value)) {
          callback()
        } else {
          callback(new Error('输入邮箱格式不正确'))
        }
      }
    }
    let checkPhone = (rule, value, callback) => {
      let phone = /^1\d{10}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else {
        if (phone.test(value)) {
          callback()
        } else {
          callback(new Error('输入手机号格式不正确'))
        }
      }
    }
    return {
      isEditDialogVisible: false,
      info: {},
      IDSetup: {
        head_thumb: '',
        name: '',
        email: '',
        phone: ''
      },
      changeEmail: {
        email: '',
        verification: ''
      },
      changePhone: {
        phone: '',
        verification: ''
      },
      nameShow: false,
      isEditDialogVisible1: false,
      isgettingLoading1: false,
      buttonName1: '获取验证码',
      time1: 60,
      time2: 60,
      buttonName2: '获取验证码',
      isEditDialogVisible2: false,
      isgettingLoading2: false,
      rules: {
        email: [
          {
            validator: checkEmail,
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            validator: checkPhone,
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  created() {
    userApi
      .info()
      .then((response) => {
        console.log(response)
        this.info = response.data.data
      })
      .catch(() => {})
  },
  methods: {
    handleDropdown(command) {
      console.log(command)
      if (command === 'logout') {
        this.$store.dispatch('user/resetToken')
        this.$router.push('/login')
      }
    },
    setup() {
      this.isEditDialogVisible = true
      this.IDSetup.name = this.info.name
      this.IDSetup.email = this.info.email
      this.IDSetup.phone = this.info.phone
    },
    handlesuccess(response) {
      if (response.code == 0) {
        this.$message({ message: '上传成功。', type: 'success' })
      } else {
        this.$message({ message: '上传失败。', type: 'error' })
      }
      this.$refs.upload.clearFiles()
    },
    remove() {
      this.$refs.upload.clearFiles()
    },
    changeName() {
      userApi
        .changeName({ name: this.IDSetup.name })
        .then((response) => {
          if (response.data.code == 0) {
            this.$message({ message: '修改成功。', type: 'success' })
            this.nameShow = false
            this.info.name = this.IDSetup.name
          } else {
            this.$message({ message: '修改失败。', type: 'error' })
          }
        })
        .catch(() => {})
    },
    captcha1() {
      if (this.changeEmail.email) {
        let email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
        if (email.test(this.changeEmail.email)) {
          this.isgettingLoading1 = true
          let content = {}
          content.username = this.changeEmail.email
          content.type = 'email'
          api
            .verification(content)
            .then((response) => {
              if (response.data.code === 0) {
                this.$message({ message: '获取成功。', type: 'success' })
              } else {
                this.$message({ message: '获取失败。', type: 'error' })
              }
              let me = this
              let interval = window.setInterval(function () {
                me.buttonName1 = '(' + me.time1 + '秒)后可重新发送'
                --me.time1
                if (me.time1 < 0) {
                  me.buttonName1 = '重新发送'
                  me.isgettingLoading1 = false
                  window.clearInterval(interval)
                  me.time1 = 60
                }
              }, 1000)
            })
            .catch(() => {})
            .then(() => {})
        } else {
          this.$message.error('邮箱格式填写不正确')
        }
      } else {
        this.$message.error('请先填写邮箱')
      }
    },
    changeEmail1() {
      userApi
        .changeEmail({ email: this.changeEmail.email, verification: this.changeEmail.verification })
        .then((response) => {
          if (response.data.code === 0) {
            this.$message({ message: '修改成功。', type: 'success' })
            this.info.email = this.changeEmail.email
            this.isEditDialogVisible1 = false
          } else {
            this.$message({ message: '修改失败。', type: 'error' })
          }
        })
    },
    captcha2() {
      if (this.changePhone.phone) {
        let phone = /^1\d{10}$/
        if (phone.test(this.changePhone.phone)) {
          this.isgettingLoading2 = true
          let content = {}
          content.username = this.changePhone.phone
          content.type = 'phone'
          api
            .verification(content)
            .then((response) => {
              if (response.data.code === 0) {
                this.$message({ message: '获取成功。', type: 'success' })
              } else {
                this.$message({ message: '获取失败。', type: 'error' })
              }
              let me = this
              let interval = window.setInterval(function () {
                me.buttonName2 = '(' + me.time2 + '秒)后可重新发送'
                --me.time2
                if (me.time2 < 0) {
                  me.buttonName2 = '重新发送'
                  me.isgettingLoading2 = false
                  window.clearInterval(interval)
                  me.time2 = 60
                }
              }, 1000)
            })
            .catch(() => {})
            .then(() => {})
        } else {
          this.$message.error('电话格式填写不正确')
        }
      } else {
        this.$message.error('请先填写电话')
      }
    },
    changePhone1() {
      userApi
        .changePhone({ phone: this.changePhone.phone, verification: this.changePhone.verification })
        .then((response) => {
          if (response.data.code === 0) {
            this.$message({ message: '修改成功。', type: 'success' })
            this.info.phone = this.changeEmail.phone
            this.isEditDialogVisible2 = false
          } else {
            this.$message({ message: '修改失败。', type: 'error' })
          }
        })
    },
    save() {}
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 48px;
  box-shadow: 0 3px 6px rgba(166, 169, 180, 0.2);
  overflow: hidden;
  z-index: 1;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 100%;
    font-size: 24px;
    font-weight: 500;
    letter-spacing: 4px;
  }
  .user {
    padding-right: 48px;
    height: 100%;
    .el-dropdown {
      height: 100%;
      color: #303133;
    }
    .container {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 8px;
      cursor: pointer;
      &:hover {
        background-color: #ecf5ff;
      }
      .name {
        padding-left: 8px;
      }
    }
  }
}
</style>
