<template>
  <div class="container-fluid p-0">
    <div class="row no-gutters">
      <div class="col-sm-12 text-center">
        <div
          class="iq-error position-relative mt-5"
          :class="$route.params.code !== '404' ? 'error-500' : ''"
        >
          <img
            v-if="$route.params.code === '404'"
            :src="image404"
            class="img-fluid iq-error-img"
            alt="404"
          >
          <img
            v-else
            :src="image500"
            class="img-fluid iq-error-img"
            alt="500"
          >
          <h1
            v-if="$route.params.code === '404'"
            class="text-in-box"
          >
            404
          </h1>
          <h1
            v-else
            class="text-in-box"
          >
            500
          </h1>
          <h2 class="mb-0">
            Oops! This Page is Not Found.
          </h2>
          <p>The requested page dose not exist.</p>
          <button
            class="btn btn-primary mt-3"
            @click="$router.go(-1)"
          >
            <i class="ri-home-4-line" />Back to Home
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { socialvue } from '../../config/pluginInit'

export default {
  name: 'ErrorPage',
  data () {
    return {
      image404: require('../../assets/images/error/01.png'),
      image500: require('../../assets/images/error/01.png')
    }
  },
  mounted () {
    socialvue.index()
    let body = document.querySelector('body')
    body.classList.add('iq-bg-primary')
  }
}
</script>
