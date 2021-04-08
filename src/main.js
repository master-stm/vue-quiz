import Vue from 'vue'
import App from './App.vue'
// import Results from './components/Results.vue'
import Admin from './admin/Admin.vue'
import store from './store'
import VueRouter from 'vue-router'

import './assets/css/bootstrap.css'
import './assets/css/style.css'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/' , component: App },
    // { path: '/results', name: 'results', component: Results },
    { path: '/admin', name: 'admin', component: Admin }
  ]
});

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
