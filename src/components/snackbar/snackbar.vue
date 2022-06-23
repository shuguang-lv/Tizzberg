<script>
export default {
  data() {
    return {
      showSnackbar: false,
      type: 'success',
      message: '',
    }
  },
  methods: {
    alert(options = {}) {
      this.showSnackbar = false
      const { type = 'success', message = '' } = options
      switch (type) {
        case 'success':
          this.type = '#4CAF50'
          break
        case 'warning':
          this.type = '#FF9800'
          break
        case 'error':
          this.type = '#F44336'
          break
        default:
          break
      }
      this.message = message
      this.showSnackbar = true
    },
  },
}
</script>

<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="type"
    bottom
    right
    text
    timeout="3000"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        :color="type"
        text
        depressed
        v-bind="attrs"
        @click="showSnackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
