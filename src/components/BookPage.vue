<template>
  <div>
    <div class="book-text">{{ text }}</div>
    <div v-if="imgSrc"><img :src="imgSrc"/></div>
    <div><input></div>
  </div>
</template>

<script>
export default {
  name: 'BookPage',
  props: {
    text: String,
    imgSrc: String
  }
}
</script>

<style scoped>
.book-text {
  color: #888;
}
</style>
