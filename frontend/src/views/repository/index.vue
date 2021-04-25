<template>
  <div class="repository">
    <el-container style="height: 100%">
      <el-main>
        {{ url }}
        <el-row>
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="项目动态" name="MainFirst">
            <div>项目动态</div>
          </el-tab-pane>
          <el-tab-pane label="项目成员" name="MainSecond">
            <div>项目成员</div>
          </el-tab-pane>
          <el-tab-pane label="项目设置" name="MainThird">
            <div>项目设置</div>
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
      content: []
    }
  },
  watch: {
    $route: function () {
      this.url = this.$route.params.id
      // console.log(from, to)
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      this.isSearchLoading = true
      let contentData = [
        {
          id: 1,
          name: '1.xlsx',
          update_time: '2021-04-25 20:01:02',
          update_person: 'nancy',
          size: '25B'
        },
        { id: 2, name: '2.txt', update_time: '2021-04-25 20:02:02', update_person: 'nancy', size: '30B' },
        { id: 3, name: '3.docx', update_time: '2021-04-25 20:03:02', update_person: 'nancy', size: '50B' },
        { id: 4, name: '4', update_time: '2021-04-25 20:04:02', update_person: 'nancy' }
      ]
      for (let i = 0; i < contentData.length; i++) {
        let type = contentData[i].name.split('.')[contentData[i].name.split('.').length - 1].toLocaleLowerCase()
        let icon = ''
        if (contentData[i].name.split('.').length == 1) {
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

        contentData[i].icon = icon
      }
      this.content = contentData
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
    padding: 0 20px;
    border-left: 1px solid #e4e7ed;
  }
}
</style>
