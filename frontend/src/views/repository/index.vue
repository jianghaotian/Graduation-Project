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
            v-show="type == 0 || type == 1 || type == 2"
          >
            <el-button size="mini" icon="el-icon-upload" style="margin-right: 10px">上传</el-button>
          </el-upload>
          <!-- <el-button size="mini" icon="el-icon-download" style="margin-right: 10px">下载</el-button> -->
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
          <router-link :to="'/repository/' + repoId"> 仓库根目录 </router-link>
          <div style="display: inline-block">
            <span v-for="path in folderPath" :key="'path_' + path.id">
              >
              <router-link :to="'/repository/' + repoId + '/' + path.id">
                {{ path.name }}
              </router-link>
            </span>
            <!-- <router-link :to="backRoute"> 返回上一级 </router-link> -->
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
            class="table1"
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
                  :to="'/repository/' + repoId + '/' + scope.row.uid"
                  v-show="!scope.row.show && !scope.row.rename && scope.row.icon == '#icon-file-b-2'"
                  >{{ scope.row.name }}
                </router-link>
                <!-- <span v-show="!scope.row.show && scope.row.icon == '#icon-file-b-2'" @click="a(scope.row.folder_id)">{{
                  scope.row.name
                }}</span> -->
                <span v-show="!scope.row.show && !scope.row.rename && scope.row.icon != '#icon-file-b-2'">{{
                  scope.row.name
                }}</span>
                <!-- </div> -->
                <el-dropdown
                  @command="createView"
                  class="pointerIcon"
                  trigger="click"
                  v-show="scope.row.icon != '#icon-file-b-2' || type != 3"
                >
                  <i v-show="showClickIcon == true && scope.row.id == rowid" class="el-icon-more"></i>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="下载" v-show="scope.row.icon != '#icon-file-b-2'">
                      <a :href="'/api/v1/file/download/' + scope.row.uid + '?jwtToken=' + $store.getters.token" download
                        >下载</a
                      >
                    </el-dropdown-item>
                    <el-dropdown-item
                      @click.native="deleteRow(scope.row)"
                      command="删除"
                      v-show="type == 0 || type == 1"
                      >删除</el-dropdown-item
                    >
                    <el-dropdown-item @click.native="rename(scope.row)" v-show="type != 3" command="重命名"
                      >重命名</el-dropdown-item
                    >
                    <el-dropdown-item
                      @click.native="fileHistory(scope.row.id)"
                      v-show="scope.row.icon != '#icon-file-b-2'"
                      command="操作历史"
                      >操作历史</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </template>
            </el-table-column>
            <el-table-column min-width="2" prop="update_time" label="修改时间">
              <template slot-scope="scope">
                <span>{{ $moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss') }}</span>
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
              <!-- <div v-for="time in operationsHistory" :key="time.id">
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
              </div> -->
              <div v-for="item in operationsHistory" :key="item.id" class="box-card">
                <el-avatar :size="32" src="https://empty">
                  <img src="@/assets/images/default-user.png" />
                </el-avatar>
                <span class="name">{{ item.user }}</span>
                <span class="time">{{ $moment(item.time).format('YYYY-MM-DD HH:mm:ss') }}</span>
                <a
                  class="operations"
                  :href="'/api/v1/file/download/' + item.file_uid + '?jwtToken=' + $store.getters.token"
                  download
                >
                  <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.icon"></use>
                  </svg>
                  <span>{{ item.type }} {{ item.file_name }}</span>
                </a>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="项目成员" name="MainSecond" style="height: 100%">
            <div class="members">
              <el-row v-show="type == 0 || type == 1">邀请成员加入</el-row>
              <div style="margin: 10px 0" v-show="type == 0 || type == 1">
                <!-- <el-input placeholder="请输入用户id" size="mini" style="width: 170px; margin-right: 5px"></el-input> -->
                <el-select
                  v-model="value"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入用户名"
                  :remote-method="remoteMethod"
                  :loading="loading"
                  size="mini"
                  style="width: 100%"
                  clearable
                >
                  <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
                </el-select>
                <el-row style="margin-top: 10px; margin-bottom: 10px">
                  <span style="line-height: 28px">成员权限</span>
                  <el-select size="mini" style="width: 70%; float: right" v-model="radio" placeholder="请选择">
                    <el-option v-for="item in types" :key="item.id" :label="item.type" :value="item.id"> </el-option>
                  </el-select>
                </el-row>
                <!-- <el-radio v-model="radio" label="1">maintainer</el-radio>
                <el-radio v-model="radio" label="2">developer</el-radio>
                <el-radio v-model="radio" label="3">reporter</el-radio> -->
                <el-button style="width: 100%" @click="addMember" type="primary" size="mini"> 添加 </el-button>
              </div>
              <el-row style="padding-bottom: 10px">成员列表({{ members.length }})</el-row>
              <div v-for="item in members" :key="item.id" class="card" @click="showFalse(item)">
                <el-avatar :size="32" src="https://empty">
                  <img src="@/assets/images/default-user.png" />
                </el-avatar>
                <span class="memberName">{{ item.name }}</span>
                <el-row class="status">
                  <span v-show="item.name == name" class="my">本人</span>
                  <span v-show="item.show || item.type == 0 || item.name == name || type == 2 || type == 3">{{
                    item.status
                  }}</span>
                  <el-select
                    v-show="!item.show && item.type != 0 && item.name != name && (type == 0 || type == 1)"
                    size="mini"
                    style="width: 50%; height: 15px"
                    v-model="changeStatus"
                    placeholder="请选择"
                    id="changeStatus"
                    @change="memberType(item)"
                  >
                    <el-option v-for="item in types" :key="item.id" :label="item.type" :value="item.id"> </el-option>
                  </el-select>
                  <i
                    v-show="!item.show && item.type != 0 && item.name != name && (type == 0 || type == 1)"
                    class="el-icon-delete"
                    @click="deleteMember(item)"
                  ></i>
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
    <el-dialog :title="'文件操作历史'" :visible.sync="showHistory" :close-on-click-modal="false">
      <el-table ref="table" v-loading="historyLoading" :data="fileHistoryList" style="width: 100%">
        <el-table-column min-width="2" prop="name" label="文件名" style="align-items: center">
          <template slot-scope="scope">
            <!-- <div style="display: inline-block" @click="getFloder(scope.row.folder_id)"> -->
            <svg class="icon" aria-hidden="true">
              <use :xlink:href="scope.row.icon"></use>
            </svg>
            <span>{{ scope.row.file_name }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="1" prop="type" label="操作類型"></el-table-column>
        <el-table-column min-width="2" prop="time" label="修改时间">
          <template slot-scope="scope">
            <span>{{ $moment(scope.row.time).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="1" prop="user" label="修改人" />
        <el-table-column min-width="1" prop="size" label="操作">
          <template slot-scope="scope">
            <a :href="'/api/v1/file/download/' + scope.row.file_uid + '?jwtToken=' + $store.getters.token" download
              >下载</a
            >
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showHistory = false"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { Header, Aside } from './components'
import fileApi from '@/api/file'
import userApi from '@/api/user'
import repositoryApi from '@/api/repository'
import historyApi from '@/api/history'
import refresh from '@/utils/refresh'
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
      folderPath: [],
      options: [],
      loading: false,
      value: '',
      radio: '',
      fileHistoryList: [],
      showHistory: false,
      historyLoading: false,
      types: [
        { id: 1, type: 'maintainer' },
        { id: 2, type: 'developer' },
        { id: 3, type: 'reporter' }
      ],
      changeStatus: '',
      list: []
    }
  },
  watch: {
    $route: function (to, from) {
      console.log(to, from, this.$route.params)
      this.repoId = this.$route.params.id
      this.data = { repo_id: this.repoId }
      if (this.$route.params.folderId || this.$route.params.folderId != undefined) {
        this.folderId = this.$route.params.folderId
        this.data = { repo_id: this.repoId, folder_id: this.folderId }
        fileApi.folderPath({ folder_id: this.folderId }).then((res) => {
          this.folderPath = res.data.data.list
        })
      } else {
        this.folderPath = []
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
      fileApi.folderPath({ folder_id: this.folderId }).then((res) => {
        this.folderPath = res.data.data.list
      })
    }
    this.initData()
  },
  methods: {
    showFalse(item) {
      this.members[this.members.indexOf(item)].show = false
      let old = Object.assign([], this.members)
      this.members = old
      this.changeStatus = item.status
    },
    memberType(item) {
      if (item.type == this.changeStatus) {
        this.members[this.members.indexOf(item)].show = true
        let old = Object.assign([], this.members)
        this.members = old
      } else {
        repositoryApi.memberType({ repo_id: this.repoId, user_id: item.id, type: this.changeStatus }).then((res) => {
          if (res.data.code == 0) {
            this.$message({ message: '修改成功。', type: 'success' })
            this.getMember()
          } else {
            this.$message({ message: '修改失败。', type: 'error' })
          }
        })
      }
    },
    deleteMember(item) {
      this.$confirm('此操作将会把该成员移出仓库, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          repositoryApi.deleteMember({ repo_id: this.repoId, user_id: item.id }).then((res) => {
            if (res.data.code == 0) {
              this.$message({ message: '移出成功。', type: 'success' })
              this.getMember()
            } else {
              this.$message({ message: '移出失败。', type: 'error' })
            }
          })
        })
        .then(() => {})
        .catch(() => {})
    },
    initData() {
      this.isSearchLoading = true
      this.getFileList()
      repositoryApi.getRepoInfo({ id: this.repoId }).then((res) => {
        this.repoInfo = res.data.data
        this.getMember()
        this.getHistory()
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
        case 'jpg':
          icon = '#icon-file-b-5'
          break
        case 'png':
          icon = '#icon-file-b-5'
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
          this.getHistory()
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
                this.getHistory()
              } else {
                this.$message({ message: '删除失败。', type: 'error' })
              }
            })
            .catch(() => {})
        })
        .catch(() => {})
    },
    rename(row) {
      row.rename = true
      // console.log(this.content[this.content.indexOf(row)], row)
      // this.content[this.content.indexOf(row)].rename = true
    },
    rename1(row) {
      row.rename = false
      fileApi
        .rename({ id: row.id, name: row.name })
        .then((response) => {
          if (response.data.code == 0) {
            this.$message({ message: '重命名成功。', type: 'success' })
            this.getHistory()
          } else {
            this.$message({ message: '重命名失败。', type: 'error' })
          }
          this.initData()
        })
        .catch(() => {})
    },
    fileHistory(fileId) {
      this.showHistory = true
      this.historyLoading = true
      historyApi.historyList({ repo_id: this.repoId, file_id: fileId }).then((response) => {
        this.fileHistoryList = response.data.data.list
        for (let i = 0; i < this.fileHistoryList.length; i++) {
          this.fileHistoryList[i].icon = this.fileType(this.fileHistoryList[i].file_name)
          if (this.fileHistoryList[i].type == 'new') {
            this.fileHistoryList[i].type = '新建'
          } else if (this.fileHistoryList[i].type == 'rename') {
            this.fileHistoryList[i].type = '重命名'
          } else if (this.fileHistoryList[i].type == 'delete') {
            this.fileHistoryList[i].type = '刪除'
          } else if (this.fileHistoryList[i].type == 'version') {
            this.fileHistoryList[i].type = '更新'
          }
        }
        this.historyLoading = false
      })
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
                this.getHistory()
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
        this.getHistory()
      } else {
        this.$message({ message: '上传失败。', type: 'error' })
      }
      this.$refs.upload.clearFiles()
      this.initData()
    },
    remove() {
      this.$refs.upload.clearFiles()
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true
        userApi.userList({ username: query }).then((response) => {
          this.loading = false
          this.options = response.data.data
        })
      } else {
        this.options = []
      }
    },
    getMember() {
      repositoryApi
        .getMember({ id: this.repoId })
        .then((response) => {
          this.members = response.data.data
          for (let i = 0; i < this.members.length; i++) {
            this.members[i].show = true
            if (this.members[i].type == 0) {
              this.members[i].status = 'owner'
            } else if (this.members[i].type == 1) {
              this.members[i].status = 'maintainer'
            } else if (this.members[i].type == 2) {
              this.members[i].status = 'developer'
            } else {
              this.members[i].status = 'reporter'
            }
            if (this.members[i].name == this.name) {
              this.type = this.members[i].type
            }
          }
        })
        .catch(() => {})
    },
    getHistory() {
      historyApi.historyList({ repo_id: this.repoId }).then((response) => {
        this.operationsHistory = response.data.data.list.reverse()
        for (let i = 0; i < this.operationsHistory.length; i++) {
          this.operationsHistory[i].icon = this.fileType(this.operationsHistory[i].file_name)
          if (this.operationsHistory[i].type == 'new') {
            this.operationsHistory[i].type = '新建'
          } else if (this.operationsHistory[i].type == 'rename') {
            this.operationsHistory[i].type = '重命名'
          } else if (this.operationsHistory[i].type == 'delete') {
            this.operationsHistory[i].type = '刪除'
          } else if (this.operationsHistory[i].type == 'version') {
            this.operationsHistory[i].type = '更新'
          }
        }
      })
    },
    handleClick(targetName) {
      // this.targetName=targetName
      console.log(targetName)
      if (targetName.index == 1) {
        this.getMember()
      } else if (targetName.index == 2) {
        this.repositoryName = this.repoInfo.name
        this.repositoryDesc = this.repoInfo.desc
      } else {
        this.getHistory()
      }
    },
    addMember() {
      // console.log(this.radio, this.value)
      if (!this.value) {
        this.$message({ message: '加入成员为空。', type: 'warning' })
      }
      if (!this.radio) {
        this.$message({ message: '未选择成员权限。', type: 'warning' })
      }
      if (this.value && this.radio) {
        repositoryApi
          .addMember({ repo_id: this.repoId, user_id: Number(this.value), type: Number(this.radio) })
          .then((response) => {
            if (response.data.code == 0) {
              this.$message({ message: '添加成功。', type: 'success' })
              this.getMember()
            } else {
              this.$message({ message: '添加失败。', type: 'error' })
            }
          })
      }
    },
    saveData() {
      console.log(this.repositoryName, this.repositoryDesc)
      repositoryApi
        .reviseInfo({ id: this.repoId, name: this.repositoryName, desc: this.repositoryDesc })
        .then((response) => {
          if (response.data.code == 0) {
            this.$message({ message: '修改成功。', type: 'success' })
            refresh.$emit('refresh', true)
          } else {
            this.$message({ message: '修改失败。', type: 'error' })
          }
        })
    },
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
              this.$router.push('/')
              refresh.$emit('refresh', true)
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
      // .date {
      //   width: 100%;
      //   display: flex;
      //   justify-content: center;
      // }
      .box-card {
        width: 100%;
        position: relative;
        font-size: 12px;
        margin-bottom: 10px;
        height: 70px;
        .name {
          position: absolute;
          top: 5px;
          left: 35px;
        }
        .operations {
          position: absolute;
          top: 20px;
          left: 35px;
          display: inline-block;
          width: 85%;
          height: 50px;
          background-color: #fff;
          // padding: 10px;
          svg {
            margin: 10px;
          }
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
  .pointerIcon {
    transform: rotate(90deg);
    float: right;
    line-height: 28px;
  }
  .upload-demo {
    margin: 0;
    display: inline-block;
  }
  .table1 {
    .el-input {
      width: 80%;
    }
  }
  .members {
    .el-radio {
      margin-right: 10px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .el-radio__label {
      padding-left: 0;
    }
  }
  .status {
    .el-input--mini .el-input__inner {
      height: 20px;
      line-height: 20px;
    }
    .el-input__prefix,
    .el-input__suffix {
      height: 25px;
    }
  }
}
</style>
