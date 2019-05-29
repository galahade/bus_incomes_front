<template>
  <b-container fluid>
    <b-form @submit.prevent="submit" novalidate>
      <b-row v-if="error">
        <b-col></b-col>
        <b-col><p class="typo__p" >{{error}}</p></b-col>
        <b-col></b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col>
          <b-form-group
            id="input-group-2"
            label="收入月份"
            label-for="input-2"
            label-size="sm"
            label-cols
            label-align-sm="center"
          >
            <b-form-input id="input-2" type="month" size="sm"
              v-model.lazy="$v.year_month.$model"
              :state="$v.year_month.$dirty ? !$v.year_month.$error : null"
            ></b-form-input>
          </b-form-group>       
        </b-col>
        <b-col></b-col>
      </b-row>
      <b-row v-if="selectedItem">
        <b-col></b-col>
        <b-col>
          <b-button variant="danger" @click="deleteItemConfirm">删除</b-button>
        </b-col>
        <b-col></b-col>
      </b-row>
      <div v-if="selected"> 
        <b-row>
          <b-table striped bordered hover small selectable
            :busy="isBusy"
            select-mode="single"
            selectedVariant="success"
            :items="addedIncomes" 
            :fields="fields"
            @row-selected="rowSelected"
            ref="table"
          >
            <template slot="month" slot-scope="data">
              {{ data.item.income.month| moment('YYYY-MM') }}
            </template>
            <div slot="table-busy" class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </b-table>
        </b-row>
      <b-row>
        <b-col cols="12">
          <b-form-row class="justify-content-md-center">
            <b-col cols="12">
              <h3>线路收入</h3>
            </b-col>
          </b-form-row>
          <b-form-row class="justify-content-md-center">
            <b-col cols="4"> 
              <b-form-group 
                id="input-group-1" 
                label="线路名" 
                label-size="sm" 
                label-cols 
                label-align-sm="center"
                label-for="input-1"
              >
                <b-form-select
                  id="input-1" size="sm"
                  v-model="$v.lineMonthIncome.line.line_no.$model"
                  :options="lines"
                  :state="$v.lineMonthIncome.line.line_no.$dirty ? !$v.lineMonthIncome.line.line_no.$error : null"
                ></b-form-select>

                <b-form-invalid-feedback id="input-1-live-feedback">
                  This is a required field
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="justify-content-md-center">
            <b-col cols="4">
              <b-form-group
                id="input-group-3"
                label="现金收入"
                label-for="input-3"
                label-size="sm"
                label-cols
                label-align-sm="center"
              >
              <b-form-input
                  id="input-3" size="sm"
                  v-model.lazy.number="$v.lineMonthIncome.income.cash.$model"
                  :state="$v.lineMonthIncome.income.cash.$dirty ? !$v.lineMonthIncome.income.cash.$error : null"
                  aria-describedby="input-3-live-feedback"
                  placeholder="输入现金收入"
                  @input="$v.lineMonthIncome.income.cash.$touch()"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-3-live-feedback">
                  请输入大于等于0的整数金额。
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group
                id="input-group-4"
                label="刷卡收入"
                label-for="input-4"
                label-size="sm"
                label-cols
                label-align-sm="center"
              >
              <b-form-input
                  id="input-4" size="sm"
                  v-model.lazy.number="$v.lineMonthIncome.income.card.$model"
                  :state="$v.lineMonthIncome.income.card.$dirty ? !$v.lineMonthIncome.income.card.$error : null"
                  aria-describedby="input-4-live-feedback"
                  placeholder="输入刷卡收入"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-4-live-feedback">
                  请输入大于等于0的整数金额。
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="justify-content-md-center">
            <b-col cols="4">
              <b-form-group
                id="input-group-5"
                label="移动支付"
                label-for="input-5"
                label-size="sm"
                label-cols
                label-align-sm="center"
              >
              <b-form-input
                  id="input-5" size="sm"
                  v-model.lazy.number="$v.lineMonthIncome.income.mobile.$model"
                  :state="$v.lineMonthIncome.income.mobile.$dirty ? !$v.lineMonthIncome.income.mobile.$error : null"
                  aria-describedby="input-5-live-feedback"
                  placeholder="输入现金收入"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-5-live-feedback">
                  请输入大于等于0的整数金额。
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group
                id="input-group-6"
                label="出勤人次"
                label-for="input-6"
                label-size="sm"
                label-cols
                label-align-sm="center"
              >
              <b-form-input
                  id="input-6" size="sm"
                  v-model.lazy.number="$v.lineMonthIncome.income.attendance.$model"
                  :state="$v.lineMonthIncome.income.attendance.$dirty ? !$v.lineMonthIncome.income.attendance.$error : null"
                  aria-describedby="input-6-live-feedback"
                  placeholder="输入本月出勤人次"
                  trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-6-live-feedback">
                  请输入大于0的整数。
                </b-form-invalid-feedback>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row class="justify-content-md-center">
            <b-button type="submit" :disabled="submitStatus === 'PENDING'" size="sm" variant="primary">Submit</b-button>
            <b-button @click="onReset" size="sm" variant="danger">Reset</b-button>
          </b-form-row>
          <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
          <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
          <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
        </b-col>
      </b-row>
      </div>
      <!--
      <b-row>
        <b-col>
          <pre>{{$v.lineMonthIncome.line}}</pre>
        </b-col>
      </b-row>
      -->
    </b-form>
  </b-container>   
