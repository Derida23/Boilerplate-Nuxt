import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  loading: false,

  show_alert: false,
  status: '',
  alert_title: '',
  alert_message: '',
})

export const mutations = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions = {
  // Get User
  user({ dispatch }) {
    dispatch('set/loading', true)
    return this.$axios
      .get('api/privy/profile/me')
      .then((response) => {
        dispatch('set/loading', false)
        return response.data.data.user
      })
      .catch(() => {
        dispatch('set/loading', false)
        return false
      })
  },
}
