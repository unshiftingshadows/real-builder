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
      user: {
        nqUser: false,
        realUser: false,
        theme: '',
        name: {
          first: '',
          last: ''
        },
        email: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'user': function (val) {
      console.log('user changed!', val)
    },
    'user.theme': function (val) {
      if (val === undefined) return
      switch (val) {
        case 'dark':
          document.documentElement.style.setProperty('--background-color', '#333333')
          document.documentElement.style.setProperty('--color', '#ffffff')
          document.documentElement.style.setProperty('--drawer-background', '#444444')
          document.documentElement.style.setProperty('--drawer-icons', '#ffffff')
          break
        case 'light':
          document.documentElement.style.setProperty('--background-color', '#ffffff')
          document.documentElement.style.setProperty('--color', '#333333')
          document.documentElement.style.setProperty('--drawer-background', '#dddddd')
          document.documentElement.style.setProperty('--drawer-icons', '#444444')
          break
        default:
          console.error('invalid theme')
      }
    }
  },
  methods: {
    init () {
      this.$firebase.auth.onAuthStateChanged((user) => {
        console.log('auth state changed')
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

/* .q-layout-page {
  color: #ffffff;
  background-color: #333333;
}

.modal-content {
  color: #ffffff;
  background-color: #333333;
}

.q-popover {
  color: #ffffff;
  background-color: #333333;
} */

/* Style content and background */
.q-layout-page, .modal-content, .q-popover  {
  color: var(--color);
  background-color: var(--background-color);
}

/* Style text input */
.q-input-area, .q-input-target {
  color: var(--color);
}

/* Always white text */
.bg-primary .q-input-area, .bg-primary .q-input-target {
  color: #ffffff;
}

/* Style all cards */
.q-card {
  color: var(--color);
  background-color: var(--background-color);
}

/* Style drawer background color */
.sm-drawer, .lg-drawer {
  background-color: var(--drawer-background);
}

/* Style drawer icon color */
.sm-drawer i, .lg-drawer i {
  color: var(--drawer-icons);
}

/* Set up drawer widths */
.sm-drawer {
  width: 75px;
}

.lg-drawer {
  width: 100%;
}

@media screen and (min-width: 1200px) {
  .lg-drawer {
    width: 35%;
  }
}

</style>
