<template>
  <div class="repository">
    <el-container style="height: 100%">
      <el-main>
        {{ url }}
        <el-row style="padding: 10px">
          <el-dropdown @command="createView">
            <el-button size="mini" icon="el-icon-circle-plus-outline"
              >新建<i class="el-icon-arrow-down el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="文件夹">文件夹</el-dropdown-item>
              <el-dropdown-item command="文件">文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" icon="el-icon-upload" style="margin-left: 10px">上传</el-button>
          <el-button size="mini" icon="el-icon-delete">删除</el-button>
        </el-row>
        <el-row style="padding: 10px">全部文件({{ content.length }})</el-row>
        <div>
          <el-table
            ref="table"
            @row-click="onSelect"
            @selection-change="handleChange"
            v-loading="isSearchLoading"
            :data="content"
            style="width: 100%"
          >
            <el-table-column prop="name" label="文件名" style="align-items: center">
              <template slot-scope="scope">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="scope.row.icon"></use>
                </svg>
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="update_time" label="修改时间" />
            <el-table-column prop="update_person" label="最近修改人" />
            <el-table-column prop="size" label="大小" />
            <el-table-column type="selection" label="批量操作" width="50" align="center"></el-table-column>
            <!-- <div slot="empty">
            <p v-if="emptyText">暂无数据</p>
          </div> -->
          </el-table>
        </div>
      </el-main>
      <el-aside class="rightTab" width="290px">
        <el-tabs v-model="activeName" style="height: 100%">
          <el-tab-pane label="项目动态" name="MainFirst" style="height: 100%">
            <div class="dynamics">
              <div v-for="item in operationsHistory" :key="item.id" class="box-card">
                <!-- <el-card class="box-card">
                  {{ '列表内容 ' + item }}
                </el-card> -->
                <el-avatar :size="32" src="https://empty">
                  <img src="@/assets/images/default-user.png" />
                </el-avatar>
                <span class="name">{{ item.name }}</span>
                <span class="operations">{{ item.operations }}</span>
                <span class="time">{{ item.time }}</span>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目成员" name="MainSecond">
            <div class="members">项目成员</div>
          </el-tab-pane>
          <el-tab-pane label="项目设置" name="MainThird">
            <div class="setup">项目设置</div>
          </el-tab-pane>
        </el-tabs>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
// import { Header, Aside } from './components'

export default {
  name: 'Repository',
  components: {},
  data() {
    return {
      activeName: 'MainFirst',
      url: this.$route.params.id,
      isSearchLoading: false,
      content: [],
      operationsHistory: []
    }
  },
  watch: {
    $route: function () {
      this.url = this.$route.params.id
      // console.log(from, to)
      this.initData()
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.isSearchLoading = true
      if (this.url == 3) {
        this.content = [
          {
            name: '1.xlsx',
            update_time: '2021-04-25 20:01:02',
            update_person: 'nancy',
            size: '25B'
          },
          { name: '2.txt', update_time: '2021-04-25 20:02:02', update_person: 'nancy', size: '30B' },
          { name: '3', update_time: '2021-03-25 20:04:02', update_person: 'nancy' }
        ]
        this.operationsHistory = [
          { id: '1', operations: '添加了1.xlsx', name: 'nancy', time: '2021-04-25 20:01:02' },
          { id: '2', operations: '添加了2.txt', name: 'nancy', time: '2021-04-25 20:02:02' },
          { id: '3', operations: '添加了3', name: 'nancy', time: '2021-03-25 20:04:02' }
        ]
      } else {
        this.content = [
          {
            name: '1.mp4',
            update_time: '2021-04-25 20:01:02',
            update_person: 'nancy',
            size: '25B'
          },
          { name: '2.mp3', update_time: '2021-04-25 20:02:02', update_person: 'nancy', size: '30B' },
          { name: '3.zip', update_time: '2021-04-25 20:03:02', update_person: 'nancy', size: '50B' },
          { name: '4.ppt', update_time: '2021-04-25 20:04:02', update_person: 'nancy' }
        ]
        this.operationsHistory = [
          { id: '4', operations: '添加了4.ppt', name: 'nancy', time: '2021-04-25 20:04:02' },
          { id: '2', operations: '添加了2.mp3', name: 'nancy', time: '2021-04-25 20:02:02' },
          { id: '3', operations: '添加了3.zip', name: 'nancy', time: '2021-04-25 20:03:02' }
        ]
      }
      for (let i = 0; i < this.content.length; i++) {
        let type = this.content[i].name.split('.')[this.content[i].name.split('.').length - 1].toLocaleLowerCase()
        let icon = ''
        if (this.content[i].name.split('.').length == 1) {
          icon = '#icon-file-b-2'
        } else {
          switch (type) {
            case 'xlsx':
              icon = '#icon-file-b-4'
              break
            case 'xls':
              icon = '#icon-file-b-4'
              break
            case 'docx':
              icon = '#icon-file-b-1'
              break
            case 'doc':
              icon = '#icon-file-b-1'
              break
            case 'pptx':
              icon = '#icon-file-b-'
              break
            case 'ppt':
              icon = '#icon-file-b-'
              break
            case 'txt':
              icon = '#icon-file-b-6'
              break
            case 'mp3':
              icon = '#icon-file-b-3'
              break
            case 'mp4':
              icon = '#icon-file-b-7'
              break
            case 'pdf':
              icon = '#icon-file-b-8'
              break
            case 'zip':
              icon = '#icon-file_zip'
              break
          }
        }

        this.content[i].icon = icon
      }
      this.isSearchLoading = false
    },
    onSelect(val) {
      this.$refs.table.toggleRowSelection(val)
    },
    handleChange(val) {
      console.log(val)
    },
    createView(command) {
      console.log(command)
    }
  }
}
</script>

<style scoped lang="scss">
.repository {
  height: 100%;
  .rightTab {
    border-left: 1px solid #e4e7ed;
    .dynamics {
      width: 100%;
      height: 100%;
      padding: 10px 20px 0;
      background-color: #e4e7ed;
      overflow-y: auto;
      .box-card {
        width: 100%;
        position: relative;
        font-size: 12px;
        margin-bottom: 10px;
        .name {
          position: absolute;
          top: 0;
          left: 40px;
        }
        .operations {
          position: absolute;
          top: 20px;
          left: 40px;
        }
        .time {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
<style>
.el-tabs__content {
  height: calc(100% - 40px);
}
</style>
