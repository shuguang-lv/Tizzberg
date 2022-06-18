<template>
  <div>
    <iq-card
      id="post-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:headerTitle>
        <h4 class="card-title">
          Create Post
        </h4>
      </template>
      <div
        v-b-modal.modal1
        class="iq-card-body"
      >
        <div class="d-flex align-items-center">
          <div class="user-img">
            <img
              class="avatar-60 rounded-circle"
              src="@/assets/images/user/1.jpg"
            >
          </div>
          <form class="post-text ml-3 w-100">
            <b-form-textarea
              v-model="post.description"
              placeholder="Write something about post... (500 words maximum)"
              max-rows="10"
              :formatter="postFormatter"
              :trim="true"
            />
          </form>
        </div>
        <hr>
        <ul class="post-opt-block d-flex align-items-center list-inline m-0 p-0">
          <li
            v-for="(item,index) in tab"
            :key="index"
            class="iq-bg-primary rounded p-2 pointer mr-3"
          >
            <div class="iq-bg-primary rounded p-2 pointer mr-3">
              <i
                :class="item.icon + ' ri-xl' + ' mx-2'"
                style="vertical-align: middle;"
              />
              {{ item.name }}
            </div>
          </li>
          <!-- <li class="iq-bg-primary rounded p-2 pointer mr-3">
            <a href="#" /><img
              src="@/assets/images/small/09.png"
              alt="icon"
              class="img-fluid"
            > Feeling/Activity
          </li>
          <li class="iq-bg-primary rounded p-2 pointer">
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <div class="dropdown">
                <span
                  id="post-option"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="ri-more-fill" />
                </span>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="post-option"
                  style=""
                >
                  <a
                    class="dropdown-item"
                    href="#"
                  >Check in</a>
                  <a
                    class="dropdown-item"
                    href="#"
                  >Live Video</a>
                  <a
                    class="dropdown-item"
                    href="#"
                  >Gif</a>
                  <a
                    class="dropdown-item"
                    href="#"
                  >Watch Party</a>
                  <a
                    class="dropdown-item"
                    href="#"
                  >Play with Friend</a>
                </div>
              </div>
            </div>
          </li> -->
        </ul>
      </div>
      <b-modal
        id="modal1"
        ref="create-post-modal"
        centered
        title="Create Post"
        hide-footer
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        @close="closeModal"
      >
        <div class="d-flex align-items-center">
          <div class="user-img">
            <img
              src="@/assets/images/user/1.jpg"
              alt="userimg"
              class="avatar-60 rounded-circle img-fluid"
            >
          </div>
          <form class="post-text ml-3 w-100">
            <b-form-textarea
              v-model="post.description"
              placeholder="Write something about post... (500 words maximum)"
              max-rows="10"
              :formatter="postFormatter"
              :trim="true"
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
              <i
                :class="item.icon + ' ri-xl' + ' mx-2'"
                style="vertical-align: middle;"
              />
              {{ item.name }}
            </div>
          </li>
        </ul>
        <div class="other-option">
          <div class="d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center pl-2">
              <!-- <div class="user-img mr-3">
                <img
                  src="@/assets/images/user/1.jpg"
                  alt="userimg"
                  class="avatar-60 rounded-circle img-fluid"
                >
              </div> -->
              <h6>#Tags</h6>
            </div>
            <!-- <div class="iq-card-post-toolbar">
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
                      <p class="mb-0">This post is visible to all users</p>
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
                      <h6>Follower</h6>
                      <p class="mb-0">This post is only visible to your followers</p>
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
                      <h6>Private</h6>
                      <p class="mb-0">Only yourself can see this post</p>
                    </div>
                  </div>
                </a>
              </b-dropdown>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between px-2 mt-2">
          <b-button
            variant="outline-primary"
            style="width: 48%;"
          >
            Save as draft
          </b-button>
          <b-button
            variant="primary"
            style="width: 48%;"
            @click="addNewPost(post)"
          >
            Post
          </b-button>
        </div>
      </b-modal>
      <b-modal
        ref="discard-post-modal"
        hide-header
        ok-title="Discard"
        cancel-title="Nevermind"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true"
        @cancel="$refs['discard-post-modal'].hide()"
        @ok="discardPost"
      >
        <div class="d-block text-center">
          <h4>Discard this post? </h4>
        </div>
      </b-modal>
    </iq-card>
  </div>
</template>

<script>
import Post from '@/Model/Post'
export default {
  name: 'AddSocialPost',
  data() {
    return {
      post: new Post(),
      tab: [
        {
          icon: 'ri-image-fill',
          name: 'Photo/Video',
        },
        {
          icon: 'ri-price-tag-3-fill',
          name: 'Tags',
        },
        // {
        //   icon: require('@/assets/images/small/09.png'),
        //   name: 'Feeling/Activity'
        // },
        // {
        //   icon: require('@/assets/images/small/10.png'),
        //   name: 'Check in'
        // },
        // {
        //   icon: require('@/assets/images/small/11.png'),
        //   name: 'Live Video'
        // },
        // {
        //   icon: require('@/assets/images/small/12.png'),
        //   name: ' Gif'
        // },
        // {
        //   icon: require('@/assets/images/small/13.png'),
        //   name: 'Watch Party'
        // },
        // {
        //   icon: require('@/assets/images/small/14.png'),
        //   name: ' Play with Friends'
        // }
      ],
    }
  },
  beforeMount() {
    const lastPost = JSON.parse(window.localStorage.getItem('last-post'))
    this.post = lastPost || this.post
    window.addEventListener('beforeunload', () => {
      if (this.post.description.trim()) {
        window.localStorage.setItem('last-post', JSON.stringify(this.post))
      } else {
        window.localStorage.removeItem('last-post')
      }
    })
  },
  methods: {
    addNewPost(post) {
      this.$emit('addPost', post)
      this.post = new Post()
      this.$bvModal.hide('modal1')
    },
    resetPost() {
      this.post = new Post()
    },
    previewImage: function(event) {
      const files = event.target.files
      Object.keys(files).forEach((i) => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.post.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    },
    postFormatter(content) {
      if (content.length && content.match(/\S+/g).length > 500) {
        return content.split(/\s+/, 500).join(' ')
      } else {
        return content
      }
    },
    closeModal(bvModalEvent) {
      bvModalEvent.preventDefault()
      this.$refs['discard-post-modal'].show()
    },
    discardPost() {
      this.post = new Post()
      this.$refs['create-post-modal'].hide()
    },
  },
}
</script>
