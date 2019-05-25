import Vue from "vue";
import axiosPlugin from "./axiosPlugin";
import VeeValidate from "vee-validate";

import Vuetify from "vuetify";
import store from "../store";
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);

const VueScrollTo = require("vue-scrollto");

Vue.use(VueScrollTo);
Vue.use(Vuetify);
Vue.use(axiosPlugin);
Vue.use(VeeValidate, {
  inject: false
});
Vue.prototype.$loading = bool => {
  store.commit("setLoading", bool);
};


export default {};
