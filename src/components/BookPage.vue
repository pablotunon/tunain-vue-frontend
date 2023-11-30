<template>
  <div>
    <div v-if="text">
      <div class="flex flex-row gap-4 mt-1 mb-6">
        <div class="basis-1/2 text-neutral-400 text-justify">&emsp;{{ text }}</div>
        <div clasS="basis-1/2">
          <img v-if="imgSrc" :src="imgSrc"/>
          <div v-else-if="!isPolling">
            Error
            <button type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100" @click="() => resend('image')">
              Resend for generation
            </button>
          </div>
        </div>
      </div>
      <div v-if="receivedInput">
        <input type="text" :value="receivedInput" disabled class="text-neutral-800 rounded-md w-full bg-neutral-500"/>
        <button v-if="!nextClicked" type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100" @click="clickNext">
          Read next page
        </button>
      </div>
      <div v-else>
        <label class="block">
          <span class="text-neutral-500">Your input</span>
          <input type="text" v-model="createdInput" :disabled="nextClicked" class="text-neutral-800 rounded-md w-full bg-neutral-500 focus:bg-neutral-300 focus:border-neutral-400 focus:ring-0"/>
        </label>
        <button v-if="!nextClicked" type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100" @click="sendInput">
          Generate next page
        </button>
      </div>
    </div>
    <div v-else-if="isPolling">
      <!-- Loading -->
      Loading
    </div>
    <div v-else>
      Error
      <button type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100" @click="() => resend('page')">
        Resend for generation
      </button>
    </div>
  </div>
</template>

<script>
import { get, post } from '../actions'

const MAX_POLLING_ATTEMPTS = 10

export default {
  name: 'BookPage',
  props: {
    bookId: String,
    pageNumber: Number,
  },
  data() {
    return {
      pageId: undefined,
      text: '',
      imgSrc: '',
      footer: '',
      receivedInput: '',
      createdInput: '',
      nextClicked: false,
      pollingCount: 0,
    }
  },
  mounted() {
    this.fetchPage()
  },
  computed: {
    isPolling() {
      return this.pollingCount < MAX_POLLING_ATTEMPTS
    }
  },
  methods: {
    fetchPage() {
      get("page", {book_id: this.bookId, page_number: this.pageNumber})
        .then((response) => {
          if (response.text) {
            this.pageId = response.id
            this.text = response.text
            this.receivedInput = response.input
            this.imgSrc = response.img
            this.footer = response.footer
          }
          if (!response.img) {
            this.startPolling()
          }
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    },
    startPolling() {
      this.pollingCount++
      if (this.pollingCount < MAX_POLLING_ATTEMPTS) {
        setTimeout(() => {
          this.fetchPage()
        }, 1000);
      }
    },
    sendInput() {
      const params = {
        book_id: this.bookId,
        input: this.createdInput
      }
      post("create-page", params)
        .then((response) => {
          console.log(response)
          this.nextClicked = true
          this.$emit("next")
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    },
    resend(taskType) {
      post("resend-task", {
        book_id: this.bookId,
        task_type: taskType,
        page_id: this.pageId
      })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    },
    clickNext() {
      this.nextClicked = true
      this.$emit("next")
    }
  }
}
</script>

<style scoped>
.text-justify {
  text-align: justify;
}
</style>
