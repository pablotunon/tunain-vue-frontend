<template>
  <div class="container mx-auto px-4 h-full grid content-center bg-neutral-800">
    <BookPage :text="text" :userInput="userInput"/>
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
      userInput: '',
    }
  },
  mounted() {
    get("next-page")
      .then((response) => {
        this.text = response.text
        this.receivedInput = response.input
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      })
  },
}
</script>

<style scoped>
</style>
