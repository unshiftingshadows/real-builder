<template>
  <div id="q-app">
    <div id="transparent-layer" v-if="dim"></div>
    <router-view />
  </div>
</template>

<script>
// IMPORTANT!! Used to ensure that quill editors work properly
//             in PWAs
import FastClick from 'fastclick'
FastClick.notNeeded = true

var initUser = {
  nqUser: false,
  realUser: false,
  theme: '',
  name: {
    first: '',
    last: ''
  },
  email: '',
  prefs: {
    bibleTranslation: 'esv',
    osermonStructure: {
      hook: true,
      application: true,
      prayer: true
    },
    olessonStructure: {
      hook: true,
      application: true,
      prayer: true
    },
    contentType: {
      sermon: true,
      lesson: true,
      scratch: true
    },
    mediaType: {
      quote: true,
      image: true,
      illustration: true,
      lyric: true,
      video: true
    }
  }
}

export default {
  name: 'App',
  data () {
    return {
      user: initUser,
      dim: false
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
          document.documentElement.style.setProperty('--card-color', '#444444')
          document.documentElement.style.setProperty('--color', '#ffffff')
          document.documentElement.style.setProperty('--drawer-background', '#444444')
          document.documentElement.style.setProperty('--drawer-icons', '#ffffff')
          break
        case 'light':
          document.documentElement.style.setProperty('--background-color', '#ffffff')
          document.documentElement.style.setProperty('--card-color', '#dddddd')
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
          this.$bindAsObject('user', this.$firebase.user() || initUser)
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
  background-color: var(--card-color);
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

#transparent-layer {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

.active-card {
  z-index: 2;
  position: relative;
}

</style>
