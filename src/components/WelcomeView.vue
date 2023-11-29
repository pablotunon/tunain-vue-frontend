<template>
  <div>
    <div class="mt-6">
      <h1>Home</h1>
    </div>
    <div class="mx-auto max-w-md text-neutral-400">
      Welcome to the new era of literature. An interactive experience where you are the co-writer.
      You make the choices, our finest AI powered writers and illustrators give form to your ideas.
      Dive into your favourite genre or explore the endless styles of our AI writers.
    </div>
    <div class="mt-6">
      <!-- <img src="@/assets/logo-black.png" class="logo" /> -->
      <div class="flex">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>Explore books
      </div>
      <ul class="list-disc list-outside mt-4">
        <router-link v-for="book in books" :key="book.id" :to="`/book/${book.id}`" class="nav-link" aria-current="page">
          <li>{{ book.title }}</li>
        </router-link>
      </ul>
      <router-link to="/book/create" class="nav-link" aria-current="page">
        <button type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100">
          Create your own book!
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { get } from '../actions'

export default {
  name: "WelcomeView",
  computed: {
    ...mapState({
      username: "username",
      permissions: "permissions",
    }),
  },
  data() {
    return {
      books: []
    }
  },
  mounted() {
    this.fetchBookList()
  },
  methods: {
    fetchBookList() {
      get("books/list")
        .then((response) => {
          this.books = response.books
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    }
  },
};
</script>


<style scoped>
.logo {
  max-height: 450px;
  max-width: 450px;
  width: auto;
  height: auto;
}
</style>
