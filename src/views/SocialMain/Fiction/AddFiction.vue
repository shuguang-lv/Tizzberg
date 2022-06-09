<template>
  <div>
    <iq-card
      id="fiction-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:headerTitle>
        <h4 class="card-title">
          Create Fiction
        </h4>
      </template>
      <div
        v-b-modal.modal1
        class="iq-card-body"
      >
        <div class="d-flex align-items-center">
          <form class="fiction-text ml-3 w-100">
            <input
              v-model="fiction.title"
              type="text"
              placeholder="Write the title of fiction here..."
              class="rounded form-control"
              style="margin-bottom:1em;"
            >
            <b-textarea
              v-model="fiction.description"
              type="text"
              placeholder="Write simple description here..."
              class="rounded form-control"
              style="margin-top: 1em; height:5em;"
            />
            <b-textarea
              v-model="fiction.content"
              type="text"
              placeholder="Write your fiction here..."
              class="rounded form-control"
              style="margin-top: 1em; height:15em;"
            />
          </form>
        </div>
        <hr>
      </div>
      <b-modal
        id="modal1"
        centered
        title="Create fiction"
        hide-footer
      >
        <div class="d-flex align-items-center">
          <!-- <div class="user-img">
            <img
              src="../../../assets/images/user/1.jpg"
              alt="userimg"
              class="avatar-60 rounded-circle img-fluid"
            >
          </div> -->
          <form class="fiction-text ml-3 w-100">
            <input
              v-model="fiction.title"
              type="text"
              placeholder="Write the title of fiction here..."
              class="rounded form-control"
              style="margin-bottom:1em;"
            >
            <b-textarea
              v-model="fiction.description"
              type="text"
              placeholder="Write simple description here..."
              class="rounded form-control"
              style="margin-top: 1em; height:10em;"
            />
            <b-textarea
              v-model="fiction.content"
              type="text"
              placeholder="Write your fiction here..."
              class="rounded form-control"
              style="margin-top: 1em; height:20em;"
            />
          </form>
        </div>
        <hr>
        <ul class="d-flex flex-wrap align-items-center list-inline m-0 p-0">
          <li
            v-for="(item,index) in tab"
            :key="index"
            class="col-md-6 mb-3"
          >
            <div class="iq-bg-primary rounded p-2 pointer mr-3">
              <a href="#" /><img
                :src="item.icon"
                alt="icon"
                class="img-fluid"
              >
              {{ item.name }}
            </div>
          </li>
        </ul>
        <div class="other-option">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center">
              <div class="user-img mr-3">
                <img
                  src="../../../assets/images/user/1.jpg"
                  alt="userimg"
                  class="avatar-60 rounded-circle img-fluid"
                >
              </div>
              <h6>Your Story</h6>
            </div>
            <!-- <div class="iq-card-fiction-toolbar">
              <b-dropdown
                id="dropdownMenuButton40"
                right
                variant="none"
                menu-class="p-0"
              >
                <template v-slot:button-content>
                  <button
                    href="#"
                    class="dropdown-toggle btn btn-primary"
                  >
                    Friends
                  </button>
                </template>
                <b-dropdown-item
                  href="#"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="d-flex align-items-top">
                      <i class="ri-save-line" />
                    </div>
                    <div class="data ml-2">
                      <h6>Public</h6>
                      <p class="mb-0">
                        Anyone on or off Facebook
                      </p>
                    </div>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item
                  href="#"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="d-flex align-items-top">
                      <i class="ri-close-circle-line" />
                    </div>
                    <div class="data ml-2">
                      <h6>Friends</h6>
                      <p class="mb-0">
                        Your friend on facebook
                      </p>
                    </div>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item
                  href="#"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="d-flex align-items-top">
                      <i class="ri-user-unfollow-line" />
                    </div>
                    <div class="data ml-2">
                      <h6>Friend expect</h6>
                      <p class="mb-0">
                        Dont show to some friend
                      </p>
                    </div>
                  </div>
                </b-dropdown-item>
                <b-dropdown-item
                  href="#"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="d-flex align-items-top">
                      <i class="ri-notification-line" />
                    </div>
                    <div class="data ml-2">
                      <h6>Only me</h6>
                      <p class="mb-0">
                        Only me
                      </p>
                    </div>
                  </div>
                </b-dropdown-item>
              </b-dropdown>
            </div> -->
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <b-dropdown
                id="dropdownMenuButton-visibility"
                right
                variant="none"
                menu-class="p-0"
              >
                <template v-slot:button-content>
                  <b-link
                    href="javascript:void(0)"
                    class="text-secondary"
                  >
                    <i class="ml-3 ri-eye-line" />
                  </b-link>
                </template>
                <a
                  class="dropdown-item p-3"
                  href="javascript:void(0)"
                >
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-open-arm-line" /></div>
                    <div class="data ml-2">
                      <span>
                        <h6> Public </h6>
                      </span>
                      <p class="mb-0">All user can write sequel of this fiction</p>
                    </div>
                  </div>
                </a>
                <a
                  href="javascript:void(0)"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-group-line" /></div>
                    <div class="data ml-2">
                      <h6>Cooperate</h6>
                      <p class="mb-0">Only invited user can write sequel of this fiction</p>
                    </div>
                  </div>
                </a>
                <a
                  href="javascript:void(0)"
                  class="dropdown-item p-3"
                >
                  <div class="d-flex align-items-top">
                    <div class="icon font-size-20"><i class="ri-git-repository-private-line" /></div>
                    <div class="data ml-2">
                      <h6>Personal</h6>
                      <p class="mb-0">Only yourself can write sequel of this fiction</p>
                    </div>
                  </div>
                </a>
              </b-dropdown>
            </div>
          </div>
        </div>
        <button
          class="btn btn-primary d-block w-100 mt-3"
          @click="addNewfiction(fiction)"
        >
          Upload
        </button>
      </b-modal>
    </iq-card>
  </div>
</template>

<script>
// import fiction from '../../../../Model/Event'
export default {
  name: 'AddFiction',
  data () {
    return {
      fiction: {
        description: '',
        content: '',
        title: ''
      } ,
      // tab: [
      //   {
      //     icon: require('../../../../assets/images/small/07.png'),
      //     name: ' Photo/Video'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/08.png'),
      //     name: ' Tag Friend'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/09.png'),
      //     name: 'Feeling/Activity'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/10.png'),
      //     name: 'Check in'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/11.png'),
      //     name: 'Live Video'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/12.png'),
      //     name: ' Gif'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/13.png'),
      //     name: 'Watch Party'
      //   },
      //   {
      //     icon: require('../../../../assets/images/small/14.png'),
      //     name: ' Play with Friends'
      //   }
      // ]
    }
  },
  methods: {
    addNewFiction (fiction) {
      this.$emit('addfiction', fiction)
      this.fiction = new fiction()
      this.$bvModal.hide('modal1')
    },
    resetFiction () {
      // this.fiction = new fiction()
    },
    previewImage: function (event) {
      const files = event.target.files
      Object.keys(files).forEach(i => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.fiction.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
