<template>
  <div>
    <h1>Hello from VUE - {{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'SimpleHello',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
