<template>
  <div class="mt-6">
    <h2>{{ title }}</h2>
    <div class="flex flex-row gap-4 mt-6 mb-6">
      <div class="basis-1/2 text-neutral-400 text-justify">&emsp;{{ firstParagraph }}</div>
    </div>
    <BookPage v-for="pageNumber in loadedPages"
      :key="pageNumber"
      :bookId="bookId"
      :pageNumber="pageNumber"
      @next="this.addPage"
    />
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
  props: {
    bookId: String,
  },
  data() {
    return {
      title: '',
      firstParagraph: '',
      lastPage: 1,
      loadedPages: [],
    }
  },
  mounted() {
    this.fetchBook()
    this.addPage()
  },
  methods: {
    addPage() {
      this.loadedPages.push(this.lastPage)
      this.lastPage++
    },
    fetchBook() {
      get("book", {book_id: this.bookId})
        .then((response) => {
          console.log(response)
          this.title = response.title
          this.firstParagraph = response.initial_input
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    }
  },
}
</script>

<style scoped>
</style>
