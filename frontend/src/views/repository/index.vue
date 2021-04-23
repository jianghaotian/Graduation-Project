<template>
  <div class="repository">
    <div>1</div>
    <div class="rightTab">
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
    </div>
  </div>
</template>

<script>
// import { Header, Aside } from './components'

export default {
  name: 'Repository',
  components: {},
  data() {
    return {
      activeName: 'MainFirst'
    }
  }
}
</script>

<style scoped lang="scss">
.repository {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  .rightTab {
    width: 290px;
    padding: 0 20px;
    border-left: 1px solid #e4e7ed;
  }
}
</style>
