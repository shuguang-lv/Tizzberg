import Vue from 'vue'
import Vuex from 'vuex'
// import Setting from './Setting/index'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    // Setting,
  },
  state: {
    lang: {
      title: 'English',
      value: 'en',
      image: require('@/assets/images/small/flag-01.png'),
    },
    langOption: [
      {
        title: 'English',
        value: 'en',
        image: require('@/assets/images/small/flag-01.png'),
      },
      {
        title: 'Arabic',
        value: 'ar',
        image: require('@/assets/images/small/flag-500.png'),
      },
      {
        title: 'Chinese',
        value: 'chi',
        image: require('@/assets/images/small/flag-300.png'),
      },
      {
        title: 'Hindi',
        value: 'hi',
        image: require('@/assets/images/small/flag-100.png'),
      },
      {
        title: 'Greek',
        value: 'gr',
        image: require('@/assets/images/small/flag-400.png'),
      },
      {
        title: 'Franch',
        value: 'fr',
        image: require('@/assets/images/small/flag-200.png'),
      },
    ],
    authUser: {
      id: 'sh46s546sdg564sdffs4hsd6fh',
      name: 'Admin SocialV',
      mobileNo: null,
      email: 'admin@socialvue.com',
      profileImage: null,
      password: 'admin123',
    },
    users: [
      {
        id: 'sh46s546sdg564sdffs4hsd6fh',
        name: 'Admin SocialV',
        mobileNo: null,
        email: 'admin@socialvue.com',
        profileImage: null,
        password: 'admin123',
      },
    ],
    activePage: {
      name: 'Dashboard',
      breadCrumb: [
        {
          html: '<i class="ri-home-4-line mr-1 float-left"></i>Home',
          to: { name: 'mini.dashboard.home-1' },
        },
        {
          text: '',
          href: '#',
        },
      ],
    },
    layoutMode: {
      dark: false,
      rtl: false,
    },
  },
  mutations: {
    activePageCommit(state, data) {
      state.activePage = data
    },
    setLangCommit(state, data) {
      state.lang = data
    },
    layoutModeCommit(state, data) {
      state.layoutMode = data
    },
  },
  actions: {
    authUserAction(context, payload) {
      context.commit('authUserCommit', payload)
    },
    addUserAction(context, payload) {
      context.commit('addUserCommit', payload)
    },
    activePageAction(context, payload) {
      context.commit('activePageCommit', payload)
    },
    setLangAction(context, payload) {
      context.commit('setLangCommit', payload)
    },
    layoutModeAction(context, payload) {
      let dark = payload.dark ? 'dark' : 'light'
      let rtl = payload.rtl ? 'rtl' : 'ltr'
      document.getElementsByTagName('html')[0].setAttribute('mode', dark)
      document.getElementsByTagName('html')[0].setAttribute('dir', rtl)
      context.commit('layoutModeCommit', {
        dark: payload.dark,
        rtl: payload.rtl,
        sidebar: '',
      })
    },
  },
  getters: {
    authUserState: (state) => state.authUser,
    usersState: (state) => state.users,
    activePage: (state) => state.activePage,
    langState: (state) => state.lang,
    langOptionState: (state) => state.langOption,
    darkModeState: (state) => state.layoutMode.dark,
    rtlModeState: (state) => state.layoutMode.rtl,
  },
  strict: debug,
})
