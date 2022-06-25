<script>
import { authMethods } from '@/store/helpers'
import Layout from '@/layouts/auth.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {
      username: '',
      password: '',
      authError: null,
      tryingToLogIn: false,
    }
  },
  methods: {
    ...authMethods,
    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.tryingToLogIn = true
      // Reset the authError if it existed.
      this.authError = null
      return this.logIn({
        username: this.username,
        password: this.password,
      })
        .then((token) => {
          console.log(token)
          this.tryingToLogIn = false

          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        })
        .catch((error) => {
          this.tryingToLogIn = false
          this.authError = error
        })
    },
  },
}
</script>

<template>
  <Layout>
    <div class="text-h4 mb-12 secondary--text font-weight-medium">Log in</div>

    <form>
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        :rules="nameRules"
        label="Username / Email address"
        outlined
        required
        clearable
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        outlined
        required
        clearable
        type="password"
      ></v-text-field>
      <div class="d-flex justify-space-between align-center mb-8">
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Remember Me"
          required
        ></v-checkbox>
        <v-btn depressed large color="primary" @click="tryToLogIn">
          Sign in
        </v-btn>
      </div>
    </form>

    <v-divider class="mb-8"></v-divider>

    <div class="d-flex">
      <div class="secondary--text font-weight-regular mr-4">
        Don't have an account?
      </div>
      <router-link :to="{ name: 'signup' }">Sign up</router-link>
    </div>
  </Layout>
</template>

<style lang="scss" scoped></style>
