import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import ApiService from './services/api.service'
import {TokenService} from './services/storage.service'
import VueResource from 'vue-resource'
import VueSocketIO from 'vue-socket.io'
import {url} from './utils/config'
// Set the base URL of the API
ApiService.init(process.env.VUE_APP_ROOT_API);

// If token exists set header
if (TokenService.getToken()) {
    ApiService.setHeader()
}

Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(new VueSocketIO({
    debug: true,
    connection: url + '/video?Authorization=' + TokenService.getToken(),
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
}));
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
