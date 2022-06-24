<script>
import Layout from '@/layouts/main.vue'

export default {
  components: {
    Layout,
  },
  data: () => ({
    dialog: false,
  })
}
</script>

<template>
  <Layout>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-dialog
            v-model="dialog"
            persistent

          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                block
                dark
                v-bind="attrs"
                v-on="on"
              >
                Create a new Fiction
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">New Fiction</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        outlined
                        label="Title"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        outlined
                        label="Description"
                        required
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          v-for="n in 9"
          :key="n"
          cols="12"
          sm="4"
        >
          <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              >
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ms-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-3 text-subtitle-1">
                $ Italian, Cafe
              </div>

              <div class="my-3 text-subtitle-1">
                03/17/2000
              </div>

              <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  <v-container>
    <v-card
      elevation="2"
    ></v-card>
  </v-container>

  </Layout>
</template>

<style lang="scss" scoped>
</style>
