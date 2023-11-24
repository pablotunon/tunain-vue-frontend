import Vuex from 'vuex'
import { get, post } from "./actions"
import { router } from "./main"


const statusStrings = ['unauth', 'csrf', 'login', 'mfa']

export default new Vuex.Store({
  state: {
    status: 0,  // unauth (0) -> csrf (1) -> login (2) -> mfa (3) -> permissions (4)
    username: '',
    password: '',
    usersInfo: {},  // Cache { user_id: user } for saving requests to social
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
    mfa_success(state) {
      state.status = 3
      state.password = ''
    },
    permissions_success(state, { permissions }) {
      state.status = 4
      state.permissions = permissions ?? []
    },
    auth_error(state) {
      state.status = 1
      state.username = ''
      state.password = ''
    },
    users_info(state, users) {
      const usersMap = Object.fromEntries(users.map((u) => [u.user_id, u]));
      state.usersInfo = { ...state.usersInfo, ...usersMap }
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
        commit('mfa_success')
        commit('permissions_success', { permissions: response.permissions })
        dispatch('afterLogin')
      }).catch(() => {
        // No previous sessions
        get('login/cookie', {})
          .then(() => commit('csrf_success'))
        // .catch(() => commit('auth_error'))
      })
    },
    async login({ commit }, { username, password }) {
      return post('LOGIN', 'login', { username, password })
        .then(() => commit('login_success', { username, password }))
    },
    async mfa({ commit, dispatch }, { verification }) {
      return post('2FA', 'login/2fa', {
        username: this.state.username,
        password: this.state.password,
        verification_code: verification
      })
        .then(() => {
          commit('mfa_success')
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

    // --- Cache related methods -----------------------------------------
    async getUserInfo({ commit }, { userId }) {
      // Retrieving a single user uses the cache if available
      if (userId in this.state.usersInfo) {
        return this.state.usersInfo[userId]
      } else {
        var user = await get("social/users/info/" + userId)
        commit("users_info", [user])
        return user
      }
    },
    async searchUsers({ commit }, params) {
      // Retrieving multiple users overrides the cache
      var users = await get("social/users/search", params)
      commit("users_info", users);
      return users
    },
    async getManagerUsers({ commit }) {
      // Retrieving multiple users overrides the cache
      var users = await get("social/users/list")
      commit("users_info", users);
      return users
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
