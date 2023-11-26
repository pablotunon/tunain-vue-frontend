<template>
  <router-view></router-view>
</template>

<script>
// import Config from "./config";

export default {
  name: "App",
  mounted() {
    // Add reCaptcha script to head
    // let recaptchaScript = document.createElement("script");
    // recaptchaScript.setAttribute(
    //   "src",
    //   "https://www.google.com/recaptcha/enterprise.js?render=" +
    //     Config.RECAPTCHA_SITE_KEY
    // );
    // document.head.appendChild(recaptchaScript);
  },
};
</script>

<style>
</style>
