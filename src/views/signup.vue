<script>
import Layout from '@/layouts/auth.vue'

export default {
  components: {
    Layout,
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
      (v) =>
        /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(v) ||
        'Password must be valid',
    ],
    confirm_password: '',
    confirmPasswordRules: [
      // TODO: same password check
      (v) => !!v || 'Please Confirm your Password',
      (v) =>
        /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(v) ||
        'Password must be valid',
    ],
    checkbox: false,
  }),

  methods: {},
}
</script>

<template>
  <Layout>
    <div class="text-h4 mb-12 secondary--text font-weight-medium">Sign Up</div>

    <form ref="form" lazy-validation>
      <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
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
          v-model="email"
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
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        :rules="passwordRules"
        required
        outlined
        clearable
        class="mb-4"
      ></v-text-field>
      <v-text-field
        v-model="confirm_password"
        :error-messages="passwordErrors"
        label="Re-enter your Password"
        :rules="confirmPasswordRules"
        required
        outlined
        clearable
        class="mb-4"
      ></v-text-field>
      <div class="d-flex justify-space-between align-center mb-8">
        <div class="d-flex align-center">
          <v-checkbox
            class="mr-2"
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="I accept "
            required
          ></v-checkbox>
          <router-link class="d-flex align-center" :to="{ path: '/signup' }"
            >Terms and Conditions</router-link
          >
        </div>
        <v-btn depressed large color="primary" @click="signUp"> Sign up </v-btn>
      </div>
    </form>

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
