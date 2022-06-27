<script>
export default {
  data() {
    return {
      showDialog: false,
      title: '',
      content: '',
      cancelButton: {
        text: 'Cancel',
        color: 'warning',
        action: () => {},
      },
      confirmButton: {
        text: 'Confirm',
        color: 'primary',
        action: () => {},
      },
    }
  },
  methods: {
    open(options = {}) {
      const {
        title = '',
        content = '',
        cancelButton = {},
        confirmButton = {},
      } = options
      this.title = title
      this.content = content
      let {
        text = 'Cancel',
        color = 'warning',
        action = () => {},
      } = cancelButton
      this.cancelButton = { text, color, action }
      ;({
        text = 'Confirm',
        color = 'primary',
        action = () => {},
      } = confirmButton)
      this.confirmButton = { text, color, action }
      this.showDialog = true
    },
    async confirm() {
      try {
        await this.confirmButton.action()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
    async cancel() {
      try {
        await this.cancelButton.action()
        this.showDialog = false
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<template>
  <v-dialog v-model="showDialog" persistent max-width="500">
    <v-card tile>
      <v-card-title class="text-h5 secondary--text">
        {{ title }}
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="text-subtitle-1 py-4">{{ content }}</v-card-text>
      <v-card-actions class="pb-4">
        <v-btn
          depressed
          width="200"
          :color="cancelButton.color"
          @click="cancel"
        >
          {{ cancelButton.text }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          width="200"
          :color="confirmButton.color"
          @click="confirm"
        >
          {{ confirmButton.text }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
