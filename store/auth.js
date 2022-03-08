import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  loading: false,
  show_alert: false,
  status: '',
  alert_title: '',
  alert_message: '',
})

export const mutation = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions = {
  // Login Vuex Action
  login({ dispatch }, body) {
    // dispatch('set/loading', true)
    this.$axios
      .post('api/privy/oauth/sign_in', body)
      .then((response) => {
        // console.log('RESPONSE -> ', response)
        return true
      })
      .catch((error) => {
        console.error(error)
        return false
      })
  },
}
