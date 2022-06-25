<script>
export default {
  name: 'IdentityEditor',
  data() {
    return {
      showDialog: false,
      identities: [
        {
          text: 'Painter',
          icon: 'mdi-palette-outline',
          value: 'painter',
        },
        {
          text: 'Musician',
          icon: 'mdi-music-clef-treble',
          value: 'musician',
        },
        {
          text: 'Scientist',
          icon: 'mdi-atom',
          value: 'scientist',
        },
      ],
    }
  },
  methods: {
    show() {
      this.showDialog = true
    },
  },
}
</script>

<template>
  <v-dialog v-model="showDialog" max-width="500">
    <v-card tile>
      <v-card-title class="text-h5 secondary--text">
        Switch your identity (character)
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text class="pt-4">
        <v-select
          :items="identities"
          filled
          disable-lookup
          hide-details
          label="Select Identity"
        >
          <template v-slot:item="{ item, on, attrs }">
            <v-list-item link class="px-8" v-bind="attrs" v-on="on">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions class="pb-4 px-6 d-flex justify-space-between">
        <v-btn depressed large color="warning" class="px-4">
          Delete Identity
        </v-btn>
        <v-btn depressed large color="primary" class="px-4">
          Create Identity
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
