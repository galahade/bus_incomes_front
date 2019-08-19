<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="2">
          <b-nav vertical fill class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light">
            <b-nav-item><router-link to="/department">部门</router-link></b-nav-item>
            <b-nav-item><router-link to="/staff">员工</router-link></b-nav-item>
            <b-nav-item><router-link to="/asset">固定资产</router-link></b-nav-item>
          </b-nav>
        </b-col>
      <b-col sm="10">
        <router-view></router-view>
      </b-col>
    </b-row>
    </b-container>
  </div>
</template>

<script>
  import VueRouter from 'vue-router'
  import Department from './erp/Department.vue'
  import Staff from './erp/Staff.vue'
  import Asset from './erp/Asset.vue'



  const routes = [
    { path: '/department', component: Department },
    { path: '/staff', component: Staff },
    { path: '/asset', component: Asset },
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
