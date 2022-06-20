import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authUser: {
      id: 'sh46s546sdg564sdffs4hsd6fh',
      name: 'Admin SocialV',
      mobileNo: null,
      email: 'admin@socialvue.com',
      profileImage: null,
      password: 'admin123',
    },
  },
  getters: {
    authUserState: (state) => state.authUser,
  },
  mutations: {},
  actions: {},
  modules: {},
})
