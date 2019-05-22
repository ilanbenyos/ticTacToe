import Vue from "vue";
import Router from "vue-router";
import BackApp from "./views/BackApp.vue";
import FrontApp from "./views/FrontApp.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/front-app",
      name: "FrontApp",
      component: FrontApp
    },
      {
      path: "/back-app",
      name: "BackApp",
      component: BackApp
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
