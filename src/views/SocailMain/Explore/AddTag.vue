<template>
  <div>
    <iq-card
      id="tag-modal-data"
      body-class="iq-card iq-card-block iq-card-stretch iq-card-height"
    >
      <template v-slot:headerTitle>
        <h4 class="card-title">
          Create Tag
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
              src="../../../assets/images/user/1.jpg"
            >
          </div>
          <form class="tag-text ml-3 w-100">
            <input
              v-model="tag.name"
              type="text"
              placeholder="Write the name of this tag..."
              class="rounded form-control"
              style="border:none;"
              maxlength="40"
            >
          </form>
        </div>
        <hr>
        <!-- <ul class="post-opt-block d-flex align-items-center list-inline m-0 p-0">
          <li class="iq-bg-primary rounded p-2 pointer mr-3">
            <a href="#" /><img
              src="../../../../assets/images/small/07.png"
              alt="icon"
              class="img-fluid"
            > Photo/Video
          </li>
          <li class="iq-bg-primary rounded p-2 pointer mr-3">
            <a href="#" /><img
              src="../../../../assets/images/small/08.png"
              alt="icon"
              class="img-fluid"
            > Tag Friend
          </li>
          <li class="iq-bg-primary rounded p-2 pointer mr-3">
            <a href="#" /><img
              src="../../../../assets/images/small/09.png"
              alt="icon"
              class="img-fluid"
            > Feeling/Activity
          </li>
          <li class="iq-bg-primary rounded p-2 pointer">
            <div class="iq-card-header-toolbar d-flex align-items-center">
              <div class="dropdown">
                <span
                  id="tag-option"
                  class="dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <i class="ri-more-fill" />
                </span>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="tag-option"
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
          </li>
        </ul> -->
      </div>
      <b-modal
        id="modal1"
        centered
        title="Create tag"
        hide-footer
      >
        <div class="d-flex align-items-center">
          <div class="user-img w-20">
            <img
              src="../../../assets/images/user/1.jpg"
              alt="userimg"
              class="avatar-60 rounded-circle img-fluid"
            >
          </div>
          <form class="tag-text ml-3 w-100">
            <input
              v-model="tag.name"
              type="text"
              placeholder="Write the name of this tag..."
              class="rounded form-control"
              style="border:none;"
              maxlength="40"
            >
          </form>
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
                    <p class="mb-0">This tag is visible to all users</p>
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
                    <p class="mb-0">This tag is only visible to your followers</p>
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
                    <p class="mb-0">Only yourself can see this tag</p>
                  </div>
                </div>
              </a>
            </b-dropdown>
          </div>
        </div>
        <hr>
        <!-- <ul class="d-flex flex-wrap align-items-center list-inline m-0 p-0">
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
        </ul> -->
        <!-- <div class="other-option">
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
                      <p class="mb-0">This tag is visible to all users</p>
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
                      <p class="mb-0">This tag is only visible to your followers</p>
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
                      <p class="mb-0">Only yourself can see this tag</p>
                    </div>
                  </div>
                </a>
              </b-dropdown>
            </div>
          </div>
        </div> -->
        <button
          class="btn btn-primary d-block w-100 mt-3"
          @click="addNewtag(tag)"
        >
          Add Tag
        </button>
      </b-modal>
    </iq-card>
  </div>
</template>

<script>
// import Post from '../../../../Model/Post'
export default {
  name: 'AddTag',
  data () {
    return {
      tag: {
        name: ''
      }
    //   tab: [
    //     {
    //       icon: require('../../../../assets/images/small/07.png'),
    //       name: ' Photo/Video'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/08.png'),
    //       name: ' Tag Friend'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/09.png'),
    //       name: 'Feeling/Activity'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/10.png'),
    //       name: 'Check in'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/11.png'),
    //       name: 'Live Video'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/12.png'),
    //       name: ' Gif'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/13.png'),
    //       name: 'Watch Party'
    //     },
    //     {
    //       icon: require('../../../../assets/images/small/14.png'),
    //       name: ' Play with Friends'
    //     }
    //   ]
    }
  },
  methods: {
    addNewTag (tag) {
    //   this.$emit('addtag', tag)
    //   this.tag = new tag()
    //   this.$bvModal.hide('modal1')
    },
    resetTag () {
    //   this.tag = new tag()
    },
    previewImage: function (event) {
      const files = event.target.files
      Object.keys(files).forEach(i => {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.tag.images.push(e.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
}
</script>
