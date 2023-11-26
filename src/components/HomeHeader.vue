<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur border-b border-sky-900/10 bg-sky-900/75">
    <div class="max-w-7xl mx-auto">
      <div class="py-4 border-b border-sky-900/10 px-8 mx-4">
        <div class="relative flex items-center text-white">
          <router-link to="/" class="">
            Tunain
          </router-link>
          <div class="relative flex items-center ml-auto">
            <router-link to="/logout" class="px-3">
              {{ username }}, sign out
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>


<script>
import { mapState } from "vuex";

export default {
  name: "HomeHeader",
  computed: {
    ...mapState({
      username: "username",
    }),
  },
};
</script>
