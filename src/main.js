import Vue from 'vue'
import App from './App.vue'
import store from './store'

import 'animate.css'

import './assets/css/bootstrap.css'
import './assets/css/style.css'
import router from './router'

import { mapActions} from 'vuex'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
  methods: {
    ...mapActions(['loadLanguagesCategoriesAction'])
  },
  async mounted() {
    // this.loadLanguagesCategoriesAction()
  },
}).$mount('#app')
