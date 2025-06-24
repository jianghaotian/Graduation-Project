<template>
  <div class="repositories">
    <div class="allin">
      <div class="allProject">
        <p class="allProject-title">我创建的仓库</p>
        <div class="project" v-for="nav in ownList" :key="'nav' + nav.id">
          <router-link class="link" :to="'/repository/' + nav.id">
            <p class="title">{{ nav.name }}</p>
            <p class="desc"></p>
            <p class="remark">
              <span>
                <!-- 由"
                <i>{{ nav.user }}</i>
                "创建 -->
              </span>
              <span>{{ $moment(nav.create_time).format('YYYY-DD-MM HH:mm:ss') }}</span>
            </p>
          </router-link>
        </div>
        <p class="allProject-title">加入的仓库</p>
        <div class="project" v-for="nav in otherList" :key="'nav' + nav.id">
          <router-link class="link" :to="'/repository/' + nav.id">
            <p class="title">{{ nav.name }}</p>
            <p class="desc"></p>
            <p class="remark">
              <span>
                <!-- 由"
                <i>{{ nav.user }}</i>
                "创建 -->
              </span>
              <span>{{ $moment(nav.create_time).format('YYYY-DD-MM HH:mm:ss') }}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import api from '@/api/repository'

export default {
  name: 'Repositories',
  components: {},
  data() {
    return {
      ownList: [],
      otherList: []
    }
  },
  mounted() {
    api.getRepoList({ all: 1 }).then((res) => {
      this.ownList = res.data.data.own
      this.otherList = res.data.data.other
    })
  }
}
</script>

<style scoped lang="scss">
.repositories {
  height: calc(100vh - 48px);
  width: calc(100vw - 220px);
  background: #ffffff;
  display: flex;
  flex: 1;
  flex-direction: row;
  padding: 30px 30px 0;
  overflow-y: auto;
  .allin {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .allProject {
      .allProject-title {
        font-weight: 600;
      }
      .project {
        display: inline-block;
        position: relative;
        width: 300px;
        height: 127px;
        background: #f7f7fa;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        margin: 0 20px 20px 0;
        &:hover {
          background-image: linear-gradient(#409eff, #ecf5ff);
          color: #1890ff;
        }
        .link {
          text-decoration: none;
          background-color: transparent;
          outline: none;
          cursor: pointer;
          -webkit-transition: color 0.3s;
          transition: color 0.3s;
          -webkit-text-decoration-skip: objects;
          .title {
            padding: 0 22px;
            color: #666;
            line-height: 40px;
            font-size: 14px;
            font-weight: 700;
            width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin: 0;
          }
          .desc {
            color: #666;
            font-size: 12px;
            padding: 0 22px;
            height: 40px;
            overflow: hidden;
            margin: 0;
          }
          .remark {
            margin-top: 13px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #666;
            line-height: 20px;
            padding: 0 19px 0 22px;
          }
        }
      }
    }
  }
}
</style>
