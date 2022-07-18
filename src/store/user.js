import { defineStore } from 'pinia'
// import { fetchCharacter, fetchCharacters, setCurrentCharacter, createCharacter, deleteCharacter } from '@/api/user'

const AV = require('leancloud-storage')
// const user = AV.User.current().toJSON()

export const userStore = defineStore('userStore', {
  state: () => ({
    currentUser: AV.User.current().toJSON(),
    loginStatus: false,
    userInfo: {
      name: '',
      avatar: '',
    },
  }),
  getters: {
    currentCharacter(state) {
      return state.currentUser.currentCharacter
    }
  },
  actions: {
    // 登录
    login() {
      this.loginStatus = true
      this.getUserInfo()
    },

    // 获取用户信息
    getUserInfo() {
      this.userInfo = {
        name: 'userName',
        avatar: '',
      }
    },

    // 退出登录
    logout() {
      this.loginStatus = false
      this.userInfo = {
        name: '',
        avatar: '',
      }
    },
  },
})

