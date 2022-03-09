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
          <v-form>
            <div>
              <p class="form-title">number phone</p>
              <v-text-field
                name="phone"
                outlined
                dense
                type="tel"
                placeholder="Enter your number phone"
                prepend-inner-icon="mdi-cellphone"
              />
              <!-- v-model="form.phone" -->
              <!-- :error-messages="getErrorMessage('phone')" -->
              <!-- @keydown="$v.form.phone.$touch()" -->
            </div>

            <div>
              <p class="form-title">password</p>
              <v-text-field
                name="password"
                outlined
                dense
                placeholder="Enter your password"
                prepend-inner-icon="mdi-key"
              />
              <!-- v-model="form.password" -->
              <!-- :type="show ? 'password' : 'text'" -->
              <!-- :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" -->
              <!-- :error-messages="getErrorMessage('password')" -->
              <!-- @click:append="show = !show" -->
              <!-- @keydown="$v.form.password.$touch()" -->
            </div>

            <div>
              <p class="form-title">country</p>
              <v-autocomplete
                item-text="name"
                item-value="lat"
                outlined
                dense
                return-object
                placeholder="Select your country"
                prepend-inner-icon="mdi-map"
              />
            </div>

            <div class="main-button">
              <v-btn
                color="#fb620e"
                width="100%"
                type="submit"
                :loading="loading"
              >
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
export default {
  name: 'RegisterPage',
  methods: {
    handleLogin() {
      return this.$router.push('/auth/login')
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
