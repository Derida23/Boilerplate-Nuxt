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
                type="password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-key"
                :error-messages="getErrorMessage('password')"
                @keydown="$v.form.password.$touch()"
              />
            </div>
            <div class="main-button">
              <v-btn color="#fb620e" width="100%" type="submit"> LOG IN </v-btn>
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
  validations() {
    return {
      form: {
        phone: { required, numeric },
        password: { required },
        latlong: { required },
        device_token: { required },
        device_type: { required },
      },
    }
  },
  methods: {
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
    handleRegister() {
      this.$router.push('/auth/register')
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  height: 90vh;
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
