import Vuex from 'vuex'
import { get, post } from "./actions"
import { router } from "./main"


const statusStrings = ['unauth', 'csrf', 'login']

export default new Vuex.Store({
  state: {
    status: 0,  // unauth (0) -> csrf (1) -> login (2) -> permissions (3)
    username: '',
    password: '',
    nextPage: undefined, // When login is prompted we store here the desired page by the user
    permissions: []
  },
  mutations: {
    csrf_success(state) {
      state.status = 1
    },
    login_success(state, { username, password }) {
      state.status = 2
      state.username = username
      state.password = password
    },
    permissions_success(state, { permissions }) {
      state.status = 3
      state.permissions = permissions ?? []
    },
    auth_error(state) {
      state.status = 1
      state.username = ''
      state.password = ''
    },
    next_page(state, nextPage) {
      state.nextPage = nextPage
    }
  },
  actions: {
    // --- Login related methods -----------------------------------------
    async checkBackendCookies({ commit, dispatch }) {
      get('permissions').then((response) => {
        // There is a valid previous sessions
        commit('login_success', { username: response.username, password: 'fakepass' })
        commit('permissions_success', { permissions: response.permissions })
        dispatch('afterLogin')
      }).catch(() => {
        // No previous sessions
        get('login/cookie', {})
          .then(() => commit('csrf_success'))
        // .catch(() => commit('auth_error'))
      })
    },
    async login({ commit, dispatch }, { username, password }) {
      return post('LOGIN', 'login', { username, password })
        .then(() => {
          commit('login_success', { username, password })
          dispatch('permissions')
        })
    },
    async permissions({ commit, dispatch }) {
      get('permissions').then((response) => {
        commit('permissions_success', { permissions: response.permissions })
      }).finally(() => {
        dispatch('afterLogin')
      })
    },
    async afterLogin() {
      if (this.state.nextPage) {
        router.push(this.state.nextPage);
      } else {
        return router.push("/");
      }
    },
    async logout({ commit }) {
      return post('LOGOUT', 'logout')
        .then(() => commit('auth_error'))
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.status >= 3
    },
    username(state) {
      return state.username
    },
    status(state) {
      return state.status
    },
    statusString(state) {
      return statusStrings[state.status]
    },
  }
})
