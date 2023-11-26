<template>
  <div>
    <BookPage :text="text" :receivedInput="userInput"/>
  </div>
</template>

<script>
import { get } from '../actions'
import BookPage from './BookPage.vue'

export default {
  name: 'BookView',
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
