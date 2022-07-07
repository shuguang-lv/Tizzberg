<script>
// import { debounce } from 'lodash'

export default {
  props: {
    fetchListApi: {
      type: Function,
      required: true,
    },
    fetchListApiOptions: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      skip: 0,
      list: [],
      loadingList: false,
      // infiniteScroll: debounce(() => {
      //   // detect if bottom is reached
      //   const scrollY = window.scrollY
      //   const visible = document.documentElement.clientHeight
      //   const pageHeight = document.documentElement.scrollHeight
      //   if (Math.abs(pageHeight - (visible + scrollY)) === 0) {
      //     this.updateList('load')
      //   }
      // }, 100),
    }
  },
  async mounted() {
    await this.updateList('refresh')
    // window.onscroll = this.infiniteScroll
  },
  methods: {
    async updateList(mode = 'refresh') {
      this.loadingList = true
      try {
        if (mode === 'refresh') {
          this.skip = 0
          const list = await this.fetchListApi(0, this.fetchListApiOptions)
          this.list = list.map((item) => (item ? item.toJSON() : {}))
        } else if (mode === 'load') {
          this.skip += Number(process.env.VUE_APP_PAGE_SIZE)
          const list = await this.fetchListApi(
            this.skip,
            this.fetchListApiOptions
          )
          this.$nextTick(async () => {
            this.list.push.apply(
              this.list,
              list.map((item) => (item ? item.toJSON() : {}))
            )
          })
        }
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
      this.loadingList = false
    },
  },
}
</script>

<template>
  <div class="d-flex flex-column align-center">
    <slot v-bind:updateList="updateList" v-bind:list="list" />
    <v-btn
      outlined
      large
      color="tertiary"
      class="mt-8"
      :loading="loadingList"
      @click="updateList('load')"
      >load more</v-btn
    >
  </div>
</template>

<style lang="scss" scoped></style>
