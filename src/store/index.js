import { createStore } from 'vuex'

export const store = createStore({
  state: {
    user: {
      loggedIn: false,
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },

  },
  actions: {
    fetchUser({ commit }, user) {
      commit("SET_LOGGED_IN", user !== null);
    }
  }
});