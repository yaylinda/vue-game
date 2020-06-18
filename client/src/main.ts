import Vue from 'vue';
import VueCookies from 'vue-cookies';
import Toast from "vue-toastification";
import { firestorePlugin } from 'vuefire';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'
import "vue-toastification/dist/index.css";

import App from './App.vue';
import router from './router'
import vuetify from './plugins/vuetify';

Vue.use(VueCookies);
Vue.use(Toast);
Vue.use(firestorePlugin);
Vue.use(VueLodash, { lodash: lodash });

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
