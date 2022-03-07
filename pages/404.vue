<template>
  <div class="container-error">
    <div class="content">
      <h1 class="mtb text-center ls-md text-xl">404</h1>
      <h2 class="mtb text-center ls-md">SEEMS YOU GET LOST</h2>
      <p class="text-center ls-sm">
        <b>
          We're sorry, but the page you were looking for doesn't exist. This may
          happen, because we always update every content to make it more
          feasible for the visitor.
        </b>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyPage',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    return {
      title: '404 Not Found - Boilerplate Nuxt Javascript',
    }
  },
}
</script>

<style lang="scss" scoped>
.container-error {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: whitesmoke;
  color: #252525;
}

.content {
  width: 339px;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content img {
  width: 100%;
  margin-bottom: 20px;
}

.mtb {
  margin: 12px 0px;
}

.text-center {
  text-align: center;
}

.ls-sm {
  letter-spacing: 2px;
  font-weight: 200 !important;
}

.ls-md {
  letter-spacing: 4px;
}

.text-xl {
  font-size: 5rem;
}
</style>
