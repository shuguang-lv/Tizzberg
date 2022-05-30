<template>
  <div class="d-flex align-items-center">
    <div
      v-if="miniToggle"
      id="sidebar-toggle"
      class="sidebar-toggle"
    >
      <i class="ri-menu-3-line" />
    </div>
    <div
      class="avatar chat-profile mr-3"
      :class="mediaClass"
      @click="toggleContent"
    >
      <slot name="media" />
    </div>
    <div class="chat-caption">
      <slot name="body" />
    </div>
    <button
      v-if="closeButton"
      type="submit"
      class="close-btn-res p-3"
    >
      <i class="ri-close-fill" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ToggleButton',
  props: {
    toggleShow: { type: String, default: '' },
    mediaClass: { type: String, default: '' },
    miniToggle: { type: Boolean, default: false },
    closeButton: { type: Boolean, default: true }
  },
  data () {
    return {
      active: false
    }
  },
  methods: {
    toggleContent () {
      let selector = document.querySelector(this.toggleShow)
      selector.classList.add('show')
    },
    checkToggle (type) {
      if (this.link === type) {
        switch (type) {
          case 'media':
          case 'body':
            this.active = false
            break
        }
      } else {
        this.active = true
      }
    }
  }
}
</script>
