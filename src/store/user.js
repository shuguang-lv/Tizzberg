import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {
  state: () => ({
    loginStatus: false,
    userInfo: {
      name: '',
      avatar: '',
    },
  }),
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
