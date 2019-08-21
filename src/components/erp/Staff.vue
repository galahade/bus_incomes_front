<template>
  <b-container fluid>
    <b-form @submit.prevent="submit" novalidate>
      <b-row>
        <b-col><br></b-col>
      </b-row>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <h3>增加员工</h3>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert
            :show="errorDismissCountDown"
            dismissible
            variant="danger"
            @dismissed="errorDismissCountDown=0"
            @dismiss-count-down="errorCountDownChanged"
          >
            <p>提交数据出错：{{ error }}</p>
          </b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-alert
            :show="successDismissCountDown"
            dismissible
            variant="success"
            @dismissed="successDismissCountDown=0"
            @dismiss-count-down="successCountDownChanged"
          >
            <p>提交成功</p>
          </b-alert>
        </b-col>
      </b-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-1"
          label="姓名"
          label-for="input-1"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-1" type="text" size="sm"
              v-model.lazy="$v.staffForm.name.$model"
              :state="$v.staffForm.name.$dirty ? !$v.staffForm.name.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-2"
          label="入职日期"
          label-for="input-2"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-2" type="date" size="sm"
              v-model.lazy="$v.staffForm.onboard_time.$model"
              :state="$v.staffForm.onboard_time.$dirty ? !$v.staffForm.onboard_time.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-3"
          label="编号"
          label-for="input-3"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-3" type="text" size="sm"
              v-model.lazy="$v.staffForm.employee_id.$model"
              :state="$v.staffForm.employee_id.$dirty ? !$v.staffForm.employee_id.$error : null"
              placeholder="比如：000001">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-4"
          label="身份证"
          label-for="input-4"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-4" type="text" size="sm"
              v-model.lazy="$v.staffForm.personal_id.$model"
              :state="$v.staffForm.personal_id.$dirty ? !$v.staffForm.personal_id.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-5"
          label="多次入职"
          label-for="radio-group-5"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-radio-group id="radio-group-5" v-model="$v.staffForm.is_multitime_hired.$model" name="multitime_hired"
            :state="$v.staffForm.is_multitime_hired.$dirty ? !$v.staffForm.is_multitime_hired.$error : null">
              <b-form-radio value=false>否</b-form-radio>
              <b-form-radio value=true>是</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-6"
          label="是否离职"
          label-for="radio-group-6"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-radio-group id="radio-group-6" v-model="$v.staffForm.is_resign.$model" name="resign"
            :state="$v.staffForm.is_resign.$dirty ? !$v.staffForm.is_resign.$error : null">
              <b-form-radio value=false>否</b-form-radio>
              <b-form-radio value=true>是</b-form-radio>
            </b-form-radio-group>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-7"
          label="手机"
          label-for="input-7"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-7" type="text" size="sm"
              v-model.lazy="$v.staffForm.phone.$model"
              :state="$v.staffForm.phone.$dirty ? !$v.staffForm.phone.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-8"
          label="首次入职"
          label-for="input-8"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-8" type="date" size="sm"
              v-model.lazy="$v.staffForm.first_onboard_time.$model"
              :state="$v.staffForm.first_onboard_time.$dirty ? !$v.staffForm.first_onboard_time.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-9"
          label="职务"
          label-for="input-9"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-select id="input-9" v-model="$v.staffForm.job.$model" :options="jobTypes" :state="$v.staffForm.job.$dirty ? !$v.staffForm.job.$error : null" size="sm"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-10"
          label="部门"
          label-for="input-10"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-select id="input-10" v-model="department_select_id" :options="departments" :state="$v.staffForm.department.$dirty ? !$v.staffForm.department.$error : null" size="sm" @input="onDepartmentInput"></b-form-select>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-row align-h="center">
        <b-col cols="2" sm="3">
          <b-button v-if="isChangeData" type="button" :disabled="submitStatus === 'PENDING'" size="sm" variant="primary" @click="updateConfirm">修改</b-button>
          <b-button v-if="!isChangeData" type="button" :disabled="submitStatus === 'PENDING'" size="sm" variant="primary" @click="submitConfirm">提交</b-button>
        </b-col>
        <b-col cols="2" sm="3">
          <b-button @click="onReset" size="sm" variant="danger">重置</b-button>
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col><br></b-col>
    </b-row>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h3>员工列表</h3>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
    <b-row v-if="selectedItem">
      <b-col></b-col>
      <b-col>
        <b-button variant="primary" @click="readyForChange">修改</b-button>
      </b-col>
      <b-col>
        <b-button variant="danger" @click="deleteItemConfirm">删除</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row>
      <b-table striped bordered hover small selectable
        :busy="isBusy"
        select-mode="single"
        selectedVariant="success"
        :items="staff"
        :fields="tableFields"
        @row-selected="rowSelected"
        ref="table"
      >
      <!-- We are using utility class `text-nowrap` to help illustrate horizontal scrolling-->
      <div slot="HEAD[]" class="text-nowrap" slot-scope="scope">{{ scope.label }}</div>
      <div slot="[]" class="text-nowrap" slot-scope="scope">{{ scope.value }}</div>

      <!-- A virtual column -->
      <template slot="[index]" slot-scope="data">
        {{ data.index + 1 }}
      </template>
