<script>
import Layout from '@/layouts/auth.vue'
import { signUpUser } from '@/api/user.js'
import User from '@/models/User.js'
import Character from '@/models/Character'
import { setCurrentCharacter, createCharacter } from '@/api/user'

export default {
  name: 'Signup',
  components: {
    Layout,
  },
  data: () => ({
    signingUp: false,
    tempUser: null,
    newUser: new User(),
    newCharacterName: '',
    isEmailVerified: true,
    showPassword: false,
    showConfirmPassword: false,
    checkbox: false,
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) =>
        /(?=^.{3,20}$)^[a-zA-Z][a-zA-Z0-9]*[._-]?[a-zA-Z0-9]+$/g.test(v) ||
        'Name must be 3-20 characters long and can only contain letters, numbers, underscores, dashes, and periods',
    ],
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(
          v
        ) || 'E-mail must be valid',
    ],
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/.test(v) ||
        'Password must has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces.',
    ],
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
    async signUp() {
      this.signingUp = true
      if (this.$refs.form.validate()) {
        try {
          this.tempUser = await signUpUser(this.newUser)
          console.log(this.tempUser)
          let character = await createCharacter(
            new Character({
              name: this.newCharacterName,
              userId: this.tempUser.getObjectId(),
            })
          )
          character = character.toJSON()
          await setCurrentCharacter(
            this.tempUser.getObjectId(),
            character.objectId
          )
          // the user shouldn't be logged in before email is verified
          this.$user.logOut()
          this.isEmailVerified = false
          this.$snackbar.success('Signed up successfully')
        } catch (error) {
          console.log(error)
          this.$snackbar.error(error.rawMessage)
        }
      }
      this.signingUp = false
    },
    async verifyEmail() {
      this.tempUser = await this.tempUser.fetch()
      const user = this.tempUser ? this.tempUser.toJSON() : {}
      if (user.emailVerified) {
        this.isEmailVerified = true
        this.$root.currentUser = user
        await this.$root.initCharacter()
        // Redirect to the originally requested page, or to the home page
        this.$router.push(this.$route.query.redirectFrom || { name: 'home' })
      }
    },
    resendEmail() {
      this.$user.requestEmailVerify(this.$root.currentUser.email)
    },
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
        append-icon="mdi-account-outline"
        hide-details="auto"
        label="Username"
        required
        outlined
        clearable
        class="mb-8"
      ></v-text-field>
      <v-text-field
        v-model="newUser.email"
        :rules="emailRules"
        append-icon="mdi-email-outline"
        hide-details="auto"
        label="E-mail"
        required
        outlined
        clearable
        class="mb-4"
      ></v-text-field>
      <v-alert v-if="!isEmailVerified" text color="warning" class="mb-8">
        <div class="mb-4">
          An email with a verification link has been sent to the email address
          you provided. Please click that link to verify your email so that you
          can login to your account.
        </div>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn color="warning" outlined class="mr-4" @click="verifyEmail">
            Verify
          </v-btn>
          <v-btn color="warning" outlined @click="resendEmail"> Resend </v-btn>
        </div>
      </v-alert>
      <v-text-field
        v-model="newUser.password"
        label="Password"
        :rules="passwordRules"
        hide-details="auto"
        required
        outlined
        clearable
        class="my-8"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassword ? 'text' : 'password'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
      <v-text-field
        label="Re-enter your Password"
        :rules="confirmPasswordRules"
        hide-details="auto"
        required
        outlined
        clearable
        class="mb-8"
        :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showConfirmPassword ? 'text' : 'password'"
        @click:append="showConfirmPassword = !showConfirmPassword"
      ></v-text-field>
      <v-text-field
        v-model="newCharacterName"
        :rules="nameRules"
        label="Name of your first identity"
        hide-details="auto"
        outlined
        clearable
        class="mb-8"
        append-icon="mdi-account-multiple-plus-outline"
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
