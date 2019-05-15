<template>
  <div>
    <div class="row">
      <div class="col-sm">
        <h3>{{ msg }}</h3>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button v-on:click="goBack">Back</button>
      </div>
    </div>
    <div class="row align-items-start">
      <b-nav tabs>
        <b-nav-item active>Active</b-nav-item>
        <b-nav-item>Link</b-nav-item>
        <b-nav-item>Another Link</b-nav-item>
        <b-nav-item disabled>Disabled</b-nav-item>
      </b-nav>
      <div class="col">
        <!-- use router-link component for navigation. -->
        <!-- specify the link by passing the `to` prop. -->
        <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
        <router-link to="/vueHome">Vue 主页</router-link>
      </div>
      <div class="col">
        <router-link to="/showComparedMonthlyIncomes">计算月度收入</router-link>
      </div>
      <div class="col">
        <router-link to="/addIncomes">增加月度新收入</router-link>
      </div>
    </div>
    <div class="row">
        <div class="col">
          <!-- route outlet -->
          <!-- component matched by the route will render here -->
          <router-view></router-view>
        </div>
      </div>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import VueHome from './VueHome.vue'
  import SCMI from './ShowComparedMonthlyIncomes.vue'
  import IncomesForm from './IncomesForm.vue'

  const routes = [
    { path: '/vueHome', component: VueHome },
    { path: '/showComparedMonthlyIncomes', component: SCMI},
    { path: '/addIncomes', component: IncomesForm }
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