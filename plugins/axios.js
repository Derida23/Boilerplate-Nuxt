import { set } from '@/utils'

const AxiosPlugin = ({ $axios, app, route, store, redirect }) => {
  // Handle Axios onRequest
  $axios.onRequest((config) => {
    if (route.name.includes('admin')) {
      const token = store.state.oauth.accessToken

      // eslint-disable-next-line no-prototype-builtins
      if (!config.headers.hasOwnProperty('Authorization') && token) {
        set(config.headers, 'Authorization', `Bearer ${token}`)
      }
    }
  })
}

export default AxiosPlugin
