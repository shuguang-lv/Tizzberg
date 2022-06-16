<template>
  <b-modal
    ref="identity-modal"
    hide-footer
    centered
    title="Switch your identity"
  >
    <div
      v-for="(identity, index) in identities"
      :key="index"
      :class="{ 'mt-4': index > 0 }"
    >
      <b-avatar
        size="60px"
        class="mr-4"
      />
      <h3 style="display:inline-block; vertical-align: middle;">
        {{ identity.name }}
      </h3>
    </div>
    <hr>
    <div class="mt-4">
      <b-avatar
        size="60px"
        class="mr-4"
      >
        <i
          class="ri-add-line ml-8"
        />
      </b-avatar>
      <h4 style="display:inline-block; vertical-align: middle;">
        Create new identity
      </h4>
    </div>
    <div class="mt-4">
      <b-avatar
        size="60px"
        class="mr-4"
      >
        <i
          class="ri-subtract-line ml-8"
        />
      </b-avatar>
      <h4 style="display:inline-block; vertical-align: middle;">
        Delete identity
      </h4>
    </div>
    <!-- <b-button
      class="mt-3"
      variant="outline-danger"
      block
      @click="hideModal"
    >
      Close
    </b-button> -->
  </b-modal>
</template>

<script>
export default {
  name: 'IdentitySelector',
  props: {},
  data() {
    return {
      identities: [
        {
          name: 'writer',
          image: '',
        },
        {
          name: 'painter',
          image: '',
        },
        {
          name: 'programmer',
          image: '',
        },
      ],
    }
  },
  methods: {
    showModal() {
      this.$refs['identity-modal'].show()
    },
    hideModal() {
      this.$refs['identity-modal'].hide()
    },
  },
}
</script>
