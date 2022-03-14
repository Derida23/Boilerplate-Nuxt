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
            @keydown="$v.otp_code.$touch()"
          ></v-otp-input>
        </div>
      </div>
      <div class="main-account">
        <span class="main-account-text" @click="handleLogin"
          >Didn't receive a OTP? <b>Resend OTP</b></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'OtpPage',
  data() {
    return {
      otp_code: '',
    }
  },
  validations() {
    return {
      otp_code: { required, minLength: minLength(4) },
    }
  },
  methods: {
    getErrorMessage(field) {
      const errorMessage = []

      if (this.$v[field]?.$invalid && this.$v[field]?.$dirty) {
        if (this.$v[field]?.required === false) {
          errorMessage.push(`${field} is required`)
        }
        if (this.$v[field]?.minLength === false) {
          errorMessage.push(`${field} min length 4`)
        }
      }

      return errorMessage
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
