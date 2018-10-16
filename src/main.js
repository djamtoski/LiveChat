import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import RequestService from './services/request-service'
import ChatService from './services/chat-service'

Vue.config.productionTip = false;
// Global chat service
Vue.prototype.$chat = new ChatService(RequestService.apiUrl);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
