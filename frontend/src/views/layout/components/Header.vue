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
          <el-dropdown-item command="setting">账号设置</el-dropdown-item>
          <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handleDropdown(command) {
      console.log(command)
    }
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
