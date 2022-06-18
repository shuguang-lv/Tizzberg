<template>
  <div>
    <h1 class="mb-0">
      Sign in
    </h1>
    <form class="mt-4">
      <div class="form-group">
        <label for="exampleInputEmail1">Username / Email address</label>
        <input
          id="exampleInputEmail1"
          type="email"
          class="form-control mb-0"
          placeholder="Enter email"
        >
      </div>
      <div class="form-group mt-4">
        <label for="exampleInputPassword1">Password</label>
        <router-link
          :to="{ name: 'auth1.password-reset1' }"
          class="float-right"
        >
          Forgot password?
        </router-link>
        <input
          id="exampleInputPassword1"
          type="password"
          class="form-control mb-0"
          placeholder="Password"
        >
      </div>
      <div class="d-flex justify-content-between align-items-center w-100 mt-4">
        <div class="custom-control custom-checkbox d-inline-block">
          <input
            id="customCheck1"
            type="checkbox"
            class="custom-control-input"
          >
          <label
            class="custom-control-label"
            for="customCheck1"
          >Remember Me</label>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          @click="$router.push({ name: 'social.list' })"
        >
          Sign in
        </button>
      </div>
      <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2">Don't have an account? <router-link :to="{ name: 'auth1.sign-up1' }">Sign up</router-link></span>
        <ul class="iq-social-media">
          <li><a href="#"><i class="ri-facebook-box-line" /></a></li>
          <li><a href="#"><i class="ri-twitter-line" /></a></li>
          <li><a href="#"><i class="ri-instagram-line" /></a></li>
        </ul>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'SignIn1',
  data: () => ({}),
  mounted () {
  },
  methods: {
  }
}
</script>
