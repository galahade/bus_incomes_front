import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import BootstrapVue from 'bootstrap-vue'
import VueMoment from 'vue-moment'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueMoment)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(VueRouter)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
