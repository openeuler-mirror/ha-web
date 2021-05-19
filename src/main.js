// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import axios from 'axios';
import './assets/icon/iconfont.css'
import './assets/element/index.css'
import store from './components/VueX/store'
// require('../mock');
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
Vue.use(ElementUI)

Vue.config.productionTip = false
const i18n = new VueI18n({

  locale: 'zh', // 定义默认语言为中文 

  messages: {

    'zh': require('@/assets/i18n/zh.json'),

    'en': require('@/assets/i18n/en.json')

  }

});


axios.get('/static/config.json').then(res => {
  const config = res.data
  if (config && config.api_base_url) {
    Vue.prototype.api_base_url = config.api_base_url
    new Vue({
      el: '#app',
      store,
      router,
      i18n,
      components: { App },
      template: '<App/>'
    })
  } else {
    console.log('load api base url error')
  }
}).catch(err => {
  console.log('load api base url error')
})
