import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueCookies from 'vue-cookies';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

Vue.use(VueCookies);
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
