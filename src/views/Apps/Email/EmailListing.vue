<template>
  <b-row>
    <b-col lg="3">
      <iq-card>
        <template v-slot:body>
          <div class="iq-email-list">
            <b-button
              v-b-modal.compose-email-popup
              variant="primary"
              size="lg"
              class="font-size-16 p-3 mb-3"
              block
            >
              <i class="ri-send-plane-line mr-2" />New Message
            </b-button>
            <tab-nav
              id="myTab"
              :pills="true"
              vertical
              class="iq-email-ui"
              @change="updateTab"
            >
              <tab-nav-items
                id="mail-inbox-tab"
                li-class="nav-link p-0"
                :active="true"
                aria-controls="mail-inbox"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-mail-line" />Inbox<span class="badge badge-primary ml-2">4</span>
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-starred-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-starred"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-star-line" />Starred
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-snoozed-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-snoozed"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-time-line" />Snoozed
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-draft-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-draft"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-file-list-2-line" />Draft
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-sent-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-sent"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-mail-send-line" />Sent Mail
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-trash-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-trash"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-delete-bin-line" />Trash
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-important-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-important"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-bookmark-line" />Important
                </template>
              </tab-nav-items>
              <tab-nav-items
                id="mail-spam-tab"
                li-class="nav-link p-0"
                :active="false"
                aria-controls="mail-spam"
                role="tab"
                :aria-selected="true"
              >
                <template v-slot:title>
                  <i class="ri-spam-line" />Spam
                </template>
              </tab-nav-items>
            </tab-nav>
            <h6 class="mt-4 mb-3">
              Labels
            </h6>
            <ul class="iq-email-ui iq-email-label">
              <li><a href="#"><i class="ri-focus-fill text-primary" />Personal</a></li>
              <li><a href="#"><i class="ri-focus-fill text-danger" />Company</a></li>
              <li><a href="#"><i class="ri-focus-fill text-success" />Important</a></li>
              <li><a href="#"><i class="ri-focus-fill text-info" />Private</a></li>
              <li><a href="#"><i class="ri-focus-fill text-warning" />Private</a></li>
              <li><a href="#"><i class="ri-add-circle-line" />Add New Labels</a></li>
            </ul>
            <div class="iq-progress-bar-linear d-inline-block w-100">
              <h6 class="mt-4 mb-3">
                Storage
              </h6>
              <div class="iq-progress-bar-linear d-inline-block w-100">
                <b-progress
                  :value="95"
                  class="iq-progress-bar"
                  variant="danger"
                />
              </div>
              <span class="mt-1 d-inline-block w-100">13.02 GB (95%) of 15 GB used</span>
            </div>
          </div>
        </template>
      </iq-card>
    </b-col>
    <b-col lg="9">
      <iq-card>
        <div class="iq-email-to-list p-3">
          <div class="d-flex justify-content-between">
            <ul>
              <li>
                <a href="#">
                  <div class="custom-control custom-checkbox">
                    <input
                      id="customCheck1"
                      type="checkbox"
                      class="custom-control-input"
                    >
                    <label
                      class="custom-control-label"
                      for="customCheck1"
                    ><i class="ri-arrow-down-s-line" /></label>
                  </div>
                </a>
              </li>
              <li
                v-b-tooltip.top
                title="Reload"
              >
                <a href="#"><i class="ri-restart-line" /></a>
              </li>
              <li
                v-b-tooltip.top
                title="Archive"
              >
                <a href="#"><i class="ri-mail-open-line" /></a>
              </li>
              <li
                v-b-tooltip.top
                title="Delete"
              >
                <a href="#"><i class="ri-delete-bin-line" /></a>
              </li>
              <li
                v-b-tooltip.top
                title="Inbox"
              >
                <a href="#"><i class="ri-mail-unread-line" /></a>
              </li>
              <li
                v-b-tooltip.top
                title="Zoom"
              >
                <a href="#"><i class="ri-drag-move-2-line" /></a>
              </li>
            </ul>
            <div class="iq-email-search d-flex">
              <form class="mr-3 position-relative">
                <div class="form-group mb-0">
                  <input
                    id="exampleInputEmail1"
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Search"
                  >
                  <a
                    class="search-link"
                    href="#"
                  ><i class="ri-search-line" /></a>
                </div>
              </form>
              <ul>
                <li class="mr-3">
                  <a
                    class="font-size-14"
                    href="javascript:void(0)"
                  >
                    1 - 50 of 505
                  </a>
                </li>
                <li
                  v-b-tooltip.top
                  title="Previous"
                >
                  <a href="#"><i class="ri-arrow-left-s-line" /></a>
                </li>
                <li
                  v-b-tooltip.top
                  title="Next"
                >
                  <a href="#"><i class="ri-arrow-right-s-line" /></a>
                </li>
                <li
                  v-b-tooltip.top
                  class="mr-0"
                  title="Setting"
                >
                  <a href="#"><i class="ri-list-settings-line" /></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="iq-email-listbox">
          <tab-content>
            <EmailDetail
              :active="active"
              :item="item"
              @update="closeDetail"
            />
            <tab-content-item
              id="mail-inbox"
              :active="true"
              aria-labelled-by="mail-inbox-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in inboxItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-starred"
              :active="false"
              aria-labelled-by="mail-starred-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in starredItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-snoozed"
              :active="false"
              aria-labelled-by="mail-snoozed-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in starredItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-draft"
              :active="false"
              aria-labelled-by="mail-draft-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in draftItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-sent"
              :active="false"
              aria-labelled-by="mail-sent-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in sendItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-trash"
              :active="false"
              aria-labelled-by="mail-trash-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in deleteItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-important"
              :active="false"
              aria-labelled-by="mail-important-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in starredItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
            <tab-content-item
              id="mail-spam"
              :active="false"
              aria-labelled-by="mail-spam-tab"
              role="tabpanel"
            >
              <ul class="iq-email-sender-list">
                <li
                  v-for="(items,index) in spamItems"
                  :key="index"
                  :class="items.is_unread ? 'iq-unread' : ''"
                >
                  <EmailItem
                    :items="items"
                    @update="openDetail"
                  />
                </li>
              </ul>
            </tab-content-item>
          </tab-content>
        </div>
      </iq-card>
    </b-col>
    <b-modal
      id="compose-email-popup"
      v-model="show"
      size="lg"
      hide-footer
      hide-header
      content-class="border-0"
      dialog-class="m-0"
      static
      body-class="p-0"
      class="compose-popup modal-sticky-bottom-right modal-sticky-lg"
      cancel-title="Close"
    >
      <ComposeBody
        class="mb-0"
        :modal="true"
        @close="closeModal"
      />
    </b-modal>
  </b-row>
