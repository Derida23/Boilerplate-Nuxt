<template>
  <div class="container">
    <div class="main">
      <div class="main-title flex-center w-full">
        <div class="main-title-wrapper">
          <p class="header">One Time Password,</p>
          <p class="sub-header">We will send you OTP on your number.</p>
        </div>
      </div>
      <div class="main-image flex-center w-full">
        <img src="~/static/img/otp.png" alt="img-otp" />
      </div>

      <div class="main-form flex-center w-full">
        <div class="main-form-wrapper">
          <v-otp-input
            v-model="otp_code"
            length="4"
            name="otp_code"
            :error-messages="getErrorMessage('otp_code')"
            @finish="handleSave"
            @keydown="$v.otp_code.$touch()"
          ></v-otp-input>
        </div>
      </div>
      <div class="main-account">
        <span class="main-account-text" @click="handleResend"
          >Didn't receive a OTP? <b>Resend OTP</b></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'OtpPage',
  data() {
    return {
      otp_code: '',
    }
  },
  head() {
    return {
      title: `One Time Password - Boilerplate Nuxt Javascript`,
    }
  },
  computed: {
    loading() {
      return this.$store.get('session/loading')
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
  validations() {
    return {
      otp_code: { required },
    }
  },
  methods: {
    getErrorMessage(field) {
      const errorMessage = []

      if (this.$v[field]?.$invalid && this.$v[field]?.$dirty) {
        if (this.$v[field]?.required === false) {
          errorMessage.push(`${field} is required`)
        }
      }

      return errorMessage
    },
    handleLogin() {
      this.$router.push('/auth/login')
    },
    async handleSave() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        const response = await this.$store.dispatch('session/otp', {
          otp_code: this.otp_code,
        })

        if (response) {
          this.$router.push('/home')
        }
      }
    },
    async handleResend() {
      await this.$store.dispatch('session/resend')
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
    img {
      width: 35%;
    }
  }

  &-form {
    &-wrapper {
      width: 40%;
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
