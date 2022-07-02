import { defineStore } from 'pinia'

export const useStore = defineStore('character', {
  persist: true,
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    },
  },
  actions: {
    increment() {
      this.counter++
    },
  },
})
