<template>
  <div class="container">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="post" class="Chart__list">
      <div class="Chart">
        <h2>{{ currentMonth }}得分排名（从低到高）</h2>
        <line-example :chart-data="scoresCollection"></line-example>
        <h2>{{ currentMonth }}与{{ lastMonth }}线路收入对比图</h2>
        <bar-example :chart-data="lineIncomeCollection"></bar-example>
        <h2>{{ currentMonth }}与{{ lastMonth }}线路人均收入对比图</h2>
        <bar-example :chart-data="attendanceIncomeCollection"></bar-example>
        <h2>{{ currentMonth }}较{{ lastMonth }}收入增长率图</h2>
        <line-example :chart-data="lineDiffRateCollection"></line-example>
        <h2>{{ currentMonth }}较{{ lastMonth }}人均收入增长率图</h2>
        <line-example :chart-data="attendanceDiffRateCollection"></line-example>
      </div>
    </div>
  </div>
</template>

<script>
import BarExample from './BarChart.js'
import LineExample from './LineChart.js'

import axios from 'axios'

//import moment from 'moment'

export default {
  name: 'app',
  components: {
    BarExample,
    LineExample
  },
  data () {
    return {
      loading: false,
      error: null,
      post: null,
      currentIncomes: null,
      lastIncomes: null,
      lines: null,
      currentMonth: null,
      lastMonth:null,
      lineIncomeCollection: {},
      currentLinesIncomes: null,
      lastLinesIncomes: null,
      LineDiffRates: [],
      lineDiffRateCollection: {},
      attendanceIncomeCollection: {},
      currentMonthAttendanceIncomes: [],
      lastMonthAttendanceIncomes: [],
      attendanceDiffRateCollection: {},
      attendanceDiffRates: [],
      scores: [],
      scoresCollection: {},
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      this.error = this.post = null
      this.loading = true
      axios
        .get('/monthIncomesCompare/2019/04')
        .then(response => {
        this.loading = false
        this.twoMonthIncomes = response.data.two_month_incomes
        this.currentIncomes = this.twoMonthIncomes.map(a => a.final_total_income)
        this.lastIncomes = this.twoMonthIncomes.map(a => a.previous_total_income)
        this.currentMonthAttendanceIncomes = this.twoMonthIncomes.map(a => a.final_average_income)
        this.lastMonthAttendanceIncomes = this.twoMonthIncomes.map(a => a.previous_average_income)
        this.lines = this.twoMonthIncomes.map(a => a.line_no)
        this.currentMonth = response.data.final_month
        this.lastMonth = response.data.previous_month
        this.LineDiffRates = this.twoMonthIncomes.map(a => a.total_growth_rate)
        this.attendanceDiffRates = this.twoMonthIncomes.map(a => a.average_growth_rate)
        this.scores = this.twoMonthIncomes.map(a => a.score)

        //total scores
        this.scoresCollection = {
          labels: this.lines,
          datasets: [
            {
              label: '月度总得分',
              //backgroundColor: '#f87979',
              data: this.scores
            }
          ]
        }
        // total income
        this.lineIncomeCollection = {
          labels: this.lines,
          datasets: [
            {
              label: this.currentMonth,
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              backgroundColor: '#f87979',
              borderWidth: 1,
              pointBorderColor: 'white',
              data: this.currentIncomes
            },{
              label: this.lastMonth,
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              backgroundColor: '#5bf8bf',
              pointBorderColor: 'white',
              borderWidth: 1,
              data: this.lastIncomes
            }
          ]
        }

        //Attendance compare collection
        this.attendanceIncomeCollection = {
          labels: this.lines,
          datasets: [
            {
              label: this.currentMonth,
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              backgroundColor: '#f87979',
              borderWidth: 1,
              pointBorderColor: 'white',
              data: this.currentMonthAttendanceIncomes
            },{
              label: this.lastMonth,
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              backgroundColor: '#5bf8bf',
              pointBorderColor: 'white',
              borderWidth: 1,
              data: this.lastMonthAttendanceIncomes
            }
          ]
        }
        //Line income diff rate collection
        this.lineDiffRateCollection = {
          labels: this.lines,
          datasets: [
            {
              label: '增长率（负数为减少）',
              //backgroundColor: '#f87979',
              data: this.LineDiffRates
            }
          ]
        }
        //Attendance income diff rate collection
        this.attendanceDiffRateCollection = {
          labels: this.lines,
          datasets: [
            {
              label: '增长率（负数为减少）',
              //backgroundColor: '#f87979',
              data: this.attendanceDiffRates
            }
          ]
        }
        this.post = response
      }).catch(error => this.error = error.toString())
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container {
  max-width: 800px;
  margin:  0 auto;
}
</style>
