<template>
  <ul
    :id="id"
    :class="`nav nav-${pills ? 'pills' : ''}${tabs ? 'tabs' : ''} ${vertical ? 'flex-column' : ''} ${align ? 'justify-content-' + align : ''}`"
  >
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'TabNav',
  props: {
    id: { type: String, default: 'myTab' },
    pills: { type: Boolean, default: false },
    vertical: { type: Boolean, default: false },
    tabs: { type: Boolean, default: false },
    align: { type: String, default: '' }
  },
  mounted () {
    let _this = this
    window.$('#' + this.id + ' a').on('click', function (e) {
      window.$(this).tab('show')
    })
    window.$('#' + this.id + ' a').on('shown.bs.tab', function (event) {
      _this.$emit('change', event)
    })
  }
}
</script>
