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
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is required',
      v => /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(v) || 'Password must be valid',
    ],
    confirm_password: '',
    confirmPasswordRules: [
      // TODO: same password check
      v => !!v || 'Please Confirm your Password',
      v => /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/.test(v) || 'Password must be valid',
    ],
    checkbox: false,
  }),

  methods: {

  },
}
</script>

<template>
  <Layout>
    <v-container>
      <div class="text-h4 secondary--text font-weight-regular">
        Sign Up
      </div>
    </v-container>

    <v-container>
      <form
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :rules="nameRules"
          label="Username"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <div class="d-flex align-center">
          <v-text-field
            class="mr-2"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-btn small @click="verifyEmail">
            Send Email
          </v-btn>
        </div>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          :rules="passwordRules"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="confirm_password"
          :error-messages="passwordErrors"
          label="Re-enter your Password"
          :rules="confirmPasswordRules"
          required
          @input="$v.comfirm_Password.$touch()"
          @blur="$v.comfirm_Password.$touch()"
        ></v-text-field>
        <div class="d-flex">
          <v-checkbox
            class="mr-1"
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="I accept "
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>
          <router-link class="d-flex align-center " :to="{ path: '/signup' }">Terms and Conditions</router-link>
        </div>
        <v-btn
          class="mr-4"
          @click="signUp"
        >
          Sign up
        </v-btn>
      </form>
    </v-container>

    <v-container>
      <v-divider
      ></v-divider>
      <v-row class="mt-2 ">
        <v-col class="col-md-6">
          <div class="secondary--text font-weight-regular">Already have an account?</div>
        </v-col>
        <v-col class="col-md-2">
          <router-link :to="{ path: '/login' }">Log in</router-link>
        </v-col>
      </v-row>
    </v-container>

  </Layout>
</template>


<style lang="scss" scoped></style>
