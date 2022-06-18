<template>
  <div>
    <h1 class="mb-0">
      Sign Up
    </h1>
    <form class="mt-4">
      <div class="form-group">
        <label for="input-username">Username</label>
        <input
          id="input-username"
          class="form-control mb-0"
          placeholder="Your Username"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputEmail2">Email address</label>
        <input
          id="exampleInputEmail2"
          type="email"
          class="form-control mb-0"
          placeholder="Enter email"
        >
      </div>
      <div class="d-inline-block w-100">
        <button
          type="submit"
          class="btn btn-outline-primary float-right"
        >
          Send code
        </button>
      </div>
      <div class="form-group">
        <label for="input-code">Verification code</label>
        <input
          id="input-code"
          class="form-control mb-0"
          aria-describedby="codeHelp"
          placeholder="Enter the code"
        >
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          id="exampleInputPassword1"
          type="password"
          class="form-control mb-0"
          placeholder="Password"
        >
        <input
          id="exampleInputPassword2"
          type="password"
          class="form-control mb-0 mt-2"
          placeholder="Re-enter your password"
        >
      </div>
      <div class="d-inline-block w-100 mt-4">
        <div class="custom-control custom-checkbox d-inline-block mt-2 pt-1">
          <input
            id="customCheck1"
            type="checkbox"
            class="custom-control-input"
          >
          <label
            class="custom-control-label"
            for="customCheck1"
          >I accept <a href="#">Terms and Conditions</a></label>
        </div>
        <button
          type="submit"
          class="btn btn-primary float-right"
          @click="$router.push({ name: 'social.list' })"
        >
          Sign Up
        </button>
      </div>
      <div class="sign-info">
        <span class="dark-color d-inline-block line-height-2">Already Have Account ? <router-link :to="{ name: 'auth1.sign-in1' }">Log In</router-link></span>
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
  name: 'SignUp1',
  data: () => ({}),
  methods: {
  }
}
</script>
