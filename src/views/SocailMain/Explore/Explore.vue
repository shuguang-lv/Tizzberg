<template>
  <b-row>
    <b-col
      v-for="(item,index) in exploreInfo"
      :key="index"
      md="6"
      lg="4"
    >
      <iq-card body-class="text-center">
        <div
          slot="cardImage"
          class="top-bg-image"
        >
          <img
            :src="item.backgroundimg"
            class="img-fluid w-100"
            alt="explore-bg"
          >
        </div>
        <template v-slot:body>
          <div class="explore-icon">
            <img
              :src="item.exploreimg"
              alt="profile-img"
              class="rounded-circle img-fluid avatar-120"
            >
          </div>
          <div class="explore-info pt-3 pb-3">
            <h4>{{ item.title }}</h4>
            <p>{{ item.text }}</p>
          </div>
          <div class="explore-details d-inline-block pb-3">
            <ul class="d-flex align-items-center justify-content-between list-inline m-0 p-0">
              <li
                v-for="(item,index) in item.otherinfo"
                :key="index"
                class="pl-3 pr-3"
              >
                <p class="mb-0">
                  {{ item.info }}
                </p>
                <h6>{{ item.value }}</h6>
              </li>
            </ul>
          </div>
          <div class="explore-member mb-3">
            <div class="iq-media-explore">
              <a
                v-for="(item,index) in item.exploreMember"
                :key="index"
                href="#"
                class="iq-media"
              >
                <img
                  class="img-fluid avatar-40 rounded-circle"
                  :src="item"
                  alt=""
                >
              </a>
            </div>
          </div>
          <button
            type="submit"
            class="btn btn-primary d-block w-100"
          >
            Collect
          </button>
        </template>
      </iq-card>
    </b-col>
  </b-row>
</template>

<script>
import { socialvue } from '../../../config/pluginInit'
export default {
  name: 'Explore',
  data () {
    return {
      exploreInfo: [
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg1.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-1.jpg'),
          title: 'Designer',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '600'
            },
            {
              info: 'Member',
              value: '320'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg2.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-2.jpg'),
          title: 'R & D',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '300'
            },
            {
              info: 'Member',
              value: '210'
            },
            {
              info: 'Visit',
              value: '1.1k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg3.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-3.jpg'),
          title: 'Graphics',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '320'
            },
            {
              info: 'Member',
              value: '310'
            },
            {
              info: 'Visit',
              value: '1.0k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg4.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-4.jpg'),
          title: 'Developer',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '1000'
            },
            {
              info: 'Member',
              value: '10000'
            },
            {
              info: 'Visit',
              value: '1.5k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg5.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-5.jpg'),
          title: 'Tester',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '600'
            },
            {
              info: 'Member',
              value: '320'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg6.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-6.jpg'),
          title: 'Events',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '200'
            },
            {
              info: 'Member',
              value: '200'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg7.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-7.jpg'),
          title: 'Coder',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '300'
            },
            {
              info: 'Member',
              value: '200'
            },
            {
              info: 'Visit',
              value: '1.4k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg8.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-8.jpg'),
          title: 'Themes',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '800'
            },
            {
              info: 'Member',
              value: '100'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        },
        {
          backgroundimg: require('../../../assets/images/page-img/profile-bg9.jpg'),
          exploreimg: require('../../../assets/images/page-img/gi-9.jpg'),
          title: 'Review',
          text: 'Lorem Ipsum data',
          otherinfo: [
            {
              info: 'post',
              value: '1200'
            },
            {
              info: 'Member',
              value: '1000'
            },
            {
              info: 'Visit',
              value: '1.2k'
            }
          ],
          exploreMember: [
            require('../../../assets/images/user/05.jpg'),
            require('../../../assets/images/user/06.jpg'),
            require('../../../assets/images/user/07.jpg'),
            require('../../../assets/images/user/08.jpg'),
            require('../../../assets/images/user/09.jpg')
          ]
        }
      ]
    }
  },
  mounted () {
    socialvue.index()
  }
}
</script>
