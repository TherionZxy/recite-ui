import Vue from "vue";
import VueRouter from "vue-router";
// 首页
import Home from "../views/Home"
import Search from "../views/Search"
import Testing from "../views/Testing"
import Logs from "../views/Logs"
import Word from "../views/Word"
import Translate from '../views/Translate'
import Problem from '../views/Problem'

Vue.use(VueRouter);

const routes = [
  {path:"/", redirect:"/home"},
  {path:"/home", component:Home},
  {path:"/search", component:Search},
  {path:"/search/:word/", component:Word},
  {path:"/translate/:word", component:Translate},
  {path:"/problem", component: Problem},
  {path:"/testing", component:Testing},
  {path:"/logs", component:Logs}
];

const router = new VueRouter({
  routes
});

export default router;
