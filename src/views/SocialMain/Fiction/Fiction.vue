<template>
  <div>
    <b-row v-if="$store.getters.authUserState">
      <b-col class="col-md-12">
        <AddFiction />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="(item,index) in fiction"
        :key="index"
        class="col-md-6 col-lg-4"
        style="cursor: pointer;"
        @click="$router.push({ name: 'social.fiction-content' })"
      >
        <iq-card
          class="rounded iq-card-block iq-card-stretch iq-card-height"
        >
          <div class="event-images">
            <img
              :src="item.backgroudimg"
              class="img-fluid"
              alt="Responsive image"
            >
          </div>
          <b-card-body
            class="iq-card-body"
          >
            <div
              class="d-flex"
            >
              <div class="date-of-event">
                <span>{{ item.month }}</span>
                <h5>{{ item.date }}</h5>
              </div>
              <div class="events-detail ml-3">
                <h5>{{ item.name }}</h5>
                <p>{{ item.text }}</p>
                <div class="event-member">
                  <div class="iq-media-group">
                    <a
                      v-for="(user,index) in seenUser"
                      :key="index"
                      href="#"
                      class="iq-media"
                    >
                      <img
                        class="img-fluid avatar-40 rounded-circle"
                        :src="user"
                        alt=""
                      >
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </b-card-body>
        </iq-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { socialvue } from '@/config/pluginInit'
import AddFiction from './AddFiction'

export default {
  name: 'Fiction',
  components: { AddFiction  },
  data () {
    return {
      fiction: [
        {
          name: 'New Year Celibration',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/52.jpg'),
          month: 'Jan',
          date: '01'
        },
        {
          name: 'Birthday Celibration',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/53.jpg'),
          month: 'Jan',
          date: '24'
        },
        {
          name: 'New Year Celibration',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/54.jpg'),
          month: 'Jan',
          date: '26'
        },
        {
          name: 'Republic Day',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/55.jpg'),
          month: 'Feb',
          date: '01'
        },
        {
          name: 'Meetings & Conventions',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/56.jpg'),
          month: 'March',
          date: '01'
        },
        {
          name: 'Fun Events and Festivals ',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/57.jpg'),
          month: 'March',
          date: '11'
        },
        {
          name: 'Atlanta Retail Show',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/58.jpg'),
          month: 'Jan',
          date: '01'
        }, {
          name: 'Holi in the City',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/53.jpg'),
          month: 'March',
          date: '14'
        }, {
          name: 'Insurance Innovators',
          text: 'Lorem Ipsum is simply dummy text of the',
          backgroudimg: require('../../../assets/images/page-img/59.jpg'),
          month: 'Apr',
          date: '12'
        }
      ],
      seenUser: [
        require('../../../assets/images/user/05.jpg'),
        require('../../../assets/images/user/06.jpg'),
        require('../../../assets/images/user/07.jpg'),
        require('../../../assets/images/user/08.jpg'),
        require('../../../assets/images/user/09.jpg')
      ]
    }
  },
  mounted () {
    socialvue.index()
  }
}
</script>
