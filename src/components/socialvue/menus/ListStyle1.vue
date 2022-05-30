<template>
  <b-collapse
    :id="idName"
    tag="ul"
    :class="className"
    :visible="open"
    :accordion="accordianName"
  >
    <li
      v-for="(item,index) in items"
      :key="index"
      :class="item.is_heading ? 'iq-menu-title' : activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''"
    >
      <i
        v-if="item.is_heading"
        class="ri-subtract-line"
      />
      <span v-if="item.is_heading">{{ $t(item.name) }}</span>
      <router-link
        v-if="!item.is_heading"
        v-b-toggle="item.name"
        :to="item.link"
        :class="`iq-waves-effect ${activeLink(item) && item.children ? 'active' : activeLink(item) ? 'active' : ''}`"
      >
        <i
          v-if="item.is_icon_class"
          :class="item.icon"
        />
        <template
          v-else
          v-html="item.icon"
        />
        <span>{{ $t(item.name) }}</span>
        <i
          v-if="item.children"
          class="ri-arrow-right-s-line iq-arrow-right"
        />
        <small
          :class="item.append_class"
          v-html="item.append"
        />
      </router-link>
      <List
        v-if="item.children"
        :items="item.children"
        :open="item.link.name !== '' && activeLink(item) && item.children ? true : !!(item.link.name !== '' && activeLink(item))"
        :id-name="item.name"
        :accordian-name="`sidebar-accordion${item.class_name}`"
        :class-name="`iq-submenu ${item.class_name}`"
      />
    </li>
  </b-collapse>
</template>

<script>
import { socialvue } from '../../../config/pluginInit'
import List from './ListStyle1'
export default {
  name: 'List',
  components: {
    List
  },
  props: {
    items: Array,
    className: { type: String, default: 'iq-menu' },
    horizontal: Boolean,
    open: { type: Boolean, default: false },
    idName: { type: String, default: 'sidebar' },
    accordianName: { type: String, default: 'sidebar' }
  },
  mounted () {
  },
  methods: {
    activeLink (item) {
      return socialvue.getActiveLink(item, this.$route.name)
    }
  }
}
</script>
