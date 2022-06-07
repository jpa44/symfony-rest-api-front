import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store';
import axios from 'axios';

//axios.defaults.baseURL = 'https://fathomless-retreat-31414.herokuapp.com/api/';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/';

Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
