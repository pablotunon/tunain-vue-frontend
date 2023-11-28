<template>
  <div>
    <BookPage v-for="(page, pageId) in loadedPages"
      :key="pageId"
      :bookId="bookId"
      :text="page.text"
      :receivedInput="page.input"
      @next="this.getPage"
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
      lastPage: 1,
      loadedPages: {},
    }
  },
  mounted() {
    this.getPage()
  },
  methods: {
    getPage() {
      get("page", {book_id: this.bookId, page_number: this.lastPage})
      .then((response) => {
        this.loadedPages[response.id] = {
          text: response.text,
          input: response.input,
          number: response.number,
          img: response.img,
          footer: response.footer,
        }
        this.lastPage++
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