</template>

<script>
import { socialvue } from '../../../config/pluginInit'
import { inboxEmailData, draftEmailsData, sendEmailData, spamEmailsData, starredEmailsData, deletedEmailsData } from '../../../FackApi/api/email'
import EmailDetail from './EmailDetail'
import EmailItem from './EmailItem'
import ComposeBody from './ComposeBody'
export default {
  name: 'EmailListing',
  components: { ComposeBody, EmailItem, EmailDetail },
  data () {
    return {
      show: false,
      inboxItems: inboxEmailData,
      starredItems: starredEmailsData,
      draftItems: draftEmailsData,
      sendItems: sendEmailData,
      spamItems: spamEmailsData,
      deleteItems: deletedEmailsData,
      active: false,
      dataItem: {
        is_selected: false,
        is_unread: false,
        favorite: true,
        title: '',
        subject: '',
        emailTime: ''
      }
    }
  },
  computed: {
    item () {
      return this.dataItem
    }
  },
  mounted () {
    socialvue.index()
  },
  methods: {
    openDetail (items) {
      this.active = true
      this.dataItem = items
    },
    closeDetail (items) {
      this.active = false
    },
    updateTab (event) {
      this.active = false
    },
    closeModal (value) {
      this.show = false
    }
  }
}
</script>
