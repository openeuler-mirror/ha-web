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

// 自动设置多语言 默认选择浏览器系统语言
const navLang  = navigator.language;
// 判断当前浏览器使用的语言
const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
// 如果有缓存，取缓存的语言
let lang  = localStorage.getItem('language') || localLang || 'en-US';

const i18n = new VueI18n({
    locale: lang,
    messages:{
        'zh': require('@/assets/i18n/zh.json'),
        'en': require('@/assets/i18n/en.json')
    },
    silentTranslationWarn: true
});
// 最后缓存当前使用的语言
localStorage.setItem('language',lang);   


axios.get('/static/config.json').then(res => {
  const config = res.data
  if (config && config.api_base_url) {
    Vue.prototype.api_base_url = config.api_base_url
    window._vm = new Vue({
      store,
      router,
      i18n,
      render: h => h(App)
    }).$mount('#app');
  } else {
    console.log('load api base url error')
  }
}).catch(err => {
  console.log('load api base url error')
})
