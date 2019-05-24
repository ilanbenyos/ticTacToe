import Vue from "vue";
import store from './store.js';

import Router from "vue-router";
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import Games from "./views/Games.vue";

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: "/game/:gameId",
      name: "game",
      component: Game,
      props: true,
      meta: {
        auth: true
      }
    },
    {
      path: "/games",
      name: "games",
      component: Games,
      meta: {
        auth: true
      }
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters['user/isLogged']) {
    next({name:'home'});
  } else {
    next();
  }
});

export default router

