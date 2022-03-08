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
  // Post login
  login({ dispatch }, body) {
    dispatch('set/loading', true)
    return this.$axios
      .post('api/privy/oauth/sign_in', body)
      .then((response) => {
        dispatch('set/status', 'success')
        dispatch('set/show_alert', false)

        this.$cookiz.set('x-csrf-token', response.data.data.user.access_token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 1,
        })

        dispatch('set/loading', false)

        return true
      })
      .catch((err) => {
        dispatch('set/status', 'error')
        dispatch('set/show_alert', true)

        if (err.response.status === 422) {
          dispatch('set/alert_title', 'Authentication is Error')
          dispatch('set/alert_message', err.response.data.error.errors[0])
        } else {
          dispatch('set/alert_title', 'System not Response')
          dispatch(
            'set/alert_message',
            'the system is busy, please try again later'
          )
        }

        dispatch('set/loading', false)

        return false
      })
  },

  // Get User
  user() {
    return this.$axios
      .get(`${this.$config.api_url}/profile/me`)
      .then(() => {
        return true
      })
      .catch(() => {
        return false
      })
  },
}
