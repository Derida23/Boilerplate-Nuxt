<template>
  <div>Ini adalah halaman home</div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {},
  head() {
    return {
      title: `Homepage - Boilerplate Nuxt Javascript`,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch('session/user')
    },
  },
}
</script>
