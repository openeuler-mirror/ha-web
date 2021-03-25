import Vue from 'vue'
import Router from 'vue-router'
import CommonRouter from "./common";


Vue.use(Router)
let routes = [...CommonRouter];

const router = new Router({
  mode: "hash",
  routes: routes
}); 

const VueRouterPush = Router.prototype.push;
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}

export default router;






