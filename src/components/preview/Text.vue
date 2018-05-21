<template>
  <div>
    <h4>{{ data.title }}</h4>
    <span v-html="data.text"/>
  </div>
</template>

<script>
export default {
  props: ['data'],
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
