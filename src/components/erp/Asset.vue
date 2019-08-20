<template>
  <b-container fluid>
    <b-row>
      <b-col><br></b-col>
    </b-row>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h3>资产所有人</h3>
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
    <b-form @submit.prevent="submit" novalidate>
    <b-row class="justify-content-md-center">
      <b-col sm="4">
        <b-form-group
        id="input-group-1"
        label="选择部门"
        label-for="input-1"
        label-size="sm"
        label-cols-sm="4"
        label-align-sm="center">
          <b-form-select id="input-1" v-model="$v.assetForm.department_id.$model" :options="departmentsOptions" size="sm" :select-size="4" @input="onDepartmentInput" :state="$v.assetForm.department_id.$dirty ? !$v.assetForm.department_id.$error : null"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col v-if="assetForm.department_id" sm="4">
        <b-form-group
        id="input-group-2"
        label="选择员工"
        label-for="input-2"
        label-size="sm"
        label-cols-sm="4"
        description="部门公用设备请选择部门负责人"
        label-align-sm="center">
          <b-form-select id="input-2" v-model="$v.assetForm.staff_id.$model" :options="staffOptions" size="sm" :select-size="6" @input="onStaffInput" :state="$v.assetForm.staff_id.$dirty ? !$v.assetForm.staff_id.$error : null"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col sm="4">
      </b-col>
    </b-row>
    <b-row class="justify-content-md-center">
      <b-col sm="12">
        <b-alert v-if="assetForm.staff_id" variant="info" show>
          请为 <b>{{staf.name}}</b> 添加其管理的固定资产。
        </b-alert>
      </b-col>
    </b-row>
    <div v-if="assetForm.staff_id">
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h3>添加资产</h3>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-1"
          label="名称"
          label-for="radio-group-1"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-1" type="text" size="sm"
              v-model.lazy="$v.assetForm.name.$model"
              :state="$v.assetForm.name.$dirty ? !$v.assetForm.name.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-9"
          label="品牌"
          label-for="input-9"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-8" type="text" size="sm"
              v-model.lazy="assetForm.brand">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-2"
          label="型号"
          label-for="radio-group-2"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-2" type="text" size="sm"
              v-model.lazy="$v.assetForm.model.$model"
              :state="$v.assetForm.model.$dirty ? !$v.assetForm.model.$error : null">
            </b-form-input>
          </b-form-group>

        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-2"
          label="数量"
          label-for="input-2"
          label-size="sm"
          label-cols-sm="4"
          description="有序列号的数量只能为1"
          label-align-sm="center">
            <b-form-input id="input-2" type="number" size="sm"
              v-model.lazy="$v.assetForm.quantity.$model"
              :state="$v.assetForm.quantity.$dirty ? !$v.assetForm.quantity.$error : null">
            </b-form-input>
          </b-form-group>

        </b-col>
      </b-form-row>
      <b-form-row class="justify-content-md-center">
        <b-col sm="5">
          <b-form-group
          id="input-group-8"
          label="序列号"
          label-for="input-8"
          label-size="sm"
          label-cols-sm="4"
          description="有序列号的必须填写"
          label-align-sm="center">
            <b-form-input id="input-8" type="text" size="sm"
              v-model.lazy="assetForm.sn">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col sm="5">
          <b-form-group
          id="input-group-9"
          label="开始时间"
          label-for="input-9"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-8" type="date" size="sm"
              v-model.lazy="$v.assetForm.startTime.$model" :state="$v.assetForm.startTime.$dirty ? !$v.assetForm.startTime.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col sm="10">
          <b-form-group
          id="input-group-10"
          label="备注"
          label-for="input-10"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-textarea
              id="textarea"
              v-model="assetForm.note"
              placeholder="需要备注的内容"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
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
    </div>
    </b-form>
    <b-row>
      <b-col><br></b-col>
    </b-row>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h3>固定资产列表</h3>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
    <b-row v-if="selectedItem">
      <b-col></b-col>
      <b-col>
        <b-button variant="danger" @click="readyForChange">修改</b-button>
      </b-col>
      <b-col>
        <b-button variant="danger" @click="deleteItemConfirm">删除</b-button>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-row v-if="assetForm.staff_id">
      <b-table striped bordered hover small selectable
        :busy="isBusy"
        select-mode="single"
        selectedVariant="success"
        :items="assets"
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
import { required, minValue, integer} from 'vuelidate/lib/validators'
//import moment from 'moment'
import axios from 'axios'
import lodash from 'lodash'
import moment from 'moment'

