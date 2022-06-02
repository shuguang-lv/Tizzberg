<template>
  <div class="iq-sidebar">
    <div id="sidebar-scrollbar">
      <nav class="iq-sidebar-menu">
        <List
          :items="items"
          :open="true"
          :horizontal="horizontal"
        />
      </nav>
      <div class="p-3" />
    </div>
  </div>
</template>

<script>
import List from '../menus/ListStyle1'
export default {
  name: 'SideBarStyle1',
  components: {
    List
  },
  props: {
    homeURL: { type: Object, default: () => ({ name: 'layout1.dashboard' }) },
    items: { type: Array },
    logo: { type: String, default: require('../../../assets/images/logo.png') },
    horizontal: { type: Boolean },
    toggleButton: { type: Boolean, default: true }
  },
  data() {
    return {
    }
  },
  methods: {
    miniSidebar() {
      this.$emit('toggle')
    }
  }
}
</script>
