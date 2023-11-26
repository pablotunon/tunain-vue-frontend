<template>
  <div class="">
    <form @submit.prevent="submit" id="login-form" class="">
      <div class="">
        <label for="username" class="">Username:</label>
        <input
          v-model="username"
          placeholder="username"
          autocomplete="username"
          type="text"
          name="username"
          id="username"
          class=""
          ref="username"
        />
      </div>
      <div class="">
        <label for="password" class="">Password:</label>
        <input
          v-model="password"
          type="password"
          placeholder="password"
          autocomplete="current-password"
          name="password"
          id="password"
          class=""
        />
      </div>
      <div class="" v-if="error">
        {{ error }}
      </div>
      <div>
        <button
          type="submit"
          name="submit"
          class=""
          :disabled="status == 0"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      loginAvailable: false,
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    submit() {
      this.error = "";
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password,
        })
        .then(() => this.$router.push("/login/2fa"))
        .catch((err) => {
          this.error = err.response?.data?.error ?? "Invalid credentials";
          this.$store.commit("auth_error");
        });
    },
  },
  mounted() {
    this.$store.dispatch("checkBackendCookies");
    this.$refs.username.focus();
  },
  computed: {
    ...mapState({
      status: "status",
    }),
  },
};
</script>

<style scoped>
</style>
