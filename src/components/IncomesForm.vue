<template>
  <div>
  <div>
  </div>
    <b-form @submit.stop.prevent novalidate :validated="$v.form.$dirty">
      <b-form-group
        id="input-group-1"
        label="Name"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
      <b-form-input
          id="input-1"
          v-model="$v.form.name.$model"
          :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
          aria-describedby="input-1-live-feedback"
          placeholder="Enter name"
        ></b-form-input>
        <b-form-invalid-feedback id="input-1-live-feedback">
          This is a required field and must be at least 3 characters
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-2" label="Food" label-for="input-2">
        <b-form-select
          id="input-2"
          v-model="$v.form.food.$model"
          :options="foods"
          :state="$v.form.food.$dirty ? !$v.form.food.$error : null"
        ></b-form-select>

        <b-form-invalid-feedback id="input-2-live-feedback">
          This is a required field
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <pre>{{$v}}</pre>
  </div>
  
      
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name: 'app',
  data() {
    return {
        form: {
          email: '',
          name: '',
          food: null,
          checked: []
        },
        foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
    }
  },
  validations: {
    form: {
        food: {
          required,
        },
        name: {
          required,
          minLength: minLength(3)
        }
      }
  },
  methods: {
    onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
  }
}
</script>
