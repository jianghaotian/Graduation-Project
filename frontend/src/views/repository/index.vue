<template>
  <div class="repository">
    <el-container style="height: 100%">
      <el-main>
        <el-row style="padding: 10px">
          <!-- <el-dropdown @command="createView"> -->
          <el-button
            v-show="type == 0 || type == 1"
            size="mini"
            @click="addFolder()"
            icon="el-icon-circle-plus-outline"
            type="primary"
            style="margin-right: 10px"
            >新建文件夹
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </el-button>
          <!-- <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="文件夹">文件夹</el-dropdown-item>
              <el-dropdown-item @click.native="addFile()" command="文件">文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <el-dropdown @command="createView">
            <el-button size="mini" icon="el-icon-upload" style="margin-left: 10px"
              >上传<i class="el-icon-arrow-down el-icon--right"></i
            ></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="文件夹">文件夹</el-dropdown-item>
              <el-dropdown-item command="文件">
                <el-upload
                  class="upload-demo"
                  action=""
                  :on-success="handlesuccess"
                  multiple
                  :limit="3"
                  :on-exceed="handleExceed"
                  :file-list="fileList"
                >
                  文件
                </el-upload>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <el-upload
            class="upload-demo"
            action="/api/v1/file/upload"
            :on-success="handlesuccess"
            multiple
            ref="upload"
            :limit="3"
            :on-exceed="handleExceed"
            :data="data"
            :headers="{ Authorization: `Bearer ${$store.getters.token}` }"
            :on-remove="remove"
            v-show="type == 0 || type == 1"
          >
            <el-button size="mini" icon="el-icon-upload" style="margin-right: 10px">上传</el-button>
          </el-upload>
          <el-button size="mini" icon="el-icon-download" style="margin-right: 10px">下载</el-button>
          <el-button
            @click="deleteFile"
            v-show="type == 0 || type == 1"
            size="mini"
            icon="el-icon-delete"
            style="margin-left: 0px"
            >删除</el-button
          >
        </el-row>
        <el-row style="padding: 10px">
          <!-- <a><i class="el-icon-back"></i> 返回上一级</a> -->
          <router-link :to="'/repository/' + repoInfo.id"> {{ repoInfo.name || repoId }} </router-link>
          <div style="display: inline-block">
            >
            <router-link :to="backRoute"> 返回上一级 </router-link>
          </div>
        </el-row>
        <!-- <el-row style="padding: 10px" v-else>全部文件({{ content.length }})</el-row> -->
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
                <!-- <div style="display: inline-block" @click="getFloder(scope.row.folder_id)"> -->
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="scope.row.icon"></use>
                </svg>
                <el-input
                  size="mini"
                  v-show="scope.row.show"
                  @blur="save(scope.row)"
                  v-model="scope.row.name"
                ></el-input>
                <el-input
                  size="mini"
                  v-if="scope.row.rename"
                  @blur="rename1(scope.row)"
                  v-model="scope.row.name"
                ></el-input>
                <router-link
                  :to="$route.path + '/' + scope.row.uid"
                  v-show="!scope.row.show && !scope.row.rename && scope.row.icon == '#icon-file-b-2'"
                >
                  <span @click="floderName = scope.row.name">{{ scope.row.name }}</span>
                </router-link>
                <!-- <span v-show="!scope.row.show && scope.row.icon == '#icon-file-b-2'" @click="a(scope.row.folder_id)">{{
                  scope.row.name
                }}</span> -->
                <span v-show="!scope.row.show && !scope.row.rename && scope.row.icon != '#icon-file-b-2'">{{
                  scope.row.name
                }}</span>
                <!-- </div> -->
                <el-dropdown @command="createView" class="pointerIcon" trigger="click" v-show="type != 3">
                  <i v-show="showClickIcon == true && scope.row.id == rowid" class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="下载" v-show="scope.row.icon != '#icon-file-b-2'">下载</el-dropdown-item>
                    <el-dropdown-item
                      @click.native="deleteRow(scope.row)"
                      command="删除"
                      v-show="type == 0 || type == 1"
                      >删除</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="rename(scope.row)" v-show="type != 3" command="重命名"
                      >重命名</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column min-width="2" prop="update_time" label="修改时间">
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.create_time).format('YYYY-DD-MM HH:mm:ss') }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="1" prop="update_user" label="最近修改人" />
            <el-table-column min-width="1" prop="size" label="大小">
              <template slot-scope="scope">
                <span v-if="scope.row.icon == '#icon-file-b-2'"></span>
                <span v-else>{{ scope.row.size }}b</span>
              </template>
            </el-table-column>
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
              <el-row v-show="type == 0 || type == 1">邀请成员加入</el-row>
              <el-row style="margin: 10px 0" v-show="type == 0 || type == 1">
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
                  <span v-if="item.type == 0">owner</span>
                  <span v-else-if="item.type == 1">maintainer</span>
                  <span v-else-if="item.type == 2">developer</span>
                  <span v-else>reporter</span>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目信息" name="MainThird" style="height: 100%">
            <div class="message">
              <el-row>项目名称</el-row>
              <el-row style="margin: 10px 0">
                <!-- <el-input placeholder="请输入用户id" size="mini" style="width: 180px; margin-right: 10px"></el-input> -->
                <el-input
                  maxlength="20"
                  :disabled="type != 0"
                  v-model="repositoryName"
                  show-word-limit
                  size="mini"
                ></el-input>
              </el-row>
              <el-row>项目描述</el-row>
              <el-row style="margin: 10px 0">
                <el-input
                  type="textarea"
                  :disabled="type != 0"
                  v-model="repositoryDesc"
                  maxlength="128"
                  show-word-limit
                ></el-input>
              </el-row>
              <el-row v-show="type == 0">
                <el-button @click="saveData" type="primary" class="save" size="mini"> 保存</el-button>
              </el-row>
              <el-row v-show="type == 0">
                <el-button @click="deleteR" type="danger" class="delete" size="mini"> 删除仓库</el-button>
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
import fileApi from '@/api/file'
import userApi from '@/api/user'
import repositoryApi from '@/api/repository'
export default {
  name: 'Repository',
  components: {},
  data() {
    return {
      repoId: this.$route.params.id,
      folderId: '',
      isSearchLoading: false,
      content: [],
      showClickIcon: false,
      showInfo: false,
      repoInfo: {}, // 项目信息
      rowid: '',
      rowData: [],
      filesList: [],
      data: {},
      name: '',
      activeName: 'MainFirst',
      operationsHistory: [],
      members: [],
      repositoryName: '',
      repositoryDesc: '',
      type: '',
      floderName: '',
      backRoute: ''
    }
  },
  watch: {
    $route: function (to, from) {
      console.log(to, from, this.$route.params)
      this.backRoute = from
      this.repoId = this.$route.params.id
      this.data = { repo_id: this.repoId }
      if (this.$route.params.folderId || this.$route.params.folderId != undefined) {
        this.folderId = this.$route.params.folderId
        this.data = { repo_id: this.repoId, folder_id: this.folderId }
      }
      console.log(this.data)
      this.initData()
    }
  },
  created() {
    userApi
      .info()
      .then((response) => {
        this.name = response.data.data.name
      })
      .catch(() => {})
    this.data = { repo_id: this.repoId }
    if (this.$route.params.folderId || this.$route.params.folderId != undefined) {
      this.folderId = this.$route.params.folderId
      this.data = { repo_id: this.repoId, folder_id: this.folderId }
    }
    this.initData()
  },
  methods: {
    // a(folder_id) {
    //   console.log(this.$route.path)
    //   console.log(folder_id)
    // },
    initData() {
      this.isSearchLoading = true
      this.getFileList()
      repositoryApi.getRepoInfo({ id: this.repoId }).then((res) => {
        this.repoInfo = res.data.data
        this.getMember()
        this.repositoryName = this.repoInfo.name
        this.repositoryDesc = this.repoInfo.desc
      })
    },
    getFileList() {
      fileApi
        .fileList(this.data)
        .then((response) => {
          this.content = response.data.data.list
          for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].type == 'folder') {
              this.content[i].icon = '#icon-file-b-2'
            } else {
              this.content[i].icon = this.fileType(this.content[i].name)
            }
          }
          this.isSearchLoading = false
        })
        .catch(() => {})
    },
    fileType(name) {
      let type = name.split('.')[name.split('.').length - 1].toLocaleLowerCase()
      let icon = ''
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
        default:
          icon = '#icon-wenjianleixing1'
          break
      }

      return icon
    },
    onSelect(val) {
      // this.$refs.table.toggleRowSelection(val)
      console.log(val)
    },
    handleChange(val) {
      console.log(val)
      this.filesList = val
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
    addFolder() {
      this.content.unshift({
        id: '',
        name: '',
        update_time: this.getNowDate(),
        create_time: this.getNowDate(),
        update_user: this.name,
        size: '',
        show: true,
        icon: '#icon-file-b-2'
      })
    },
    deleteFile() {
      this.$confirm('此操作将删除选中的文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          console.log(this.filesList.length)
          for (let i = 0; i < this.filesList.length; i++) {
            // this.content.splice(this.content.indexOf(this.filesList[i]), 1)
            // console.log(this.content)
            console.log('i', this.filesList[i].id)
            fileApi
              .deleteFile({ id: this.filesList[i].id })
              .then(() => {
                this.content.splice(this.content.indexOf(this.filesList[i]), 1)
              })
              .catch(() => {})
          }
        })
        .then(() => {
          this.$message({ message: '删除成功。', type: 'success' })
        })
        .catch(() => {})
    },
    deleteRow(row) {
      this.$confirm('此操作将删除选中的文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          fileApi
            .deleteFile({ id: row.id })
            .then((response) => {
              this.content.splice(this.content.indexOf(row), 1)
              if (response.data.code == 0) {
                this.$message({ message: '删除成功。', type: 'success' })
              } else {
                this.$message({ message: '删除失败。', type: 'error' })
              }
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    rename(row) {
      // row.rename = true
      // console.log(this.content[this.content.indexOf(row)], row)
      this.content[this.content.indexOf(row)].rename = true
    },
    rename1(row) {
      console.log(row.name)
    },
    save(row) {
      if (row.name == '') {
        this.content.splice(this.content.indexOf(row), 1)
      } else {
        // let name = /[^\\/*?|<>:.]+/
        let name = new RegExp('[/\\/*?|<>:. ]')
        if (name.test(row.name)) {
          this.$message({ message: '文件夹命名不正确。', type: 'error' })
        } else {
          row.show = false
          let content = JSON.parse(JSON.stringify(this.data))
          content.name = row.name
          console.log(content)
          fileApi
            .newFolder(content)
            .then((response) => {
              if (response.data.code == 0) {
                this.$message({ message: '新建文件夹成功。', type: 'success' })
              } else {
                this.$message({ message: '新建文件夹失败。', type: 'error' })
              }
              this.initData()
            })
            .catch(() => {})
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    handlesuccess(response) {
      if (response.code == 0) {
        this.$message({ message: '上传成功。', type: 'success' })
      } else {
        this.$message({ message: '上传失败。', type: 'error' })
      }
      this.$refs.upload.clearFiles()
      this.initData()
    },
    remove() {
      this.$refs.upload.clearFiles()
    },
    getMember() {
      repositoryApi
        .getMember({ id: this.repoId })
        .then((response) => {
          this.members = response.data.data
          for (let i = 0; i < this.members.length; i++) {
            if (this.members[i].name == this.name) {
              this.type = this.members[i].type
              // this.type = 2
              break
            }
          }
        })
        .catch(() => {})
    },
    handleClick(targetName) {
      // this.targetName=targetName
      console.log(targetName)
      if (targetName.index == 1) {
        this.getMember()
      } else if (targetName.index == 2) {
        this.repositoryName = this.repoInfo.name
        this.repositoryDesc = this.repoInfo.desc
      }
    },
    addMember() {},
    saveData() {},
    deleteR() {
      this.$confirm('此操作将永久删除该仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          repositoryApi.deleteRepository({ id: this.repoId }).then((response) => {
            if (response.data.code == 0) {
              this.$message({ message: '删除仓库成功。', type: 'success' })
            } else {
              this.$message({ message: '删除仓库失败。', type: 'error' })
            }
          })
        })
        .catch(() => {})
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
    border-left: 1px solid #efeff0;
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
      background-color: #f7f7fa;
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
      background-color: #f7f7fa;
      overflow-y: auto;
      .save {
        width: 100%;
      }
      .delete {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
<style lang="scss">
.repository {
  .el-upload-list {
    display: none;
  }
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
  .upload-demo {
    margin: 0;
    display: inline-block;
  }
}
</style>
