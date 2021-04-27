<template>
  <div class="repository">
    <el-container style="height: 100%">
      <el-main>
        {{ url }}
        <el-row style="padding: 10px">
          <!-- <el-dropdown @command="createView"> -->
          <el-button size="mini" @click="addFile()" icon="el-icon-circle-plus-outline" type="primary"
            >新建
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </el-button>
          <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="文件夹">文件夹</el-dropdown-item>
              <el-dropdown-item @click.native="addFile()" command="文件">文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-dropdown @command="createView">
            <el-button size="mini" icon="el-icon-upload" style="margin-left: 10px"
              >上传<i class="el-icon-arrow-down el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="文件夹">文件夹</el-dropdown-item>
              <el-dropdown-item command="文件">文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="mini" icon="el-icon-download" style="margin-left: 10px">下载</el-button>
          <el-button size="mini" icon="el-icon-delete" style="margin-left: 10px">删除</el-button>
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
            :default-sort="{ prop: 'name', order: 'descending' }"
          >
            <el-table-column min-width="5" prop="name" label="文件名" style="align-items: center">
              <template slot-scope="scope">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="scope.row.icon"></use>
                </svg>
                <el-input
                  size="mini"
                  v-show="scope.row.show"
                  @blur="save(scope.row)"
                  v-model="scope.row.name"
                ></el-input>
                <span v-show="!scope.row.show">{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="2" prop="update_time" label="修改时间" />
            <el-table-column min-width="1" prop="update_person" label="最近修改人" />
            <el-table-column min-width="1" prop="size" label="大小" />
            <el-table-column min-width="1" type="selection" label="批量操作" align="center"></el-table-column>
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
            id: 1,
            name: '1.xlsx',
            update_time: '2021-04-25 20:01:02',
            update_person: 'nancy',
            size: '25B'
          },
          { id: 2, name: '2.txt', update_time: '2021-04-25 20:02:02', update_person: 'nancy', size: '30B' },
          { id: 3, name: '3', update_time: '2021-03-25 20:04:02', update_person: 'nancy' }
        ]
        this.operationsHistory = [
          { id: '1', operations: '添加了1.xlsx', name: 'nancy', time: '2021-04-25 20:01:02' },
          { id: '2', operations: '添加了2.txt', name: 'nancy', time: '2021-04-25 20:02:02' },
          { id: '3', operations: '添加了3', name: 'nancy', time: '2021-03-25 20:04:02' }
        ]
      } else {
        this.content = [
          {
            id: 1,
            name: '1.mp4',
            update_time: '2021-04-25 20:01:02',
            update_person: 'nancy',
            size: '25B'
          },
          { id: 2, name: '2.mp3', update_time: '2021-04-25 20:02:02', update_person: 'nancy', size: '30B' },
          { id: 3, name: '3.zip', update_time: '2021-04-25 20:03:02', update_person: 'nancy', size: '50B' },
          { id: 4, name: '4.ppt', update_time: '2021-04-25 20:04:02', update_person: 'nancy' }
        ]
        this.operationsHistory = [
          { id: '4', operations: '添加了4.ppt', name: 'nancy', time: '2021-04-25 20:04:02' },
          { id: '2', operations: '添加了2.mp3', name: 'nancy', time: '2021-04-25 20:02:02' },
          { id: '3', operations: '添加了3.zip', name: 'nancy', time: '2021-04-25 20:03:02' }
        ]
      }
      for (let i = 0; i < this.content.length; i++) {
        this.content[i].icon = this.fileType(this.content[i].name)
      }
      this.isSearchLoading = false
    },
    fileType(name) {
      let type = name.split('.')[name.split('.').length - 1].toLocaleLowerCase()
      let icon = ''
      if (name.split('.').length == 1) {
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

      return icon
    },
    onSelect(val) {
      this.$refs.table.toggleRowSelection(val)
    },
    handleChange(val) {
      console.log(val)
    },
    createView(command) {
      console.log(command)
    },
    getNowDate() {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      if (month.toString().length == 1) {
        month = '0' + month
      }
      return year + '-' + month
    },
    addFile() {
      this.content.unshift({
        id: '',
        name: '',
        update_time: this.getNowDate(),
        update_person: 'nancy',
        size: '0',
        show: true
      })
    },
    save(row) {
      row.show = false
      row.icon = this.fileType(row.name)
    }
  }
}
</script>

<style scoped lang="scss">
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
.repository {
  height: 100%;
  .rightTab {
    border-left: 1px solid #e4e7ed;
    .dynamics {
      width: 100%;
      height: 100%;
      padding: 10px 20px 0;
      background-color: #f7f7fa;
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
.el-input {
  width: 80%;
}
</style>
