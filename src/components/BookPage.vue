<template>
  <div class="flex flex-row gap-4 mt-6 mb-6">
    <div class="basis-1/2 book-text">&emsp;{{ text }}</div>
    <div clasS="basis-1/2"><img v-if="imgSrc" :src="imgSrc"/></div>
  </div>
  <div><input></div>
</template>

<script>
export default {
  name: 'BookPage',
  props: {
    text: String,
    imgSrc: String
  },
}
</script>

<style scoped>
.book-text {
  color: #888;
  text-align: justify;
}
</style>
