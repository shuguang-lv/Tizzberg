<script>
import Layout from '@/layouts/auth.vue'
import { authMethods } from '@/store/helpers'
import { logInUser } from '@/api/User.js'

export default {
  name: 'Login',
  components: {
    Layout,
  },
  data() {
    return {
      logIning: false,
      showPassword: false,
      identifier: '',
      password: '',
      checkbox: false,
      required: (v) => !!v || 'This field is required',
    }
  },
  methods: {
    ...authMethods,
    async logIn() {
      this.logIning = true
      if (this.$refs.form.validate()) {
        try {
          const user = await logInUser(this.identifier, this.password)
          console.log(user)
          console.log(this.$User.current())
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        } catch (error) {
          console.log(error)
          this.$Snackbar.error(error.rawMessage)
        }
      }
      this.logIning = false
    },
  },
}
</script>

<template>
  <Layout>
    <div class="text-h4 mb-12 secondary--text font-weight-medium">Log in</div>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="identifier"
        :rules="[required]"
        label="Username / Email address"
        outlined
        required
        clearable
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[required]"
        label="Password"
        outlined
        required
        clearable
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <div class="d-flex justify-space-between align-center mb-8">
        <v-checkbox
          v-model="checkbox"
          label="Remember Me"
          required
        ></v-checkbox>
        <v-btn
          depressed
          large
          color="primary"
          :loading="logIning"
          :disabled="logIning"
          @click="logIn"
        >
          Sign in
        </v-btn>
      </div>
    </v-form>

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
