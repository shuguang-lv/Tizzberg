<script>
import Layout from '@/layouts/auth.vue'
import { signUpUser } from '@/api/user.js'
import User from '@/models/User.js'
import { authMethods } from '@/store/helpers'

export default {
  name: 'Signup',
  components: {
    Layout,
  },
  data: () => ({
    signingUp: false,
    newUser: new User(),
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    showPassword: false,
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(v) ||
        'Password must be valid',
    ],
    showConfirmPassword: false,
    checkbox: false,
    checkboxRules: [
      (v) => !!v || 'Please accept terms and conditions before sign-up',
    ],
  }),
  computed: {
    confirmPasswordRules() {
      return [
        (v) =>
          v === this.newUser.password ||
          'Two passwords entered should be the same',
      ]
    },
  },
  methods: {
    ...authMethods,
    async signUp() {
      this.signingUp = true
      if (this.$refs.form.validate()) {
        try {
          const user = await signUpUser(this.newUser)
          console.log(user)
          console.log(this.$user.current())
          this.$snackbar.success('Signed up successfully')
        } catch (error) {
          console.log(error)
          this.$snackbar.error(error.rawMessage)
        }
      }
      this.signingUp = false
    },
    verifyEmail() {},
  },
}
</script>

<template>
  <Layout>
    <div class="text-h4 mb-12 secondary--text font-weight-medium">Sign Up</div>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="newUser.username"
        :rules="nameRules"
        label="Username"
        required
        outlined
        clearable
        class="mb-4"
      ></v-text-field>
      <div class="d-flex mb-4">
        <v-text-field
          class="mr-2"
          v-model="newUser.email"
          :rules="emailRules"
          label="E-mail"
          required
          outlined
          clearable
        ></v-text-field>
        <v-btn large outlined color="primary" @click="verifyEmail">
          Send Email
        </v-btn>
      </div>
      <v-text-field
        v-model="newUser.password"
        label="Password"
        :rules="passwordRules"
        required
        outlined
        clearable
        class="mb-4"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        label="Re-enter your Password"
        :rules="confirmPasswordRules"
        required
        outlined
        clearable
        class="mb-4"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
      <div class="d-flex justify-space-between align-center mb-8">
        <div class="d-flex align-center">
          <v-checkbox
            class="mr-2"
            v-model="checkbox"
            label="I accept "
            :rules="checkboxRules"
            required
          ></v-checkbox>
          <router-link class="d-flex align-center" :to="{ name: 'signup' }"
            >Terms and Conditions</router-link
          >
        </div>
        <v-btn
          depressed
          large
          color="primary"
          :loading="signingUp"
          :disabled="signingUp"
          @click="signUp"
        >
          Sign up
        </v-btn>
      </div>
    </v-form>

    <v-divider class="mb-8"></v-divider>

    <div class="d-flex">
      <div class="secondary--text font-weight-regular mr-4">
        Already have an account?
      </div>
      <router-link :to="{ name: 'login' }">Log in</router-link>
    </div>
  </Layout>
</template>

<style lang="scss" scoped></style>
