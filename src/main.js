// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import './iconfont/iconfont.css'
require('../mock');


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
        'zh': require('@/lang/zh.json'),
        'en': require('@/lang/en.json')
    },
    silentTranslationWarn: true
});
// 最后缓存当前使用的语言
localStorage.setItem('language',lang);   



window._vm = new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');

