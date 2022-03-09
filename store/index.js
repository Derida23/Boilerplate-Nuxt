import EasyAccess, { defaultMutations } from 'vuex-easy-access'

export const state = () => ({
  user: {
    name: '',
    roles: [{ name: '' }],
  },
})

export const mutations = {
  ...defaultMutations(state()),
  user: (state, payload) => {
    state.user = payload
  },
}

export const plugins = [EasyAccess()]

export const actions = {}
