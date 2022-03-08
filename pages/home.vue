<template>
  <div>Ini adalah halaman home</div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      user: {},
    }
  },
  head() {
    return {
      title: `Homepage - Boilerplate Nuxt Javascript`,
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      this.user = await this.$store.dispatch('profile/user')
    },
  },
}
</script>
