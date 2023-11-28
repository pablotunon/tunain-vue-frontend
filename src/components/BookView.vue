<template>
  <div>
    <BookPage v-for="pageNumber in loadedPages"
      :key="pageNumber"
      :bookId="bookId"
      :pageNumber="pageNumber"
      @next="this.addPage"
    />
  </div>
</template>

<script>
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
      loadedPages: [],
    }
  },
  mounted() {
    this.addPage()
  },
  methods: {
    addPage() {
      this.loadedPages.push(this.lastPage)
      this.lastPage++
    }
  },
}
</script>

<style scoped>
</style>
