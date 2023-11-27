<template>
  <div>
    <div class="flex flex-row gap-4 mt-1 mb-6">
      <div class="basis-1/2 text-neutral-400 text-justify">&emsp;{{ text }}</div>
      <div clasS="basis-1/2"><img v-if="imgSrc" :src="imgSrc"/></div>
    </div>
    <div v-if="receivedInput">
      <input type="text" class="text-neutral-800 rounded-md w-full bg-neutral-500" :value="receivedInput" disabled/>
      <button type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100">
        Read next page
      </button>
    </div>
    <div v-else>
      <label class="block">
        <span class="text-neutral-500">Your input</span>
        <input type="text" v-model="createdInput" class="text-neutral-800 rounded-md w-full bg-neutral-500 focus:bg-neutral-300 focus:border-neutral-400 focus:ring-0"/>
      </label>
      <button type="button" class="mt-3 rounded-md p-2.5 bg-sky-700 text-neutral-100" @click="sendInput">
        Generate next page
      </button>
    </div>
  </div>
</template>

<script>
import { post } from '../actions'

export default {
  name: 'BookPage',
  props: {
    bookId: String,
    text: String,
    receivedInput: String,
    imgSrc: String,
  },
  data() {
    return {
      createdInput: ''
    }
  },
  methods: {
    sendInput() {
      const params = {
        book_id: this.bookId,
        input: this.createdInput
      }
      post("create-page", params)
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
        })
    }
  }
}
</script>

<style scoped>
.text-justify {
  text-align: justify;
}
</style>
