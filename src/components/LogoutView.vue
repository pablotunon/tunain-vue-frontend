<template>
  <div
    class="
      position-absolute
      top-50
      start-50
      translate-middle
      justify-content-center
    "
  >
    <div class="row justify-content-center mb-3">
      <!-- <img src="@/assets/logo-black.png" class="logo" /> -->
    </div>
    <div class="row justify-content-center h5 pt-3 mb-3">
      Thanks for writing with us, see you soon
    </div>
    <div v-if="error" class="d-flex justify-content-center pt-3">
      <div class="alert alert-danger">
        Apologies, we could not log you out.<br />
        {{ error }}
      </div>
    </div>
    <div v-else class="d-flex justify-content-center pt-3">
      <router-link to="/login" class="nav-link" aria-current="page">
        <div class="text-center fs-3">
          <i class="bi bi-door-closed"></i><br />Back to login page
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogoutView",
  data() {
    return {
      error: "",
    };
  },
  mounted() {
    this.$store.dispatch("logout").catch((err) => (this.error = err));
  },
};
</script>

<style scoped>
.logo {
  max-height: 250px;
  max-width: 250px;
  width: auto;
  height: auto;
}
</style>
