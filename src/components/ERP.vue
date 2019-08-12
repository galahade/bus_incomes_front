<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="4">
          <b-nav vertical fill class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
            <b-nav-item><router-link to="/addDepartment">部门</router-link></b-nav-item>
          </b-nav>
        </b-col>
      <b-col sm="8">
        <router-view></router-view>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import Department from './erp/Department.vue'

  const routes = [
    { path: '/addDepartment', component: Department }
  ]

  const router = new VueRouter({
    routes // short for `routes: routes`
  })

  export default {
    name: 'ERP',
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
