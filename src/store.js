import Vue from 'vue'
import Vuex from 'vuex'
import { UserService, AuthenticationError } from './services/user.service'
import { TokenService } from './services/storage.service'
import router from './router'

Vue.use(Vuex)

const store =  new Vuex.Store({
  state: {
    authenticating: false,
    accessToken: TokenService.getToken(),
    authenticationErrorCode: 0,
    authenticationError: ''
  },
  mutations: {
    loginRequest(state) {
      state.authenticating = true;
      state.authenticationError = ''
      state.authenticationErrorCode = 0
    },

    loginSuccess(state, accessToken) {
      state.accessToken = accessToken
      state.authenticating = false;
    },

    loginError(state, {errorCode, errorMessage}) {
      state.authenticating = false
      state.authenticationErrorCode = errorCode
      state.authenticationError = errorMessage
    },

    logoutSuccess(state) {
      state.accessToken = ''
    }
  },
  actions: {
    async login({ commit }, {email, password , url}) {
      commit('loginRequest');

      try {
        const token = await UserService.login(email, password , url);
        commit('loginSuccess', token)

        // Redirect the user to the page he first tried to visit or to the home view
        router.push(router.history.current.query.redirect || '/');

        return true
      } catch (e) {
        if (e instanceof AuthenticationError) {
          commit('loginError', {errorCode: e.errorCode, errorMessage: e.message})
        }

        return false
      }
    },

    logout({ commit }) {
      UserService.logout()
      commit('logoutSuccess')
      router.push('/login')
    }
  },
  getters:{

    loggedIn: (state) => {
      return !!state.accessToken
    },

    authenticationErrorCode: (state) => {
      return state.authenticationErrorCode
    },

    authenticationError: (state) => {
      return state.authenticationError
    },

    authenticating: (state) => {
      return state.authenticating
    }
  }
});

export default store;
