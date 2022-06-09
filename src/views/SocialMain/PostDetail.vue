<template>
  <b-row>
    <b-col lg="12">
      <tab-content id="pills-tabContent">
        <tab-content-item
          id="post-content"
          :active="true"
          aria-labelled-by="pills-feed-tab"
        >
          <div>
            <SocialPost :post="socialPosts[0]" />
          </div>
        </tab-content-item>
      </tab-content>
    </b-col>
  </b-row>
</template>

<script>
import { socialvue } from '@/config/pluginInit'
import { Posts } from '@/FackApi/api/SocialPost'
import SocialPost from '../Apps/Social/Components/SocialPost'

export default {
  name: 'PostDetail',
  components: { SocialPost },
  data () {
    return {
      socialPosts: Posts
    }
  },
  mounted () {
    socialvue.index()
  }
}
</script>