<!--
      <template slot="[is_multitime_hired]" slot-scope="data">
        <b>{{ data.value ? '是' : '否'}}</b>
      </template>
-->
        <div slot="table-busy" class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </b-table>
    </b-row>
  </b-container>
</template>
<script>
import { required} from 'vuelidate/lib/validators'
//import moment from 'moment'

import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'

export default {
  name: 'staff',
  data() {
    return {
      staffForm: {
        name: '',
        employee_id: '',
        onboard_time: '',
        personal_id: '',
        is_multitime_hired: false,
        is_resign: false,
        first_onboard_time: '',
        phone: '',
        department: {
            id: '',
            sn: '',
            name: ''
        },
        job: '',
      },
      department_select_id: '',
      baseURL: "/data/staff",
      selectedItem: null,
      submitStatus: '',
      error: '',
      isBusy: false,
      isChangeData: false,
      staff: [],
      departments: [],
      jobTypes: [],
      // alert control
      errorDismissCountDown: 0,
      successDismissCountDown: 0,
      dismissSecs: 10,
      tableFields: [
        {
          key: 'index',
          label: '序号',
        },
        {
          key: 'name',
          label: '姓名',
        },
        {
          key: 'employee_id',
          label: '编号',
        },
        {
          key: 'onboard_time',
          label: '入职时间',
          sortable: true
        },
        {
          key: 'age',
          label: '年龄',
          formatter: (value, key, item) => {
            //  return new Date().getFullYear() - item.age
             var re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);
             var a = item.personal_id.match(re);
             for (var i in a) {
                 console.log("number " + i + "s" + a[i])
             }
            return new Date().getFullYear() - a[3]
          }
        },
        {
          key: 'personal_id',
          label: '身份证',
        },
        {
          key: 'is_multitime_hired',
          label: '多次入职',
          formatter: value => {
              return value ? '是' : '否'
            }
        },
        {
          key: 'phone',
          label: '手机',
        },
        {
          key: 'department.name',
          label: '部门',
        },
        {
          key: 'job',
          label: '职位',
        }
      ]
    }
  },
  validations: {
    staffForm: {
      name: {
        required,
      },
      employee_id: {
        required,
      },
      onboard_time: {
        required,
      },
      personal_id: {
        required,
      },
      is_multitime_hired: {
        required,
      },
      is_resign: {
        required,
      },
      first_onboard_time: {
        required,
      },
      phone: {
        required,
      },
      department: {
          id: {
            required,
          }
      },
      job: {
        required,
      }
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
  mounted: function () {
    this.debouncedFillData()
    this.fetchDepartments()
    this.fetchJobType()
  },
  methods: {
    submit() {
      this.error = ''
      this.$v.staffForm.$touch();
      if (this.$v.staffForm.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        var postData = JSON.parse(JSON.stringify(this.staffForm))
        axios.post(this.baseURL,postData).then(() => {
          this.submitStatus = 'OK'
          var message = "创建员工：" + this.staffForm.name + "成功！"
          this.debouncedFillData()
          this.showSuccessAlert()
        }).catch(error => {
          //console.log(error.response)
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 409) {
              this.error = "员工已存在"
            } else {
              this.error = error.response.data.error
            }
          }
          this.showErrorAlert()
          this.submitStatus = ''
        })
      }
    },
    update() {
      var message = "修改员工：" + this.staffForm.name + "成功！"
      this.showConfirmMsgBox(message)
      this.showSuccessAlert()
    },
    showErrorAlert() {
      this.errorDismissCountDown = this.dismissSecs
    },
    showSuccessAlert() {
      this.successDismissCountDown = this.dismissSecs
    },
    errorCountDownChanged(dismissCountDown) {
      this.errorDismissCountDown = dismissCountDown
    },
    successCountDownChanged(dismissCountDown) {
      this.successDismissCountDown = dismissCountDown
    },
    onReset() {
      // reset staffForm
      this.staffForm.id = null
      this.staffForm.name = ''
      this.staffForm.employee_id = ''
      this.staffForm.onboard_time = ''
      this.staffForm.personal_id = ''
      this.staffForm.is_multitime_hired = false
      this.staffForm.is_resign = false
      this.staffForm.first_onboard_time = ''
      this.staffForm.phone = ''
      this.staffForm.department = {}
      this.staffForm.job = ''
      // reset form select
      this.department_select_id = ''
      // reset status items
      this.selectedItem = null
      this.submitStatus = ''
      this.error = ''
      this.isBusy = false
      this.isChangeData = false
      // reset validate status
      this.$v.$reset()
    },
    onDepartmentInput(value) {
      this.staffForm.department.id = value
    },
    fetchJobType() {
      var vm = this
      var url = this.baseURL+"/jobType"
      axios.get(url).then(response => {
        vm.jobTypes = response.data.jobTypes
        }).catch(function (error) {
          if (error.response) {
              vm.error = "服务器错误：" + error
            }
        })
    },
    fetchDepartments() {
      var vm = this
      var url = "/data/department"
      vm.departments = []
      axios.get(url).then(response => {
      //  console.log(response.data.department)
        response.data.department.forEach(v=>{
            var temp = {}
            temp.value = v.id
            temp.text = v.name
            vm.departments.push(temp)
        })
      //  console.log(vm.departments)
        }).catch(function (error) {
          if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              vm.error = "服务器错误：" + error
            }
        })
    },
    fillData() {
      var vm = this
      var url = vm.baseURL
      vm.staff = null
      vm.isBusy = true
      axios.get(url).then(response => {
          vm.staff = response.data.staff
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
    readyForChange() {
      var vm = this
      var data = JSON.parse(JSON.stringify(this.selectedItem))
      var form = this.staffForm
      form.name = data.name
      form.employee_id = data.employee_id
      form.personal_id = data.personal_id
      form.onboard_time = data.onboard_time
      form.is_multitime_hired = data.is_multitime_hired
      form.is_resign = data.is_resign
      form.first_onboard_time = data.first_onboard_time
      form.phone = data.phone
      form.department = data.department
      form.job = data.job
      vm.department_select_id = data.department.id
      vm.isChangeData = true
    },
    deleteItem() {
      var vm = this
      var url = this.baseURL
    //  console.log(this.selectedItem)
      var data = JSON.parse(JSON.stringify(this.selectedItem))
      // this for golang josn string to time.time convert
      data.onboard_time = moment.utc(this.selectedItem.onboard_time, 'YYYY-MM-DD', true).format()
      data.first_onboard_time = moment.utc(this.selectedItem.first_onboard_time, 'YYYY-MM-DD', true).format()

      axios.delete(url, { data: data}).then(() => {
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
    updateConfirm() {
      var message = '确认修改 ' + this.selectedItem.name + ' 的信息？'
      this.dialogConfirm(message, this.update)
    },
    submitConfirm() {
      if (!this.staffForm.is_multitime_hired) {
        this.staffForm.first_onboard_time = this.staffForm.onboard_time
      }
      var message = '确认提交 ' + this.staffForm.name + ' 的信息？'
      this.dialogConfirm(message, this.submit)
    },
    showConfirmMsgBox(message) {
      this.$bvModal.msgBoxOk(message, {
        title: '确认',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: '成功',
        headerClass: 'p-2 border-bottom-0',
        footerClass: 'p-2 border-top-0',
        centered: true
      }).then(value => {
          this.onReset()
      })
    },
    dialogConfirm(message, callback) {
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
          callback()
        }
      })
    },
    deleteItemConfirm() {
      var message = '确认删除 ' + this.selectedItem.name + ' ？'
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
