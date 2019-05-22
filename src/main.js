import Vue from "vue";
import 'vuetify/dist/vuetify.min.css'
import plugins from './plugins/index'
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;




const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
window.vue = vue;
