<template>
  <div class="repositories">
    <div class="allin">
      <div class="allProject">
        <div class="project" v-for="nav in navList" :key="'nav' + nav.path">
          <router-link class="link" :to="nav.path">
            <p class="title">{{ nav.title }}</p>
            <p class="desc"></p>
            <p class="remark">
              <span>
                由"
                <i>{{ nav.name }}</i>
                "创建
              </span>
              <span>{{ nav.date }}</span>
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { Header, Aside } from './components'
export default {
  name: 'Repositories',
  components: {},
  data() {
    return {
      navList: [
        {
          path: '/repository/1',
          title: '项目一',
          name: '小张',
          date: '2021/2/21'
        },
        {
          path: '/repository/2',
          title: '项目二',
          name: '小李',
          date: '2021/2/21'
        },
        {
          path: '/repository/3',
          title: '项目三',
          name: '小丽',
          date: '2021/2/21'
        },
        {
          path: '/repository/4',
          title: '项目四',
          name: '小明',
          date: '2021/2/21'
        },
        {
          path: '/repository/5',
          title: '项目五',
          name: '小红',
          date: '2021/2/21'
        },
        {
          path: '/repository/6',
          title: '项目六',
          name: '小绿',
          date: '2021/2/21'
        }
      ]
    }
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
