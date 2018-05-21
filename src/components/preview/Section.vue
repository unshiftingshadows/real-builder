<template>
  <q-card color="primary">
    <q-card-title>
      <span style="font-style: bold; font-size: 2rem; vertical-align: middle;">{{ data.number }}.&nbsp;&nbsp;</span>
      {{ data.title }}
    </q-card-title>
  </q-card>
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
