<template>
  <div>
    <HomeHeader />
    <main class="max-w-7xl mx-auto">
      <div class="py-4 px-8 mx-4 text-neutral-200">
        <router-view class=""></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader.vue";

export default {
  name: "HomeView",
  components: { HomeHeader },
};
</script>
