import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import AppBreadcrumb from './components/AppBreadcrumd'
import './css/main.css'
import filters from './filters/'

// import dayjs from 'dayjs'
// Vue.filter('dataForMat',function(value) {
//   return dayjs(value).format('YYYY-MM-DD HH-mm-ss')
// })
Vue.use(filters)
Vue.component('AppBreadcrumb', AppBreadcrumb)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
