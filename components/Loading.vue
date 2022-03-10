<template>
  <div v-if="loading" class="loading-overlay">
    <div class="loading-container">
      <img class="loading-item" src="img/loading.png" alt="Icon Loading" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingComponent',
  data: () => ({ num: 0 }),
  computed: {
    loading: {
      get() {
        return this.$store.get('overlay')
      },
      set(val) {
        return this.$store.set('overlay', val)
      },
    },
  },
  methods: {
    start() {
      this.loading = true
    },
    finish() {
      this.loading = false
    },
    fail() {
      this.loading = false
    },
    increase(num) {
      this.num = num
    },
  },
}
</script>
