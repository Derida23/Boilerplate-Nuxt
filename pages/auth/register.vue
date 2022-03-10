<template>
  <div class="container">
    <div class="main">
      <div class="main-title flex-center w-full">
        <div class="main-title-wrapper">
          <p class="header">Register,</p>
          <p class="sub-header">Fill the field & create account.</p>
        </div>
      </div>
      <div class="main-image flex-center w-full">
        <img src="~/static/img/login.png" alt="img-login" />
      </div>

      <div class="main-form flex-center w-full">
        <div class="main-form-wrapper">
          <v-form @submit.prevent="handleSave">
            <div>
              <p class="form-title">number phone</p>
              <v-text-field
                v-model="form.phone"
                name="phone"
                outlined
                dense
                type="tel"
                placeholder="Number phone with (62)"
                prepend-inner-icon="mdi-cellphone"
                :error-messages="getErrorMessage('phone')"
                @keydown="$v.form.phone.$touch()"
              />
            </div>

            <div>
              <p class="form-title">password</p>
              <v-text-field
                v-model="form.password"
                name="password"
                outlined
                dense
                placeholder="Enter your password"
                prepend-inner-icon="mdi-key"
                :type="show ? 'password' : 'text'"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :error-messages="getErrorMessage('password')"
                @click:append="show = !show"
                @keydown="$v.form.password.$touch()"
              />
            </div>

            <div>
              <p class="form-title">country</p>
              <v-autocomplete
                name="country"
                item-text="name"
                item-value="lat"
                outlined
                dense
                return-object
                placeholder="Select your country"
                prepend-inner-icon="mdi-map"
                :items="loading ? [] : locations"
                :loading="loading"
                :error-messages="getErrorMessage('country')"
                @change="handleCountry"
                @keydown="$v.form.country.$touch()"
              />
            </div>

            <div class="main-button">
              <v-btn color="#fb620e" width="100%" type="submit">
                REGISTER
              </v-btn>
            </div>
            <div class="main-account">
              <span class="main-account-text" @click="handleLogin"
                >Already have a account? <b>Log in</b></span
              >
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'RegisterPage',
  data() {
    return {
      locations: [],
      show: false,
      form: {
        phone: '',
        password: '',
        country: '',
        latlong: '',
        device_token: '',
        device_type: '',
      },
    }
  },
  validations() {
    // const formatPhone = helpers.regex('formatPassword', /^628[0-9]{10,}$/)
    // const formatPassword = helpers.regex(
    //   'formatPassword',
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,}$/
    // )

    return {
      form: {
        phone: { required },
        password: { required },
        country: { required },
      },
    }
  },
  computed: {
    loading() {
      return this.$store.get('location/loading')
    },

    // Notification
    show_alert() {
      return this.$store.get('session/show_alert')
    },
    status() {
      return this.$store.get('session/status')
    },
    alert_title() {
      return this.$store.get('session/alert_title')
    },
    alert_message() {
      return this.$store.get('session/alert_message')
    },
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          type: this.status,
          title: this.alert_title,
          text: this.alert_message,
        })

        this.$store.set('session/show_alert', false)
      }
    },
  },
  mounted() {
    this.getLocations()
  },
  methods: {
    async getLocations() {
      this.$overlay(true)

      const response = await this.$store.dispatch('location/country')
      this.locations = response
      this.$overlay(false)
    },
    handleLogin() {
      return this.$router.push('/auth/login')
    },
    handleCountry(value) {
      this.form = {
        ...this.form,
        latlong: value ? `${value.lat},${value.long},` : '',
        country: value?.name ?? '',
      }
    },
    getErrorMessage(field) {
      const errorMessage = []

      if (this.$v.form[field]?.$invalid && this.$v.form[field]?.$dirty) {
        if (this.$v.form[field]?.required === false) {
          errorMessage.push(`${field} is required`)
        }

        // if (this.$v.form[field]?.formatPhone === false) {
        //   errorMessage.push(`wrong phone format`)
        // }

        // if (this.$v.form[field]?.formatPassword === false) {
        //   errorMessage.push(`min 8 with special character, lower and uppercase`)
        // }
      }

      return errorMessage
    },
    async handleSave() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const data = {
          ...this.form,
          device_token: (Math.random() + 1).toString(36).substring(2),
          device_type: 2,
        }

        const response = await this.$store.dispatch('session/register', data)

        if (response) {
          this.$router.push('/')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main {
  &-title {
    &-wrapper {
      width: 60%;

      .header {
        font-weight: 700 !important;
        font-size: 1.5rem;
      }
      .sub-header {
        font-weight: 500 !important;
        font-size: 1rem;
        color: gray;
        margin-top: -14px;
      }
    }
  }

  &-image {
    margin-top: 2rem;

    img {
      width: 50%;
    }
  }

  &-form {
    margin-top: 2rem;

    &-wrapper {
      width: 60%;
    }
  }

  &-account {
    text-align: center;
    margin-top: 1rem;

    &-text {
      font-size: 14px;

      &:hover {
        color: $color-orange;
        cursor: pointer;
      }
    }
  }

  &-button {
    margin-top: 1rem;
  }
}
</style>
