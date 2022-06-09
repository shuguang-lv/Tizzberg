<template>
  <b-row>
    <b-col
      lg="10"
    >
      <iq-card>
        <template
          v-slot:body
        >
          <h1>JavaScript</h1>
          <h2>History</h2>
          <h3>Creation at Netscape</h3>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <h3>Adoption by Microsoft</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt tempore quos molestias enim dolores neque, labore, repellat inventore ad minus, unde saepe veritatis rem aut. Molestias optio obcaecati quisquam ab!</p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <h3>The rise of JScript</h3>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt tempore quos molestias enim dolores neque, labore, repellat inventore ad minus, unde saepe veritatis rem aut. Molestias optio obcaecati quisquam ab!</p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <p>
            The Mosaic web browser was released in 1993.
            As the first browser with a graphical user interface accessible to non-technical people,
            it played a prominent role in the rapid growth of the nascent World Wide Web
          </p>
          <h2>Trademark</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit ad magnam reiciendis saepe maiores atque laborum iste velit odit fuga dolores eveniet repudiandae, hic eum blanditiis, cupiditate beatae architecto ducimus?</p>
          <h2>Website client-side usage</h2>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique iure, laborum porro quisquam autem unde rem quam officia accusamus vel ratione ab quod accusantium nisi molestias id, minus sit ad.</p>
        </template>
      </iq-card>
    </b-col>
    <b-col
      lg="2"
    >
      <SideCatalog
        v-bind="catalogProps"
        class="catalog"
      />
    </b-col>
  </b-row>
</template>

<script>
import { socialvue } from '@/config/pluginInit'
import SideCatalog from 'vue-side-catalog'
import 'vue-side-catalog/lib/vue-side-catalog.css'

export default {
  name: 'FictionContent',
  components: {
    SideCatalog,
  },
  data () {
    return {
      catalogProps:{
         container: '.iq-card-body',
         title: 'Chapters'
      },
    }
  },
  mounted () {
    socialvue.index()
  }
}
</script>

<style>
.catalog {
  position: fixed;
  top: 120px
}
</style>
