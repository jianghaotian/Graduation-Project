<template>
  <aside class="aside">
    <div class="new-button">
      <el-button round size="small" icon="el-icon-plus">新建仓库</el-button>
    </div>
    <div class="repositories">
      <el-collapse :value="['1', '2']">
        <el-collapse-item title="我的仓库" name="1">
          <div class="repo-list">
            <router-link to="/" class="item">
              <i class="el-icon-folder"></i>
              仓库1首页测试
            </router-link>
            <router-link to="/repository/3" class="item">
              <i class="el-icon-folder"></i>
              名字很长很长很长很长很长很长很长很长很长的仓库2
            </router-link>
            <router-link to="/repository/4" class="item">
              <i class="el-icon-folder"></i>
              仓库仓库3
            </router-link>
            <router-link to="/buzhengquedeluyou" class="item">
              <i class="el-icon-folder"></i>
              仓库404测试
            </router-link>
          </div>
        </el-collapse-item>
        <el-collapse-item title="加入的仓库" name="2">
          <div class="repo-list">
            <router-link to="/repository/11" class="item">
              <i class="el-icon-folder"></i>
              仓库1
            </router-link>
            <router-link to="/repository/22" class="item">
              <i class="el-icon-folder"></i>
              仓库仓库仓库2
            </router-link>
          </div>
        </el-collapse-item>
      </el-collapse>
      <router-link to="/repositories" class="repo-all">所有仓库</router-link>
    </div>
  </aside>
</template>

<script>
// import { Header } from './components'

export default {
  name: 'Aside'
}
</script>

<style scoped lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  width: 220px;
  height: 100%;
  background-color: #f7f7fa;
  border-right: 1px solid #efeff0;
  overflow: auto;
  .new-button {
    margin: 0 auto;
    padding-top: 24px;
    padding-bottom: 8px;
  }
  .repositories {
    .el-collapse {
      border: none;
      /deep/ .el-collapse-item__header {
        padding-left: 32px;
        background-color: transparent;
        border: none;
        font-size: 14px;
        font-weight: 600;
      }
      /deep/ .el-collapse-item__wrap {
        background-color: transparent;
        border: none;
      }
      /deep/ .el-collapse-item__content {
        padding: 0;
        font-size: 14px;
      }
    }
    .repo-list {
      .item {
        display: block;
        height: 36px;
        line-height: 36px;
        padding-left: 32px;
        padding-right: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          background-color: #fff;
        }
      }
    }
    .repo-all {
      display: block;
      height: 36px;
      line-height: 36px;
      margin: 6px 0;
      padding-left: 32px;
      color: #303133;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      &:hover {
        background-color: #fff;
      }
    }
    .router-link-exact-active {
      background-color: #fff;
    }
  }
}
</style>
