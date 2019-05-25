import Vue from "vue";
import 'vuetify/dist/vuetify.min.css'
import plugins from './plugins/index'
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("gameName", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.substring(6, 10);
});



const vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
window.vue = vue;
