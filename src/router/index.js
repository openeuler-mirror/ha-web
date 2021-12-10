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
//   if (localStorage.getItem('userLogin')) { // 如果已经登录的话
//     next();
//   } else {
//     if (to.path === '/login') { // 如果是登录页面的话，直接next()
//       next();
//     } else { // 否则 跳转到登录页面
//       next({
//         path: '/login'
//       });
//     }
//   }
// });

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

export default router;






