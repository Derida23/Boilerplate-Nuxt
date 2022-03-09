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
                placeholder="Enter your number phone"
                prepend-inner-icon="mdi-cellphone"
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
                @click:append="show = !show"
              />
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
                :items="loading ? [] : locations"
                :loading="loading"
                @change="handleCountry"
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
  computed: {
    loading() {
      return this.$store.get('location/loading')
    },
  },
  mounted() {
    this.getLocations()
  },
  methods: {
    async getLocations() {
      const response = await this.$store.dispatch('location/country')
      this.locations = response
    },
    handleLogin() {
      return this.$router.push('/auth/login')
    },
    handleCountry(value) {
      this.form = {
        ...this.form,
        latlong: `${value.lat},${value.long},`,
        country: value.name,
      }
    },
    async handleSave() {
      const data = {
        ...this.form,
        device_token: (Math.random() + 1).toString(36).substring(2),
        device_type: 2,
      }

      const response = await this.$store.dispatch('session/register', data)
      return response
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
