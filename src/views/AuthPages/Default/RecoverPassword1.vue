<template>
  <div>
    <h1 class="mb-0">
      Reset Password
    </h1>
    <p class="mt-2">
      Enter your email address and we'll send you a verification code.
    </p>
    <form class="mt-4">
      <div class="form-group">
        <label for="input-email">Email address</label>
        <input
          id="input-email"
          type="email"
          class="form-control mb-0"
          aria-describedby="emailHelp"
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
      <div class="form-group mt-4">
        <label for="input-code">Verification code</label>
        <input
          id="input-code"
          class="form-control mb-0"
          aria-describedby="codeHelp"
          placeholder="Enter the code"
        >
      </div>
      <div class="form-group">
        <label for="input-password">New password</label>
        <input
          id="input-password"
          class="form-control mb-0"
          aria-describedby="pwdHelp"
          placeholder="Enter new password"
        >
      </div>
      <div class="d-inline-block w-100">
        <button
          type="submit"
          class="btn btn-primary float-right"
          @click="$router.push({ name: 'social.list' })"
        >
          Reset Password
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RecoverPassword1'
}
</script>
