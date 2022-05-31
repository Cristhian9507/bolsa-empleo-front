import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import axios from 'axios'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'

Vue.config.productionTip = false
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
axios.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token'
axios.defaults.baseURL = process.env.VUE_APP_API_URL
const token = localStorage.getItem('token')
if (token && token !== '') {
  axios.defaults.headers.common.authorization = `Bearer ${token}`
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
