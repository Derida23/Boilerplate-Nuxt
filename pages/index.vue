<template>
  <div class="container">
    <div class="main">
      <div class="main-image flex-center w-full">
        <img src="img/foodies.png" alt="img-food" class="image" />
      </div>
      <div class="main-title">
        <h1><span>G</span>et <span>G</span>ood <span>C</span>alore</h1>
        <p>Experience a world of calore with your</p>
        <p>favorite food</p>
      </div>
      <div class="main-button flex-center">
        <div class="main-button-wrapper">
          <v-btn outlined color="#fb620e" @click="handleLogin"> LOG IN </v-btn>
          <br />
          <v-btn depressed color="#fb620e"> SIGN UP </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  methods: {
    handleLogin() {
      return this.$router.push('/session/login')
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
  &-image {
    img {
      width: 50%;
    }
  }

  &-title {
    text-align: center;

    p {
      color: gray;
    }

    h1 {
      letter-spacing: 0.1rem;
      font-weight: 500;
    }

    span {
      color: $color-orange;
      font-weight: 700;
    }
  }

  &-button {
    margin-top: 1rem;
    width: 100%;

    &-wrapper {
      width: 50%;
      button {
        margin-top: 1rem;
        width: 100%;
      }
    }
  }
}
</style>
