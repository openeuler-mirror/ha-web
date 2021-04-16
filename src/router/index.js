import Vue from 'vue'
import Router from 'vue-router'
import CommonRouter from "./common";


Vue.use(Router)
let routes = [...CommonRouter];

const router = new Router({
  mode: "hash",
  routes: routes
});
// router.beforeEach((to, from, next) => {
//   // 如果有token 说明该用户已登陆 
//   if (localStorage.getItem('userLogin')) {
//     // 在已登陆的情况下访问登陆页会重定向到首页 
//     if (to.path === '/login') {
//       next({ path: '/' })
//     } else {
//       next({ path: to.path || '/' })
//     }
//   } else {
//     // 没有登陆则访问任何页面都重定向到登陆页 
//     if (to.path === '/login') {
//       next()
//     } else {
//       next(`/login?redirect=${to.path}`)
//     }
//   }
// })
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('userLogin')) { // 如果已经登录的话
    next();
  } else {
    if (to.path === '/login') { // 如果是登录页面的话，直接next()
      next();
    } else { // 否则 跳转到登录页面
      next({
        path: '/login'
      });
    }
  }
});

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;






