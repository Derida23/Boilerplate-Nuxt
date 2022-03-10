import EasyAccess, { defaultMutations } from 'vuex-easy-access'
import CryptoJS from 'crypto-js'

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
  // Feature login
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
          dispatch('set/alert_title', 'Authentication is error')
          dispatch('set/alert_message', err.response.data.error.errors[0])
        } else {
          dispatch('set/alert_title', 'System not response')
          dispatch(
            'set/alert_message',
            'the system is busy, please try again later'
          )
        }

        dispatch('set/loading', false)
        return false
      })
  },

  // Feature register
  register({ dispatch }, body) {
    dispatch('set/loading', true)
    return this.$axios
      .post('/api/privy/register', body)
      .then((response) => {
        const dataCookies = {
          user_id: response.data.data.user.id,
          phone: body.phone,
        }

        // Logic crypto 10 minutes
        const dateNow = new Date()
        dateNow.setTime(dateNow.getTime() + 10 * 60 * 1000)

        // Set convert for otp
        const convert = CryptoJS.AES.encrypt(
          JSON.stringify(dataCookies),
          this.$config.salt
        ).toString()

        this.$cookiz.set('__OTP', convert.toString(), {
          path: '/',
          expires: dateNow,
        })
        dispatch('set/show_alert', true)
        dispatch('set/status', 'success')
        dispatch('set/alert_title', `Create account success`)
        dispatch('set/alert_message', response.data.message)

        dispatch('set/loading', false)
        return true
      })
      .catch((err) => {
        dispatch('set/show_alert', true)
        dispatch('set/status', 'error')

        if (err.response.status === 422) {
          dispatch('set/alert_title', `Create account error`)
          dispatch('set/alert_message', err.response.data.error.errors[0])
        } else {
          dispatch('set/alert_title', 'System not response')
          dispatch(
            'set/alert_message',
            'the system is busy, please try again later'
          )
        }

        dispatch('set/loading', false)
        return false
      })
  },

  // Feature User
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
