<!-- layout for list pagination (infinite scroll) -->

<script>
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
      skip: 0, // how many records should be skipped
      list: [],
      loadingList: false,
    };
  },
  watch: {
    fetchListApiOptions() {
      this.updateList("refresh");
    },
  },
  async mounted() {
    await this.updateList("refresh");
  },
  methods: {
    /**
     * load mode for pagination
     * @param {*} mode refresh | load
     */
    async updateList(mode = "refresh") {
      this.loadingList = true;
      try {
        if (mode === "refresh") {
          this.skip = 0;
          const list = await this.fetchListApi(0, this.fetchListApiOptions);
          this.list = list.map((item) => (item ? item.toJSON() : {}));
        } else if (mode === "load") {
          this.skip += Number(process.env.VUE_APP_PAGE_SIZE);
          const list = await this.fetchListApi(
            this.skip,
            this.fetchListApiOptions
          );
          this.$nextTick(async () => {
            this.list.push.apply(
              this.list,
              list.map((item) => (item ? item.toJSON() : {}))
            );
          });
        }
      } catch (error) {
        console.log(error);
        this.$snackbar.error(error.rawMessage);
      }
      this.loadingList = false;
    },
  },
};
</script>

<template>
  <div class="d-flex flex-column align-center">
    <div v-if="list.length === 0" class="primary--text text-h5 mt-16">
      Oops! Seems like nothing here...
    </div>
    <!-- expose updateList method and list variable -->
    <slot v-bind:updateList="updateList" v-bind:list="list" />
    <v-btn
      v-if="list.length > 0"
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
