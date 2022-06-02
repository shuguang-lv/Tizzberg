<template>
  <div class="friend-list-tab mt-2">
    <tab-nav
      id="tab"
      :pills="true"
      class="nav nav-pills d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
    >
      <tab-nav-items
        id="pills-all-friends"
        li-class=" "
        :active="true"
        href="#all-friends"
        aria-controls="pills-all-friends"
        role="tab"
        :aria-selected="true"
        title="Followers"
      />
      <!-- <tab-nav-items
        id="pills-recently-add"
        li-class=" "
        :active="false"
        href="#recently-add"
        aria-controls="pills-recently-add"
        role="tab"
        :aria-selected="false"
        title="Recently Added"
      /> -->
      <!-- <tab-nav-items
        id="pills-closefriends"
        li-class=" "
        :active="false"
        href="#closefriends"
        aria-controls="pills-closefriends"
        role="tab"
        :aria-selected="false"
        title="Close friends"
      />
      <tab-nav-items
        id="pills-home"
        li-class=" "
        :active="false"
        href="#home"
        aria-controls="pills-home"
        role="tab"
        :aria-selected="false"
        title="Home/Town"
      /> -->
      <tab-nav-items
        id="pills-following-add"
        li-class=" "
        :active="false"
        href="#recently-add"
        aria-controls="pills-recently-add"
        role="tab"
        :aria-selected="false"
        title="Following"
      />
    </tab-nav>
    <div class="tab-content">
      <tab-content-item
        id="all-friends"
        :active="true"
        aria-labelled-by="pills-all-friends"
      >
        <div class="iq-card-body p-0">
          <div class="row">
            <div
              v-for="(fried,index1) in frieds"
              :key="index1"
              class="col-md-6 col-lg-6 mb-3"
            >
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img
                        :src="fried.img"
                        alt="profile-img"
                        class="img-fluid"
                      >
                    </a>
                    <div class="friend-info ml-3">
                      <h5>{{ fried.name }}</h5>
                      <p class="mb-0">
                        {{ fried.friend }}
                      </p>
                    </div>
                  </div>
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <div class="dropdown">
                      <span
                        id="dropdownMenuButton01"
                        class="dropdown-toggle btn btn-secondary mr-2"
                        data-toggle="dropdown"
                        aria-expanded="true"
                        role="button"
                      >
                        <i class="ri-check-line mr-1 text-white font-size-16" /> Friend
                      </span>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton01"
                      >
                        <a
                          class="dropdown-item"
                          href="#"
                        >Get Notification</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Close Friend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfollow</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfriend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Block</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>
      <tab-content-item
        id="recently-add"
        :active="true"
        aria-labelled-by="pills-recently-add"
      >
        <div class="iq-card-body p-0">
          <div class="row">
            <div
              v-for="(item,index) in recentlyAdded"
              :key="index"
              class="col-md-6 col-lg-6 mb-3"
            >
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img
                        :src="item.img"
                        alt="profile-img"
                        class="img-fluid"
                      >
                    </a>
                    <div class="friend-info ml-3">
                      <h5>{{ item.name }}</h5>
                      <p class="mb-0">
                        {{ item.friend }}
                      </p>
                    </div>
                  </div>
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <div class="dropdown">
                      <span
                        id="dropdownMenuButton31"
                        class="dropdown-toggle btn btn-secondary mr-2"
                        data-toggle="dropdown"
                        aria-expanded="true"
                        role="button"
                      >
                        <i class="ri-check-line mr-1 text-white font-size-16" /> Friend
                      </span>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton31"
                      >
                        <a
                          class="dropdown-item"
                          href="#"
                        >Get Notification</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Close Friend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfollow</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfriend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Block</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>
      <tab-content-item
        id="closefriends"
        :active="true"
        aria-labelled-by="pills-closefriends"
      >
        <div class="iq-card-body p-0">
          <div class="row">
            <div
              v-for="(closefriend, index) in closeFriend"
              :key="index"
              class="col-md-6 col-lg-6 mb-3"
            >
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img
                        :src="closefriend.img"
                        alt="profile-img"
                        class="img-fluid"
                      >
                    </a>
                    <div class="friend-info ml-3">
                      <h5>{{ closefriend.name }}</h5>
                      <p class="mb-0">
                        {{ closefriend.friend }}
                      </p>
                    </div>
                  </div>
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <div class="dropdown">
                      <span
                        id="dropdownMenuButton39"
                        class="dropdown-toggle btn btn-secondary mr-2"
                        data-toggle="dropdown"
                        aria-expanded="true"
                        role="button"
                      >
                        <i class="ri-check-line mr-1 text-white font-size-16" /> Friend
                      </span>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton39"
                      >
                        <a
                          class="dropdown-item"
                          href="#"
                        >Get Notification</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Close Friend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfollow</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfriend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Block</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>
      <tab-content-item
        id="home"
        :active="true"
        aria-labelled-by="pills-home"
      >
        <div class="iq-card-body p-0">
          <div class="row">
            <div
              v-for="(home,index) in homeTown"
              :key="index"
              class="col-md-6 col-lg-6 mb-3"
            >
              <div class="iq-friendlist-block">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <a href="#">
                      <img
                        :src="home.img"
                        alt="profile-img"
                        class="img-fluid"
                      >
                    </a>
                    <div class="friend-info ml-3">
                      <h5>{{ home.name }}</h5>
                      <p class="mb-0">
                        {{ home.friend }}
                      </p>
                    </div>
                  </div>
                  <div class="iq-card-header-toolbar d-flex align-items-center">
                    <div class="dropdown">
                      <span
                        id="dropdownMenuButton49"
                        class="dropdown-toggle btn btn-secondary mr-2"
                        data-toggle="dropdown"
                        aria-expanded="true"
                        role="button"
                      >
                        <i class="ri-check-line mr-1 text-white font-size-16" /> Friend
                      </span>
                      <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton49"
                      >
                        <a
                          class="dropdown-item"
                          href="#"
                        >Get Notification</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Close Friend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfollow</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Unfriend</a>
                        <a
                          class="dropdown-item"
                          href="#"
                        >Block</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab-content-item>
    </div>
  </div>
