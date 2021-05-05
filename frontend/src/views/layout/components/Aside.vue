<template>
  <aside class="aside">
    <div class="new-button">
      <el-button round size="small" icon="el-icon-plus" @click="create">新建仓库</el-button>
    </div>
    <div class="repositories">
      <el-collapse :value="['1', '2']">
        <el-collapse-item title="我创建的仓库" name="1">
          <div class="repo-list">
            <div v-for="item in ownList" :key="item.id">
              <router-link :to="'/repository/' + item.id" class="item">
                <i class="el-icon-folder"></i>
                <span class="title">{{ item.name }}</span>
              </router-link>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="加入的仓库" name="2">
          <div class="repo-list">
            <div v-for="item in otherList" :key="item.id">
              <router-link :to="'/repository/' + item.id" class="item">
                <i class="el-icon-folder"></i>
                <span class="title">{{ item.name }}</span>
              </router-link>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
      <router-link to="/repositories" class="repo-all">所有仓库</router-link>
    </div>
    <el-dialog
      :title="'创建仓库'"
      :close-on-click-modal="false"
      :append-to-body="true"
      :visible.sync="isEditDialogVisible"
      width="520px"
    >
      <el-form :model="repository" :rules="rules" ref="repository">
        <el-form-item label="仓库名称" size="mini" prop="name" label-width="100px">
          <el-input v-model="repository.name" maxlength="20" show-word-limit style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item type="text" label="仓库描述" size="mini" label-width="100px">
          <el-input type="textarea" v-model="repository.desc" maxlength="128" show-word-limit></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="isEditDialogVisible = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="addrepository()">确 定</el-button>
      </div>
    </el-dialog>
  </aside>
</template>

<script>
// import { Header } from './components'
import api from '@/api/repository'

export default {
  name: 'Aside',
  data() {
    return {
      isEditDialogVisible: false,
      repository: {
        name: '',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '仓库名称不能为空', trigger: 'blur' }]
      },
      ownList: [],
      otherList: []
    }
  },
  mounted() {
    api.getRepoList({ all: 1 }).then((res) => {
      this.ownList = res.data.data.own
      this.otherList = res.data.data.other
    })
  },
  methods: {
    create() {
      this.verificationChange = {}
      this.isEditDialogVisible = true
      this.$nextTick(() => {
        this.$refs.repository.clearValidate()
      })
    },
    addrepository() {
      api
        .createRepository(this.repository)
        .then((response) => {
          console.log(response)
          this.isEditDialogVisible = false
          if (response.data.code === 0) {
            this.$message({ message: '创建成功。', type: 'success' })
            api.getRepoList({ all: 1 }).then((res) => {
              this.ownList = res.data.data.own
              this.otherList = res.data.data.other
            })
          } else {
            this.$message({ message: '创建失败。', type: 'error' })
          }
        })
        .catch(() => {})
    }
  }
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
        padding-left: 32px + 16px;
        padding-right: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        &:hover {
          background-color: #fff;
        }
        .title {
          padding-left: 8px;
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
