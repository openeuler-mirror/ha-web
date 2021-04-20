// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
import axios from 'axios';
import './assets/icon/iconfont.css'
import './assets/element/index.css' //更改element ui的主题颜色
require('../mock');
Vue.use(VueSidebarMenu)
Vue.use(ElementUI)

Vue.config.productionTip = false

axios.get('/static/config.json').then(res => {
  const config = res.data
  if (config && config.api_base_url) {
    Vue.prototype.api_base_url = config.api_base_url
    new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  } else {
    console.log('load api base url error')
  }
}).catch(err => {
  console.log(err)
  console.log('load api base url error')
})