</template>

<script>
import { socialvue } from '../../../../config/pluginInit'
export default {
  name: 'FriendTab',
  components: {
  },
  data () {
    return {
      frieds: [
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Jaques Amole',
          friend: '40  friends'
        },
        {
          img: require('../../../../assets/images/user/06.jpg'),
          name: 'Lucy Tania',
          friend: '12  friends'
        },
        {
          img: require('../../../../assets/images/user/07.jpg'),
          name: 'Val Adictorian',
          friend: '0  friends'
        },
        {
          img: require('../../../../assets/images/user/08.jpg'),
          name: 'Manny Petty',
          friend: '3  friends'
        },
        {
          img: require('../../../../assets/images/user/09.jpg'),
          name: 'Marsha Mello',
          friend: '15  friends'
        },
        {
          img: require('../../../../assets/images/user/10.jpg'),
          name: 'Caire Innet',
          friend: '8  friends'
        },
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Paul Misunday',
          friend: '6  friends'
        },
        {
          img: require('../../../../assets/images/user/13.jpg'),
          name: 'Reanne Carnation',
          friend: '12  friends'
        }
      ],
      recentlyAdded: [
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Jaques Amole',
          friend: '40  friends'
        },
        {
          img: require('../../../../assets/images/user/06.jpg'),
          name: 'Lucy Tania',
          friend: '12  friends'
        },
        {
          img: require('../../../../assets/images/user/07.jpg'),
          name: 'Val Adictorian',
          friend: '0  friends'
        },
        {
          img: require('../../../../assets/images/user/08.jpg'),
          name: 'Manny Petty',
          friend: '3  friends'
        },
        {
          img: require('../../../../assets/images/user/09.jpg'),
          name: 'Marsha Mello',
          friend: '15  friends'
        },
        {
          img: require('../../../../assets/images/user/10.jpg'),
          name: 'Caire Innet',
          friend: '8  friends'
        }
      ],
      closeFriend: [
        {
          img: require('../../../../assets/images/user/07.jpg'),
          name: 'Val Adictorian',
          friend: '0  friends'
        },
        {
          img: require('../../../../assets/images/user/08.jpg'),
          name: 'Manny Petty',
          friend: '3  friends'
        },
        {
          img: require('../../../../assets/images/user/09.jpg'),
          name: 'Marsha Mello',
          friend: '15  friends'
        },
        {
          img: require('../../../../assets/images/user/10.jpg'),
          name: 'Caire Innet',
          friend: '8  friends'
        },
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Paul Misunday',
          friend: '6  friends'
        },
        {
          img: require('../../../../assets/images/user/13.jpg'),
          name: 'Reanne Carnation',
          friend: '12  friends'
        }
      ],
      homeTown: [
        {
          img: require('../../../../assets/images/user/08.jpg'),
          name: 'Manny Petty',
          friend: '3  friends'
        },
        {
          img: require('../../../../assets/images/user/09.jpg'),
          name: 'Marsha Mello',
          friend: '15  friends'
        },
        {
          img: require('../../../../assets/images/user/10.jpg'),
          name: 'Caire Innet',
          friend: '8  friends'
        },
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Paul Misunday',
          friend: '6  friends'
        }
      ],
      follwing: [
        {
          img: require('../../../../assets/images/user/09.jpg'),
          name: 'Marsha Mello',
          friend: '15  friends'
        },
        {
          img: require('../../../../assets/images/user/10.jpg'),
          name: 'Caire Innet',
          friend: '8  friends'
        },
        {
          img: require('../../../../assets/images/user/05.jpg'),
          name: 'Paul Misunday',
          friend: '6  friends'
        },
        {
          img: require('../../../../assets/images/user/13.jpg'),
          name: 'Reanne Carnation',
          friend: '12  friends'
        }
      ]
    }
  },
  mounted () {
    socialvue.index()
  }
}
</script>
