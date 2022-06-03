<template>
  <b-row>
    <b-col sm="12">
      <iq-card class="iq-card">
        <div class="iq-card-body profile-page p-0">
          <div class="profile-header">
            <div class="cover-container">
              <img
                src="@/assets/images/page-img/profile-bg1.jpg"
                alt="profile-bg"
                class="rounded img-fluid"
              >
              <ul class="header-nav d-flex flex-wrap justify-end p-0 m-0">
                <b-button
                  v-b-modal.modal-1
                  pill
                  variant="light"
                  class="mr-4"
                >
                  <i class="ri-pencil-fill" />
                </b-button>
                <b-modal
                  id="modal-1"
                  centered
                  title="Edit Profile"
                  ok-title="Save Changes"
                  cancel-title="Close"
                  size="xl"
                  scrollable
                >
                  <ProfileEdit />
                </b-modal>
              </ul>
            </div>
            <div class="user-detail text-center mb-3">
              <div class="profile-img">
                <img
                  src="@/assets/images/user/1.jpg"
                  alt="profile-img"
                  class="avatar-130 img-fluid"
                >
              </div>
              <div class="profile-detail">
                <h3 class="">
                  Bni Cyst
                </h3>
              </div>
              <div />
            </div>
            <div
              class="profile-info p-4 d-flex align-items-center justify-content-between position-relative"
            >
              <!-- <div class="social-links">
                <ul class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                  <li
                    v-for="(item,index) in social"
                    :key="index"
                    class="text-center pr-3"
                  >
                    <a href="javasctipt:void(0)"><img
                      :src="item"
                      class="img-fluid rounded"
                      alt="facebook"
                    ></a>
                  </li>
                </ul>
              </div> -->
              <div class="social-info">
                <ul
                  class="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0"
                >
                  <li
                    v-for="(i, index) in soicalInfo"
                    :key="index"
                    class="text-center pl-3"
                  >
                    <h6>{{ i.name }}</h6>
                    <p class="mb-0">
                      {{ i.value }}
                    </p>
                  </li>
                </ul>
              </div>
              <div class="row justify-content-end">
                <b-badge
                  variant="primary"
                  style="margin-right: 1em"
                >
                  Nik Jon
                </b-badge>
                <b-badge
                  variant="primary"
                  style="margin-right: 1em"
                >
                  Book
                </b-badge>
                <b-badge
                  variant="primary"
                  style="margin-right: 1em"
                >
                  Food
                </b-badge>
              </div>
            </div>
          </div>
        </div>
      </iq-card>
      <iq-card class="iq-card">
        <div class="iq-card-body p-0">
          <div class="user-tabing">
            <tab-nav
              id="pills-tab"
              :pills="true"
              class="nav nav-pills d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
            >
              <tab-nav-items
                id="pills-feed-tab"
                class="col-sm-3 p-0"
                :active="true"
                href="#profile-feed"
                aria-controls="pills-home"
                role="tab"
                :aria-selected="true"
                title="Posts"
              />
              <tab-nav-items
                id="pills-activity-tab"
                class="col-sm-3 p-0"
                :active="false"
                href="#profile-activity"
                aria-controls="pills-profile"
                role="tab"
                :aria-selected="false"
                title="About"
              />
              <tab-nav-items
                id="pills-friend-tab"
                class="col-sm-3 p-0"
                :active="false"
                href="#profile-friends"
                aria-controls="pills-contact"
                role="tab"
                :aria-selected="false"
                title="Follow"
              />
              <tab-nav-items
                id="pills-profile-tab"
                class="col-sm-3 p-0"
                :active="false"
                href="#profile-profile"
                aria-controls="pills-contact"
                role="tab"
                :aria-selected="false"
                title="Collections"
              />
            </tab-nav>
          </div>
        </div>
      </iq-card>
    </b-col>
    <b-col sm="12">
      <div class="tab-content">
        <tab-content-item
          id="profile-feed"
          :active="true"
          aria-labelled-by="pills-feed-tab"
        >
          <div class="iq-card-body p-0">
            <b-row>
              <!-- <b-col lg="4">
                <iq-card>
                  <template v-slot:body>
                    <a href="#"><span class="badge badge-pill badge-primary font-weight-normal ml-auto mr-1">
                      <i class="ri-star-line" /></span> 27 Items for yoou</a>
                  </template>
                </iq-card>
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">
                      Life Event
                    </h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0">
                      <a href="#"> Create </a>
                    </p>
                  </template>
                  <div class="row iq-card-body">
                    <div
                      v-for="(event,index) in lifeEvent"
                      :key="index"
                      class="col-sm-12"
                    >
                      <div class="event-post position-relative">
                        <a href="#">
                          <img
                            :src="event.img"
                            alt="gallary-image"
                            class="img-fluid rounded"
                          ></a>
                        <div class="job-icon-position">
                          <div class="job-icon bg-primary p-2 d-inline-block rounded-circle">
                            <i class="ri-briefcase-line" />
                          </div>
                        </div>
                        <div class="iq-card-body text-center p-2">
                          <h5>{{ event.heading }}</h5>
                          <p>{{ event.date }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </iq-card>
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">
                      Photos
                    </h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0">
                      <a href="#">Add Photo </a>
                    </p>
                  </template>
                  <template v-slot:body>
                    <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                      <li
                        v-for="(photo,index) in phtoes"
                        :key="index"
                        class="col-md-4 col-6 pl-2 pr-0 pb-3"
                      >
                        <a href="#"><img
                          :src="photo"
                          alt="gallary-image"
                          class="img-fluid"
                        ></a>
                      </li>
                    </ul>
                  </template>
                </iq-card>
                <iq-card>
                  <template v-slot:headerTitle>
                    <h4 class="card-title">
                      Friends
                    </h4>
                  </template>
                  <template v-slot:headerAction>
                    <p class="m-0">
                      <a href="javacsript:void();">Add New </a>
                    </p>
                  </template>
                  <template v-slot:body>
                    <ul class="profile-img-gallary d-flex flex-wrap p-0 m-0">
                      <li
                        v-for="(friend,index) in friends"
                        :key="index"
                        class="col-md-4 col-6 pl-2 pr-0 pb-3"
                      >
                        <a href="#">
                          <img
                            :src="friend.img"
                            alt="gallary-image"
                            class="img-fluid"
                          ></a>
                        <h6 class="mt-2">
                          {{ friend.name }}
                        </h6>
                      </li>
                    </ul>
                  </template>
                </iq-card>
              </b-col> -->
              <b-col lg="12">
                <div
                  id="post-modal-data"
                  class="iq-card"
                >
                  <!-- <AddSocialPost @addPost="addPost" /> -->
                  <div
                    v-for="post in socialPosts"
                    :key="post.id"
                  >
                    <SocialPost :post="post" />
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
        </tab-content-item>
        <tab-content-item
          id="profile-activity"
          :active="false"
          aria-labelled-by="pills-activity-tab"
        >
          <div class="iq-card">
            <div class="iq-card-body">
              <About />
            </div>
          </div>
        </tab-content-item>
        <tab-content-item
          id="profile-friends"
          :active="false"
          aria-labelled-by="pills-friend-tab"
        >
          <div class="iq-card">
            <div class="iq-card-body">
              <!-- <h2>Friends</h2> -->
              <FriendTab />
            </div>
          </div>
        </tab-content-item>
        <tab-content-item
          id="profile-profile"
          :active="false"
          aria-labelled-by="pills-profile-tab"
        >
          <iq-card>
            <template v-slot:body>
              <h2>Photos</h2>
              <tab-nav
                id="pills"
                :pills="true"
                class="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
              >
                <tab-nav-items
                  id="pills-photo-you-tab"
                  li-class=" "
                  :active="true"
                  href="#photo-you"
                  aria-controls="pills-photo-you"
                  role="tab"
                  :aria-selected="true"
                  title="Photo of you"
                />
                <tab-nav-items
                  id="pills-your-photo-tab"
                  li-class=" "
                  :active="false"
                  href="#your-photo"
                  aria-controls="pills-your-photo"
                  role="tab"
                  :aria-selected="false"
                  title="your photo"
                />
              </tab-nav>
              <div class="tab-content">
                <tab-content-item
                  id="photo-you"
                  :active="true"
                  aria-labelled-by="pills-photo-you-tab"
                >
                  <b-row>
                    <b-col
                      v-for="(item, index) in profileImages"
                      :key="index"
                      md="6"
                      lg="3"
                      class="mb-3"
                    >
                      <div
                        class="user-images position-relative overflow-hidden"
                      >
                        <a href="#">
                          <img
                            :src="item.img"
                            class="img-fluid rounded"
                            alt="Responsive image"
                          >
                        </a>
                        <div class="image-hover-data">
                          <div class="product-elements-icon">
                            <ul
                              class="d-flex align-items-center m-0 p-0 list-inline"
                            >
                              <li
                                v-for="(item, index1) in item.otherInfo"
                                :key="index1"
                              >
                                <a
                                  href="#"
                                  class="pr-3 text-white"
                                >
                                  {{ item.value }} <i :class="item.class" />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <a
                          href="#"
                          class="image-edit-btn"
                          data-toggle="tooltip"
                          data-placement="top"
                          title=""
                          data-original-title="Edit or Remove"
                        ><i
                          class="ri-edit-2-fill"
                        /></a>
                      </div>
                    </b-col>
                  </b-row>
                </tab-content-item>
                <tab-content-item
                  id="your-photo"
                  :active="false"
                  aria-labelled-by="pills-your-photo-tab"
                >
                  <ProfileImage />
                </tab-content-item>
              </div>
            </template>
          </iq-card>
        </tab-content-item>
      </div>
    </b-col>
    <div class="col-sm-12 text-center">
      <img
        src="@/assets/images/page-img/page-load-loader.gif"
        alt="loader"
        style="height: 100px"
      >
    </div>
  </b-row>
</template>

<script>
import { socialvue } from '@/config/pluginInit'
import AddSocialPost from '../../Apps/Social/Components/AddSocialPost'
import ProfileEdit from '@/views/User/ProfileEdit'
import Post from '@/Model/Post'
import { Posts } from '@/FackApi/api/SocialPost'
import SocialPost from '../../Apps/Social/Components/SocialPost'
import About from './ProfileFriends/About'
import FriendTab from './ProfileFriends/FriendTab'
import ProfileImage from './ProfileImage'
export default {
  name: 'Profile',
  components: {
    FriendTab,
    ProfileImage,
    // AddSocialPost,
    ProfileEdit,
    SocialPost,
    About,
  },
  data() {
    return {
      post: new Post(),
      socialPosts: Posts,
      social: [
        require('@/assets/images/icon/08.png'),
        require('@/assets/images/icon/09.png'),
        require('@/assets/images/icon/10.png'),
        require('@/assets/images/icon/11.png'),
        require('@/assets/images/icon/12.png'),
        require('@/assets/images/icon/13.png'),
      ],
      lifeEvent: [
        {
          img: require('@/assets/images/page-img/07.jpg'),
          heading: 'Started New Job at Apple',
          date: 'January 24, 2019',
        },
        {
          img: require('@/assets/images/page-img/08.jpg'),
          heading: 'Freelance Photographer',
          date: 'January 24, 2019',
        },
      ],
      friends: [
        {
          img: require('@/assets/images/user/05.jpg'),
          name: 'Anna Rexia',
        },
        {
          img: require('@/assets/images/user/06.jpg'),
          name: 'Tara Zona',
        },
        {
          img: require('@/assets/images/user/07.jpg'),
          name: 'Polly Tech',
        },
        {
          img: require('@/assets/images/user/08.jpg'),
          name: 'Bill Emia',
        },
        {
          img: require('@/assets/images/user/09.jpg'),
          name: 'Moe Fugga',
        },
        {
          img: require('@/assets/images/user/10.jpg'),
          name: 'Hal Appeno ',
        },
        {
          img: require('@/assets/images/user/09.jpg'),
          name: 'Zack Lee',
        },
        {
          img: require('@/assets/images/user/07.jpg'),
          name: 'Terry Aki',
        },
        {
          img: require('@/assets/images/user/08.jpg'),
          name: 'Greta Life',
        },
      ],
      soicalInfo: [
        {
          name: 'Post',
          value: 690,
        },
        {
          name: 'Followers',
          value: 90,
        },
        {
          name: 'Following',
          value: 100,
        },
      ],
      phtoes: [
        require('@/assets/images/page-img/g1.jpg'),
        require('@/assets/images/page-img/g1.jpg'),
        require('@/assets/images/page-img/g2.jpg'),
        require('@/assets/images/page-img/g3.jpg'),
        require('@/assets/images/page-img/g4.jpg'),
        require('@/assets/images/page-img/g5.jpg'),
        require('@/assets/images/page-img/g6.jpg'),
        require('@/assets/images/page-img/g7.jpg'),
        require('@/assets/images/page-img/g8.jpg'),
      ],

      profileImages: [
        {
          img: require('@/assets/images/page-img/51.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/52.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/53.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 120,
            },
            {
              class: 'ri-chat-3-line',
              value: 21,
            },
            {
              class: 'ri-share-forward-line',
              value: 10,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/54.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 100,
            },
            {
              class: 'ri-chat-3-line',
              value: 20,
            },
            {
              class: 'ri-share-forward-line',
              value: 120,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/55.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 107,
            },
            {
              class: 'ri-chat-3-line',
              value: 20,
            },
            {
              class: 'ri-share-forward-line',
              value: 101,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/56.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 105,
            },
            {
              class: 'ri-chat-3-line',
              value: 25,
            },
            {
              class: 'ri-share-forward-line',
              value: 15,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/57.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 107,
            },
            {
              class: 'ri-chat-3-line',
              value: 27,
            },
            {
              class: 'ri-share-forward-line',
              value: 17,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/58.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 106,
            },
            {
              class: 'ri-chat-3-line',
              value: 26,
            },
            {
              class: 'ri-share-forward-line',
              value: 14,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/51.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/52.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/53.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 120,
            },
            {
              class: 'ri-chat-3-line',
              value: 21,
            },
            {
              class: 'ri-share-forward-line',
              value: 10,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/54.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 100,
            },
            {
              class: 'ri-chat-3-line',
              value: 20,
            },
            {
              class: 'ri-share-forward-line',
              value: 120,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/55.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 107,
            },
            {
              class: 'ri-chat-3-line',
              value: 20,
            },
            {
              class: 'ri-share-forward-line',
              value: 101,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/56.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 105,
            },
            {
              class: 'ri-chat-3-line',
              value: 25,
            },
            {
              class: 'ri-share-forward-line',
              value: 15,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/57.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 107,
            },
            {
              class: 'ri-chat-3-line',
              value: 27,
            },
            {
              class: 'ri-share-forward-line',
              value: 17,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/58.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 106,
            },
            {
              class: 'ri-chat-3-line',
              value: 26,
            },
            {
              class: 'ri-share-forward-line',
              value: 14,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/51.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/52.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 10,
            },
            {
              class: 'ri-chat-3-line',
              value: 2,
            },
            {
              class: 'ri-share-forward-line',
              value: 1,
            },
          ],
        },
        {
          img: require('@/assets/images/page-img/53.jpg'),
          otherInfo: [
            {
              class: 'ri-thumb-up-line',
              value: 120,
            },
            {
              class: 'ri-chat-3-line',
              value: 21,
            },
            {
              class: 'ri-share-forward-line',
              value: 10,
            },
          ],
        },
      ],
    }
  },
  mounted() {
    socialvue.index()
  },
  methods: {
    addPost(post) {
      this.socialPosts.unshift(post)
    },
  },
}
</script>

<style scoped>
.profile-header .user-detail {
  left: 50% !important;
  width: 200px;
  transform: translateX(-50%);
}
</style>
