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
            </div>
            <div>
              <p class="form-title">password</p>
              <v-text-field
                name="phone"
                outlined
                dense
                type="password"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-key"
              />
            </div>
            <div class="main-account">
              <span class="main-account-text">Already have account ?</span>
            </div>
            <div class="main-button">
              <v-btn color="#fb620e" width="100%"> LOG IN </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  head() {
    return {
      title: `Authorization Page - Boilerplate Nuxt Javascript`,
    }
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
    text-align: right;
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
