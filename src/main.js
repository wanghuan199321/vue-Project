import Vue from 'vue'
import App from './App.vue'
import '@/components/register.js'
import '@/style/index.less'
import axios from 'axios'
import * as api from '@/request'
import VueLoading from 'vue-loading-template'
import router from './router'

Vue.use(VueLoading)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