</template>

<script>
import { required, minValue, integer} from 'vuelidate/lib/validators'
import moment from 'moment'

import axios from 'axios'
import lodash from 'lodash'

export default {
  name: 'app',
  data() {
    return {
        lineMonthIncome: {
          id: null,
          line: { line_no: 0},
          income: {
            cash: '',
            card: '',
            mobile: 0,
            attendance: '',
            month: ''
          },
        },
        selectedItem: null,
        lines: [{ text: 'Select One', value: 0 }, { text: '1路', value: 1 },{ text: '2路', value: 2 },{ text: '3路', value: 3 },{ text: '6路', value: 6 },{ text: '8路', value: 8 },{ text: '10路', value: 10 },{ text: '11路', value: 11 },],
        addedIncomes: [],
        show: true,
        submitStatus: null,
        error: null,
        year_month: '',
        year: '',
        month: '',
        isBusy: false,
        fields: {
        'line.line_no': {
          label: '线路',
          sortable: true
        },
        'income.cash': {
          label: '现金收入',
          sortable: true
        },
        'income.card': {
          label: '刷卡收入',
          sortable: true
        },
        'income.mobile': {
          label: '移动支付',
          sortable: true
        },
        'income.attendance': {
          label: '出勤人数',
          sortable: true
        },
        'month': {
          label: '收入月份',
          sortable: false
        }
  },
    }
  },
  computed: {
    selected() {
      return this.year_month != ''
    },
  },
  validations: {
    lineMonthIncome: {
      line: {
        line_no: {
          required,
          minValue: minValue(1)
        }
      },
      income: {
        cash: {
          required,
          integer,
          minValue: minValue(0)
        },
        card: {
          required,
          integer,
          minValue: minValue(0)
        },
        mobile: {
          required,
          integer,
          minValue: minValue(0)
        },
        attendance: {
          required,
          integer,
          minValue: minValue(0)
        }
      } 
    },
    year_month: {
      required,
    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    year_month: function (newMonth) {
      var temps = lodash.split(newMonth, '-', 2)
      this.year = temps[0]
      this.month = temps[1]
      this.debouncedFillData()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedFillData = lodash.debounce(this.fillData, 500)
  },
  methods: {
    submit() {
        this.$v.lineMonthIncome.$touch();
        if (this.$v.lineMonthIncome.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          // do your submit logic here
          this.submitStatus = 'PENDING'
          var lineIncome = JSON.parse(JSON.stringify(this.lineMonthIncome))
          var time = moment.utc(this.year_month, 'YYYY-MM', true).format()
          lineIncome.income.month = time
          axios.post("/incomes",lineIncome).then(() => {
            this.submitStatus = 'OK'
           // this.addedIncomes.push(lineIncome)
          }).catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              this.error = error.response.data.error
            }
            this.submitStatus = ''
          }).finally(()=> {
            this.onReset()
            this.debouncedFillData()
          });
        }
    },
    onReset() {
      // Reset our form values
      //this.lineMonthIncome.line.line_no = 0
      this.lineMonthIncome.income.card = ''
      this.lineMonthIncome.income.cash = ''
      this.lineMonthIncome.income.mobile = 0
      this.lineMonthIncome.income.attendance = ''
      
      this.$v.$reset()
     // this.$v.lineMonthIncome.line.$reset()
      //this.lineMonthIncome.income.month = ''
      // Trick to reset/clear native browser form validation state
      /*
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
      */
    },
    fillData() {
      var vm = this
      var url = "/incomes/" + vm.year + "/" + vm.month
      vm.addedIncomes = null
      vm.isBusy = true
      axios.get(url).then(response => {
          if (response.data.hasData) {
            vm.addedIncomes = response.data.incomeList
          }
        }).catch(function (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              vm.error = "服务器错误：" + error
            }
        }).finally(()=> {
            vm.isBusy = false
        });
    },
    rowSelected(items) {
        this.selectedItem = items[0]
    },
    deleteItem() {
      var vm = this
      var url = "/incomes/" + vm.year + "/" + vm.month + "/" + this.selectedItem.line.line_no
      
      axios.delete(url).then(() => {
          vm.fillData()
          vm.$refs.table.refresh()
        }).catch(function (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              vm.error = "服务器错误：" + error
            }
        })
    },
    deleteItemConfirm() {
      var message = '确认删除 ' + this.selectedItem.line.line_no + ' 路该月收入吗？'
      this.$bvModal.msgBoxConfirm(message, {
        title: '请确认',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: '是',
        cancelTitle: '否',
        footerClass: 'p-2',
        hideHeaderClose: true,
        centered: true
      }).then(value => {
        if (value == true) {
          this.deleteItem()
        }
      })
    },
    toggleBusy() {
      this.isBusy = !this.isBusy
    }
  }, 
}
</script>
