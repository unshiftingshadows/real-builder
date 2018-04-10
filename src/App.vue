<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$firebase.auth.onAuthStateChanged((user) => {
        if (!user) {
          console.log('no user')
        } else {
          this.$bindAsObject('user', this.$firebase.user(user.uid))
        }
      })
    }
  }
}
</script>

<style>
</style>
