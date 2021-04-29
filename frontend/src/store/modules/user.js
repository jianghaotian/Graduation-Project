// import { login, getInfo, logout } from '@/api/user'
// import { resetRouter } from '@/router'

// const state = {
//   token: 'eyJhbGciOiJIUzUxMiJ9.eyJjcmVhdGVkIjoxNjE0MDQ0NDYyNjXq-oRlbKbYjTFk1a6Z3UZWi31LtoZcPUL5GAvMwsYknUltxg',
//   userinfo: { accountCode: '10001', cityName: '兰州', accountName: '高*', accountBandPhone: '18999999999' }
// }
const state = {
  token: '',
  userinfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, userinfo) => {
    state.userinfo = userinfo
  }
}

const actions = {
  // 登录
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password })
  //       .then((response) => {
  //         const { data } = response
  //         if (data.token === null) {
  //           reject('登录失败')
  //         } else {
  //           commit('SET_TOKEN', data.token)
  //           resolve()
  //         }
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },

  // 获取用户信息
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token)
  //       .then((response) => {
  //         const { data } = response

  //         if (!data) {
  //           reject('Verification failed, please Login again.')
  //         }

  //         const { userDetailInfo, roles } = data

  //         // roles must be a non-empty array
  //         if (!roles || roles.length <= 0) {
  //           reject('getInfo: roles must be a non-null array!')
  //         }
  //         commit('SET_ROLES', roles)
  //         commit('SET_USER', userDetailInfo)
  //         resolve(data)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },

  // 退出登录
  // eslint-disable-next-line no-unused-vars
  // logout({ commit, state, dispatch }) {
  //   return new Promise((resolve, reject) => {
  //     /* commit('SET_TOKEN', '')
  //     commit('SET_ROLES', [])
  //     removeToken()
  //     resetRouter()
  //     // dispatch('tagsView/delAllViews', null, { root: true })

  //     resolve()*/
  //     // console.log(1)
  //     logout(state.token)
  //       .then(() => {
  //         commit('SET_TOKEN', '')
  //         commit('SET_ROLES', [])
  //         resetRouter()

  //         // reset visited views and cached views
  //         // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
  //         // dispatch('tagsView/delAllViews', null, { root: true })

  //         resolve()
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },

  // 删除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      commit('SET_USER', {})
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
