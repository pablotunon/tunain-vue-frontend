<template>
  <div>
    <h2>Create your own book!</h2>
    <label class="block">
      <span class="text-neutral-500">Title</span>
      <input type="text" v-model="title" class="text-neutral-800 rounded-md w-full bg-neutral-500 focus:bg-neutral-300 focus:border-neutral-400 focus:ring-0"/>
    </label>
    <label class="block">
      <span class="text-neutral-500">First Paragraph</span>
      <input type="text" v-model="firstParagraph" class="text-neutral-800 rounded-md w-full bg-neutral-500 focus:bg-neutral-300 focus:border-neutral-400 focus:ring-0"/>
    </label>
    <button type="button" @click="createBook" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100">
      Let's start!
    </button>
    <div>Need some inspiration?</div>
  </div>
</template>

<script>
import { post } from '../actions'

export default {
  name: 'BookCreate',
  data() {
    return {
      title: '',
      firstParagraph: '',
      // genre: '',
      // artStyle: '',
    }
  },
  methods: {
    createBook() {
      post("create-book", {
        title: this.title,
        initial_input: this.firstParagraph
      })
        .then((response) => {
          this.$router.push(`/book/${response.book_id}`)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    },
  }
}
</script>

<style scoped>
.text-justify {
  text-align: justify;
}
</style>
