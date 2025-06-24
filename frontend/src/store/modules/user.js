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
  // 初始化token
  initToken({ commit }) {
    const token = window.localStorage.getItem('token')
    commit('SET_TOKEN', token)
  },

  // 添加token
  setToken({ commit }, token) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', token)
      window.localStorage.setItem('token', token)
      resolve()
    })
  },

  // 删除token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_USER', {})
      window.localStorage.removeItem('token')
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
