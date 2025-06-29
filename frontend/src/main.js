import Vue from 'vue'

import 'normalize.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'
import '@/assets/iconfont/iconfont.js'
import moment from 'moment' //导入文件

Vue.prototype.$moment = moment //赋值使用
Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