export default {
  name: 'asset',
  data() {
    return {
      assetForm: {
        name: '',
        model: '',
        sn: '',
        brand: '',
        startTime: '',
        note: '',
        department_id: '',
        staff_id: '',
        quantity: 1,
      },
      assets: [],
      baseURL: "/data/staff",
      selectedItem: null,
      submitStatus: '',
      error: '',
      isBusy: false,
      isChangeData: false,
      // server side model
      staff: null,
      staf: null,
      staffOptions: [],
      departmentsOptions: [],
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
          label: '名称',
        },
        {
          key: 'brand',
          label: '品牌',
        },
        {
          key: 'quantity',
          label: '数量',
          sortable: true
        },
        {
          key: 'sn',
          label: '序列号',
        },
        {
          key: 'startTime',
          label: '开始时间',
        },
        {
          key: 'note',
          label: '备注',
        }
      ]
    }
  },
  validations: {
    assetForm: {
      name: {
        required,
      },
      model: {
        required,
      },
      quantity: {
        required,
        integer,
        minValue: minValue(1),
      },
      startTime: {
        required,
      },
      department_id: {
        required,
      },
      staff_id: {
        required,
      },
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
  //  this.debouncedFillData()
    this.fetchDepartments()
    this.fetchJobType()
  },
  methods: {
    submit() {
      this.error = ''
      this.$v.assetForm.$touch();
      if (this.$v.assetForm.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        var postData = JSON.parse(JSON.stringify(this.assetForm))
        axios.post(this.baseURL,postData).then(() => {
          this.submitStatus = 'OK'
          var message = "创建员工：" + this.assetForm.name + "成功！"
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
      var message = "修改员工：" + this.assetForm.name + "成功！"
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
      // reset assetForm
      // reset form select
      // reset status items
      this.selectedItem = null
      this.submitStatus = ''
      this.error = ''
      this.isBusy = false
      this.isChangeData = false
      // reset validate status
      this.$v.$reset()
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
      vm.departmentsOptions = []
      axios.get(url).then(response => {
      //  console.log(response.data.department)
        response.data.department.forEach(v=>{
            var temp = {}
            temp.value = v.id
            temp.text = v.name
            vm.departmentsOptions.push(temp)
        })
        }).catch(function (error) {
          if (error.response) {
              vm.error = "获取部门错误：" + error
              vm.showErrorAlert()
            }
        })
    },
    fetchStaffByDepartmentID() {
      var vm = this
      var url = "/data/department/" + vm.assetForm.department_id + "/staff"
      vm.staffOptions = []
      vm.staff = new Map()
      axios.get(url).then(response => {
        response.data.staff.forEach(v=>{
          vm.staff.set(v.id, v)
          var temp = {}
          temp.value = v.id
          temp.text = v.name + '-' +v.job
          vm.staffOptions.push(temp)
        })
        }).catch(function (error) {
          if (error.response) {
              vm.error = "获取员工错误：" + error
              vm.showErrorAlert()
            }
        })
    },
    onDepartmentInput(value) {
      this.fetchStaffByDepartmentID()
    },
    onStaffInput(value) {
      this.staf = this.staff.get(value)
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
      var form = this.assetForm
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
      if (!this.assetForm.is_multitime_hired) {
        this.assetForm.first_onboard_time = this.assetForm.onboard_time
      }
      var message = '确认提交 ' + this.assetForm.name + ' 的信息？'
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
