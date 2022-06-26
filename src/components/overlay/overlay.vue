<script>
export default {
  data() {
    return {
      showOverlay: false,
      text: '',
    }
  },
  methods: {
    open(options = {}) {
      const { text = '' } = options
      this.text = text
      this.showOverlay = true
    },
    close() {
      this.showOverlay = false
    },
  },
}
</script>

<template>
  <v-overlay :value="showOverlay" z-index="999">
    <v-progress-circular indeterminate size="100"></v-progress-circular>
  </v-overlay>
</template>

<style lang="scss" scoped></style>
