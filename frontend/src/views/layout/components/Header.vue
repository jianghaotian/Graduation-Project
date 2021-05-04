<template>
  <header class="header">
    <div class="logo">星原协作</div>
    <div class="user">
      <el-dropdown @command="handleDropdown">
        <div class="container">
          <el-avatar :size="32" src="https://empty">
            <img src="@/assets/images/default-user.png" />
          </el-avatar>
          <span class="name">姜皓天</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="feedback">意见反馈</el-dropdown-item>
          <el-dropdown-item command="setting" @click.native="setup()">账号设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
      :title="'账号设置'"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="isEditDialogVisible"
      width="520px"
    >
      <el-form :model="IDSetup" :rules="rules" ref="IDSetup">
        <el-form-item label="头像" size="mini" prop="head_thumb" label-width="100px">
          <el-input v-model="IDSetup.head_thumb" maxlength="20" show-word-limit style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="用户名" size="mini" prop="name" label-width="100px">
          <el-input v-model="IDSetup.name" maxlength="20" show-word-limit style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" size="mini" prop="email" label-width="100px">
          <el-input v-model="IDSetup.email" maxlength="20" show-word-limit style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item label="电话" size="mini" prop="phone" label-width="100px">
          <el-input v-model="IDSetup.phone" maxlength="20" show-word-limit style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>
  </header>
</template>

<script>
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
      IDSetup: {
        head_thumb: '',
        name: '',
        email: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: '仓库名称不能为空', trigger: 'blur' }],
        email: [
          {
            required: true,
            validator: checkEmail,
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          {
            required: true,
            validator: checkPhone,
            trigger: ['blur', 'change']
          }
        ]
      }
    }
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
      console.log(1)
      this.isEditDialogVisible = true
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
