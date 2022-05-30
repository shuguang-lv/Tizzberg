<template>
  <ul class="iq-timeline">
    <li
      v-for="(item,index) in items"
      :key="index"
    >
      <div
        class="timeline-dots"
        :class="'border-' + item.color"
      />
      <h6
        class="float-left mb-1"
        v-html="item.title"
      />
      <small
        class="float-right mt-1"
        v-html="item.right"
      />
      <div class="d-inline-block w-100">
        <p v-html="item.description" />
        <template v-if="item.child.items.length > 0 && item.child.type === 'img'">
          <div class="iq-media-group">
            <a
              v-for="(childItem,childIndex) in item.child.items"
              :key="childIndex"
              href="#"
              class="iq-media"
            >
              <img
                :src="childItem"
                class="img-fluid avatar-40 rounded-circle"
                alt="img"
              >
            </a>
          </div>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TimeLine',
  props: {
    items: { type: Array, default: () => [] }
  }
}
</script>
