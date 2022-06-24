<script>
import Layout from '@/layouts/auth.vue'

export default {
  components: {
    Layout,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <Layout>
    <v-container>
      <div class="text-h4 secondary--text font-weight-regular">
        Log in
      </div>
    </v-container>

    <v-container>
      <form>
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          :rules="nameRules"
          label="Username / Email address"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          label="Password"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :error-messages="checkboxErrors"
          label="Remember Me"
          required
          @change="$v.checkbox.$touch()"
          @blur="$v.checkbox.$touch()"
        ></v-checkbox>
    
        <v-btn
          class="mr-4"
          @click="signIn"
        >
          Sign in
        </v-btn>
        <v-btn @click="clear">
          clear
        </v-btn>
      </form>
    </v-container>

    <v-container>
      <v-divider
      ></v-divider>
      <v-row class="mt-2 ">
        <v-col class="col-md-5">
          <div class="secondary--text font-weight-regular">Don't have an account?</div>
        </v-col>
        <v-col class="col-md-2">
          <a class="ssecondary--text font-weight-regular">Sign up</a>
        </v-col>
      </v-row>
    </v-container>

  </Layout>
</template>


<style lang="scss" scoped></style>
