<script>
import Layout from '@/layouts/auth.vue'
import { logInUser } from '@/api/user.js'

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
      email: '',
      showDialog: false,
    }
  },
  methods: {
    async logIn() {
      this.logIning = true
      if (this.$refs.form.validate()) {
        try {
          const user = (
            await logInUser(this.identifier, this.password)
          ).toJSON()
          console.log(user)
          if (!user.emailVerified) {
            await this.$user.logOut()
            this.$user.requestEmailVerify(user.email)
            this.$snackbar.warn('Please verify your email first')
            this.logIning = false
            return
          }
          this.$snackbar.success('Logged in successfully')
          // Redirect to the originally requested page, or to the home page
          this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
        } catch (error) {
          console.log(error)
          this.$snackbar.error(error.rawMessage)
        }
      }
      this.logIning = false
    },
    async sendResetPwdEmail() {
      try {
        await this.$user.requestPasswordReset(this.email)
        this.$snackbar.success(
          'An email has been sent to you with instructions to reset your password'
        )
      } catch (error) {
        console.log(error)
        this.$snackbar.error(error.rawMessage)
      }
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

    <div class="d-flex mb-6">
      <div class="secondary--text font-weight-regular mr-4">
        Don't have an account?
      </div>
      <router-link :to="{ name: 'signup' }">Sign up</router-link>
    </div>
    <a @click="showDialog = true">Forget your password?</a>

    <v-dialog v-model="showDialog" persistent max-width="500">
      <v-card tile>
        <v-card-title class="text-h5 secondary--text">
          Reset password
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="text-subtitle-1 py-4">
          Enter the email address you used to register this account and a
          password resetting email will be sent to that email
          <v-text-field
            v-model="email"
            label="E-mail"
            class="mt-4"
            hide-details
            required
            outlined
            clearable
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-btn
            outlined
            width="200"
            color="primary"
            @click="showDialog = false"
          >
            Cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            width="200"
            color="primary"
            @click="sendResetPwdEmail"
          >
            Send
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </Layout>
</template>

<style lang="scss" scoped></style>
