import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  loading: false,
})

export const mutations = {
  ...defaultMutations(state()),
}

export const plugins = [EasyAccess()]

export const actions = {
  country({ dispatch }) {
    dispatch('set/loading', true)
    return this.$axios
      .get('api/country')
      .then((response) => {
        dispatch('set/loading', false)
        return response?.data?.data ?? []
      })
      .catch(() => {
        dispatch('set/loading', false)
        return []
      })
  },
}
