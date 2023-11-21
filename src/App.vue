<template>
  <div class="container mx-auto px-4">
    <BookPage :text="text"/>
  </div>
</template>

<script>
import { get } from './actions'
import BookPage from './components/BookPage.vue'

export default {
  name: 'App',
  components: {
    BookPage
  },
  data() {
    return {
      // Managers
      text: 'not loaded',
    }
  },
  mounted() {
    get("next-page")
      .then((response) => {
        this.text = response.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      });
  },
}
</script>

<style scoped>
</style>
