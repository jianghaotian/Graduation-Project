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
        <el-row style="padding: 10px" v-if="this.$route.params.folderId">
          <a><i class="el-icon-back"></i> 返回上一级</a>
          >
          <span>4</span>
        </el-row>
        <el-row style="padding: 10px" v-else>全部文件({{ content.length }})</el-row>
        <div>
          <el-table
            ref="table"
            @row-click="onSelect"
            @selection-change="handleChange"
            @cell-mouse-leave="showClickIcon = false"
            @cell-mouse-enter="displayHandle"
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
                <el-dropdown @command="createView" class="pointerIcon" trigger="click">
                  <i v-show="showClickIcon == true && scope.row.id == rowid" class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="删除">删除</el-dropdown-item>
                    <el-dropdown-item command="移动">移动</el-dropdown-item>
                    <el-dropdown-item command="重命名">重命名</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
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
        <el-tabs v-model="activeName" style="height: 100%" @tab-click="handleClick">
          <el-tab-pane label="项目动态" name="MainFirst" style="height: 100%">
            <div class="dynamics">
              <div v-for="time in operationsHistory" :key="time.id">
                <div class="date">
                  <span><i class="el-icon-date"></i> {{ time.time }}</span>
                </div>
                <div v-for="item in time.children" :key="item.id" class="box-card">
                  <el-avatar :size="32" src="https://empty">
                    <img src="@/assets/images/default-user.png" />
                  </el-avatar>
                  <span class="name">{{ item.name }}</span>
                  <span class="operations">{{ item.operations }}</span>
                  <span class="time">{{ item.time }}</span>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目成员" name="MainSecond" style="height: 100%">
            <div class="members">
              <el-row>邀请成员加入</el-row>
              <el-row style="margin: 10px 0">
                <el-input placeholder="请输入用户id" size="mini" style="width: 170px; margin-right: 5px"></el-input>
                <el-button @click="addMember" type="primary" size="mini"> 添加 </el-button>
              </el-row>
              <el-row style="padding-bottom: 10px">成员列表({{ members.length }})</el-row>
              <div v-for="item in members" :key="item.id" class="card">
                <el-avatar :size="32" src="https://empty">
                  <img src="@/assets/images/default-user.png" />
                </el-avatar>
                <span class="memberName">{{ item.name }}</span>
                <el-row class="status">
                  <span v-show="item.name == 'nancy'" class="my">本人</span>
                  <span v-if="item.type == 0">创建者</span>
                  <span v-else-if="item.type == 1">管理员</span>
                  <span v-else>成员</span>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目信息" name="MainThird" style="height: 100%">
            <div class="message">
              <el-row>项目名称</el-row>
              <el-row style="margin: 10px 0">
                <!-- <el-input placeholder="请输入用户id" size="mini" style="width: 180px; margin-right: 10px"></el-input> -->
                <el-input maxlength="20" show-word-limit size="mini"></el-input>
              </el-row>
              <el-row>项目描述</el-row>
              <el-row style="margin: 10px 0">
                <el-input type="textarea" maxlength="128" show-word-limit></el-input>
              </el-row>
              <el-row>
                <el-button @click="addMember" type="primary" class="addSave" size="mini"> 保存</el-button>
              </el-row>
            </div>
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
      operationsHistory: [],
      showClickIcon: false,
      showInfo: false,
      rowid: '',
      rowData: [],
      members: []
    }
  },
  watch: {
    $route: function () {
      this.url = this.$route.params.id
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
          {
            id: '1',
            time: '2021-04-25',
            children: [
              { id: '1-1', operations: '添加了1.xlsx', name: 'nancy', time: '20:01:02' },
              { id: '1-2', operations: '添加了2.txt', name: 'nancy', time: '20:02:02' },
              { id: '1-3', operations: '添加了3', name: 'nancy', time: '20:04:02' }
            ]
          }
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
          {
            id: '4',
            time: '2021-04-25',
            children: [
              { id: '4-1', operations: '添加了4.ppt', name: 'nancy', time: '20:04:02' },
              { id: '4-2', operations: '添加了2.mp3', name: 'nancy', time: '20:02:02' },
              { id: '4-3', operations: '添加了3.zip', name: 'nancy', time: '20:03:02' }
            ]
          },
          {
            id: '3',
            time: '2021-04-25',
            children: [
              { id: '3-1', operations: '添加了4.ppt', name: 'nancy', time: '20:04:02' },
              { id: '3-2', operations: '添加了2.mp3', name: 'nancy', time: '20:02:02' },
              { id: '3-3', operations: '添加了3.zip', name: 'nancy', time: '20:03:02' }
            ]
          }
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
    displayHandle(row) {
      this.showClickIcon = true
      this.rowid = row.id //赋值行id，便于页面判断
      this.rowData = row //把行数据赋值，用于后续操作
    },
    createView(command) {
      console.log(command)
    },
    getNowDate() {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hours = date.getHours() //获取当前小时数(0-23)
      let minutes = date.getMinutes() //获取当前分钟数(0-59)
      let seconds = date.getSeconds() //获取当前秒数(0-59)
      if (month.toString().length == 1) {
        month = '0' + month
      }
      return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
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
    },
    handleClick(targetName) {
      console.log(targetName.index)
      if (targetName.index == 1) {
        this.members = [
          { id: '1', name: 'nancy', head_thumb: 'pic', type: 0 },
          { id: '2', name: 'mary', head_thumb: 'pic', type: 1 },
          { id: '3', name: 'mike', head_thumb: 'pic', type: 2 },
          { id: '4', name: 'jane', head_thumb: 'pic', type: 3 }
        ]
      }
    },
    addMember() {}
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
      .date {
        width: 100%;
        display: flex;
        justify-content: center;
      }
      .box-card {
        width: 100%;
        position: relative;
        font-size: 12px;
        margin-bottom: 10px;
        .name {
          position: absolute;
          top: 5px;
          left: 40px;
        }
        .operations {
          position: absolute;
          top: 5px;
          left: 80px;
        }
        .time {
          position: absolute;
          top: 5px;
          right: 0;
        }
      }
    }
    .members {
      width: 100%;
      height: 100%;
      padding: 10px 20px 0;
      overflow-y: auto;
      .card {
        width: 100%;
        position: relative;
        font-size: 12px;
        margin-bottom: 10px;
        .memberName {
          position: absolute;
          top: 3px;
          left: 40px;
        }
        .status {
          position: absolute;
          top: 20px;
          left: 40px;
          color: #999;
          .my {
            background-color: #409eff;
            color: #fff;
            display: inline-block;
            padding: 1px 5px;
            margin-right: 5px;
          }
        }
      }
    }
    .message {
      width: 100%;
      height: 100%;
      padding: 10px 20px 0;
      overflow-y: auto;
      .addSave {
        width: 100%;
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
.pointerIcon {
  transform: rotate(90deg);
  float: right;
  line-height: 28px;
}
</style>
