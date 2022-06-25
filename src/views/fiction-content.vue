<script>
import Layout from '@/layouts/main.vue'
import SideCatalog from 'vue-side-catalog'
import 'vue-side-catalog/lib/vue-side-catalog.css'

export default {
  name: 'fiction-content',
  components: {
    SideCatalog,
    Layout,
  },
  data() {
    return {
      catalogProps: {
        container: '.fiction-content',
        title: 'Chapters',
        iconLeft: true,
        lineLeft: 0,
      },
    }
  },
  mounted() {},
}
</script>

<template>
  <Layout>
    <v-row class="d-flex justify-center">
      <v-col cols="6" class="mr-4">
        <v-card tile class="fiction-content pa-8" elevation="1">
          <h1>JavaScript</h1>
          <h2>History</h2>
          <h3>Creation at Netscape</h3>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <h3>Adoption by Microsoft</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
            tempore quos molestias enim dolores neque, labore, repellat
            inventore ad minus, unde saepe veritatis rem aut. Molestias optio
            obcaecati quisquam ab!
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <h3>The rise of JScript</h3>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt
            tempore quos molestias enim dolores neque, labore, repellat
            inventore ad minus, unde saepe veritatis rem aut. Molestias optio
            obcaecati quisquam ab!
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993. As the first browser
            with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World
            Wide Web
          </p>
          <h2>Trademark</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad
            magnam reiciendis saepe maiores atque laborum iste velit odit fuga
            dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae
            architecto ducimus?
          </p>
          <h2>Website client-side usage</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique
            iure, laborum porro quisquam autem unde rem quam officia accusamus
            vel ratione ab quod accusantium nisi molestias id, minus sit ad.
          </p>
        </v-card>
      </v-col>
      <v-col cols="2" class="mt-10">
        <side-catalog v-bind="catalogProps" class="catalog">
          <template #default="{ isActive }">
            <i
              class="line-style"
              :style="{
                background: isActive
                  ? $vuetify.theme.themes.light.primary
                  : 'transparent',
              }"
            ></i>
          </template>
        </side-catalog>
      </v-col>
    </v-row>
  </Layout>
</template>

<style>
.catalog {
  position: fixed;
}
.line-style {
  display: inline-block;
  height: 20px;
  width: 3px;
}
.side-catalog__title {
  color: #1e4c5d;
  font-size: 24px;
  font-weight: 500;
  margin-bottom: 20px;
}
.side-catalog__list-item--active .side-catalog__list-item-title {
  color: #8ab6c9 !important;
}
</style>
