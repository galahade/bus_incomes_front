<template>
  <b-container fluid>
    <b-form @submit.prevent="submit" novalidate>
      <b-row>
        <b-col><br></b-col>
      </b-row>
      <b-row>
        <b-col cols="4"></b-col>
        <b-col cols="4">
          <h3>增加部门</h3>
        </b-col>
        <b-col cols="4"></b-col>
      </b-row>
      <b-form-row v-if="error">
        <b-col></b-col>
        <b-col><p class="typo__p" >{{error}}</p></b-col>
        <b-col></b-col>
      </b-form-row>
      <b-form-row>
        <b-col cols="5">
          <b-form-group
          id="input-group-1"
          label="部门编号"
          label-for="input-1"
          label-size="sm"
          label-cols-sm="4"
          description="比如：001"
          label-align-sm="center">
            <b-form-input id="input-1" type="text" size="sm"
              v-model.lazy="$v.departmentForm.sn.$model"
              :state="$v.departmentForm.sn.$dirty ? !$v.departmentForm.sn.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="5">
          <b-form-group
          id="input-group-2"
          label="部门名称"
          label-for="input-2"
          label-size="sm"
          label-cols-sm="4"
          label-align-sm="center">
            <b-form-input id="input-2" type="text" size="sm"
              v-model.lazy="$v.departmentForm.name.$model"
              :state="$v.departmentForm.name.$dirty ? !$v.departmentForm.name.$error : null">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-row align-h="center">
        <b-col cols="4">
        </b-col>
        <b-col cols="2">
          <b-button type="submit" :disabled="submitStatus === 'PENDING'" size="sm" variant="primary">提交</b-button>
        </b-col>
        <b-col cols="2">
          <b-button @click="onReset" size="sm" variant="danger">重置</b-button>
        </b-col>
        <b-col cols="4">
        </b-col>
      </b-row>
    </b-form>
    <b-row>
      <b-col><br></b-col>
    </b-row>
    <b-row>
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h3>部门列表</h3>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
    <b-row v-if="selectedItem">
      <b-col></b-col>
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
        :items="departments"
        :fields="tableFields"
        @row-selected="rowSelected"
        ref="table"
      >
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

export default {
  name: 'department',
  data() {
    return {
      departmentForm: {
        sn: '',
        name: '',
      },
      baseURL: "/data/department",
      selectedItem: null,
      show: true,
      submitStatus: null,
      error: null,
      isBusy: false,
      departments: [],
      tableFields: {
        'sn': {
          label: '部门编号',
          sortable: true
        },
        'name': {
          label: '部门名称',
          //sortable: true
        }
      }
    }
  },
  validations: {
    departmentForm: {
      sn: {
        required,
      },
      name: {
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
  },
  methods: {
    submit() {
      this.error = ''
      this.$v.departmentForm.$touch();
      if (this.$v.departmentForm.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        var postData = JSON.parse(JSON.stringify(this.departmentForm))
        console.log(this.departmentForm)
        console.log(JSON.stringify(this.departmentForm))
        console.log(postData)
        axios.post(this.baseURL,postData).then(() => {
          this.submitStatus = 'OK'
        }).catch(error => {
          //console.log(error.response)
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status == 409) {
              this.error = "部门名称已存在"
            } else {
              this.error = error.response.data.error
            }
          }
          this.submitStatus = ''
        }).finally(()=> {
          this.onReset()
          this.debouncedFillData()
        });
      }
    },
    onReset() {
      this.departmentForm.sn = ''
      this.departmentForm.name = ''
      this.$v.$reset()
    },
    fillData() {
      var vm = this
      var url = vm.baseURL
      vm.departments = null
      vm.isBusy = true
      axios.get(url).then(response => {
          vm.departments = response.data.department
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
      var url = this.baseURL
    //  console.log(this.selectedItem)
      var data = JSON.parse(JSON.stringify(this.selectedItem))
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
    deleteItemConfirm() {
      var message = '确认删除 ' + this.selectedItem.name + ' 部门？'
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
