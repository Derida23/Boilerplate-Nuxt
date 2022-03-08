<template>
  <div class="container">
    <div class="main">
      <div class="main-title flex-center w-full">
        <div class="main-title-wrapper">
          <p class="header">Welcome back,</p>
          <p class="sub-header">Log in now to continue.</p>
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
                placeholder="Enter your number phone"
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
            <div class="main-button">
              <v-btn
                color="#fb620e"
                width="100%"
                type="submit"
                :loading="loading"
              >
                LOG IN
              </v-btn>
            </div>
            <div class="main-account">
              <span class="main-account-text" @click="handleRegister"
                >Are you a newbie? <b>Sign Up</b></span
              >
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'LoginPage',
  data() {
    return {
      show: false,
      form: {
        phone: '',
        password: '',
        latlong: '',
        device_token: '',
        device_type: '',
      },
    }
  },
  head() {
    return {
      title: `Authorization Page - Boilerplate Nuxt Javascript`,
    }
  },
  computed: {
    loading() {
      return this.$store.get('auth/loading')
    },

    // Notification
    show_alert() {
      return this.$store.get('auth/show_alert')
    },
    status() {
      return this.$store.get('auth/status')
    },
    alert_title() {
      return this.$store.get('auth/alert_title')
    },
    alert_message() {
      return this.$store.get('auth/alert_message')
    },
  },
  validations() {
    return {
      form: {
        phone: { required, numeric },
        password: { required },
      },
    }
  },
  watch: {
    show_alert(val) {
      if (val) {
        this.$notify({
          type: this.status,
          title: this.alert_title,
          text: this.alert_message,
        })

        this.$store.set('auth/show_alert', false)
      }
    },
  },
  methods: {
    handleRegister() {
      this.$router.push('/auth/register')
    },

    getErrorMessage(field) {
      const errorMessage = []

      if (this.$v.form[field]?.$invalid && this.$v.form[field]?.$dirty) {
        if (this.$v.form[field]?.required === false) {
          errorMessage.push(`${field} is required`)
        }

        if (this.$v.form[field]?.numeric === false) {
          errorMessage.push(`wrong phone format`)
        }
      }

      return errorMessage
    },
    async handleSave() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const data = {
          ...this.form,
          latlong: '-6.200000,106.816666',
          device_token: (Math.random() + 1).toString(36).substring(2),
          device_type: 2,
        }

        const response = await this.$store.dispatch('auth/login', data)

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
  height: 95vh;
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
