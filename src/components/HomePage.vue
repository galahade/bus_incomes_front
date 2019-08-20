<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <h3>{{ msg }}</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <button v-on:click="goBack">Back</button>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-nav tabs align="center">
          <b-nav-item><router-link to="/showComparedMonthlyIncomes">月收入统计</router-link></b-nav-item>
          <b-nav-item><router-link to="/addIncomes">增加月度收入</router-link></b-nav-item>
          <b-nav-item><router-link to="/erp">erp</router-link></b-nav-item>
       </b-nav>
     </b-col>
   </b-row>
   <b-row>
     <b-col>
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
        <router-view></router-view>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import VueRouter from 'vue-router'
  import VueHome from './VueHome.vue'
  import SCMI from './ShowComparedMonthlyIncomes.vue'
  import IncomesForm from './IncomesForm.vue'
  import ERP from './ERP.vue'

  const routes = [
    { path: '/vueHome', component: VueHome },
    { path: '/showComparedMonthlyIncomes', component: SCMI},
    { path: '/addIncomes', component: IncomesForm },
    { path: '/erp', component: ERP }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })

  export default {
    name: 'HomePage',
    router,
    props: {
      msg: String
    },
    methods: {
      goBack () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    }
  }
</script>
