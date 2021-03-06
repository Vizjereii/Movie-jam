import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import router from './router'
import store from './store'

Vue.config.productionTip = false;

Vue.use(Vuetify, {
  iconfont: "md"
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
