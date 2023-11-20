<template>
  <SimpleHello :msg="message"/>
</template>

<script>
import { get } from './actions'
import SimpleHello from './components/SimpleHello.vue'

export default {
  name: 'App',
  components: {
    SimpleHello
  },
  data() {
    return {
      // Managers
      message: 'not loaded',
    }
  },
  mounted() {
    get("hello")
      .then((response) => {
        this.message = response.data
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
      });
  },
}
</script>

<style>

</style>
