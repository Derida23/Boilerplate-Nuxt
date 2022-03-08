import _set from 'lodash/set'

const AxiosPlugin = ({ $axios, app }) => {
  // Handle Axios onRequest
  $axios.onRequest((config) => {
    // Check if url is profile need Bearer
    if (config.url.includes('profile')) {
      const token = app.$cookiz.get('x-csrf-token')

      if (token) {
        _set(config.headers, 'Authorization', token)
      }
    }
  })

  // $axios.onResponse((res) => {
  //   console.log('SSR ->', res.data)
  // })

  // $axios.onError((err) => {
  //   console.log('ERROR AXIOS ->', err.config)
  // })
}

export default AxiosPlugin
