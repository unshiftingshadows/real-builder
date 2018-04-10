<template>
  <q-layout view="hHr LpR lFf"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header reveal>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          <img src="statics/logo.png" style="max-height: 40px" />
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="rightDrawer = !rightDrawer"
          v-if="showRightDrawer"
        />
      </q-toolbar>
    </q-layout-header>

    <!-- (Optional) The Footer -->
    <!-- <q-layout-footer>
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
          <span slot="subtitle">Subtile</span>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-footer> -->

    <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
    <q-layout-drawer
      side="left"
      v-model="leftDrawer"
      content-class="bg-grey-9 sm-drawer"
    >
      <!-- QScrollArea is optional -->
      <q-scroll-area class="fit q-pa-sm">
        <q-item to="/realdashboard">
          <q-item-side icon="fa-home" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">REAL Dashboard</q-tooltip>
        </q-item>
        <q-item-separator />
        <q-item :to="{ name: 'rlist', params: { type: 'series' }}">
          <q-item-side icon="fa-folder" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Series</q-tooltip>
        </q-item>
        <q-item-separator />
        <q-item>
          <q-item-side icon="fa-cog" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Settings</q-tooltip>
        </q-item>
        <q-item link @click.native="logout">
          <q-item-side icon="fa-sign-out-alt fab" />
          <q-tooltip anchor="center left" self="center right" :disable="$q.platform.is.mobile">Log Out</q-tooltip>
        </q-item>
      </q-scroll-area>
    </q-layout-drawer>

    <!-- <q-layout-drawer
      side="right"
      v-model="rightDrawer"
      content-class="bg-grey-9 lg-drawer"
      :breakpoint="1200"
    >
      <q-scroll-area class="fit q-pa-sm">
        <resources v-if="$route.name === 'olesson'" />
      </q-scroll-area>
    </q-layout-drawer> -->

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import Resources from 'components/Resources.vue'

export default {
  components: {
    Resources
  },
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: this.$route.name !== 'olesson',
      // rightDrawer: this.$route.name === 'olesson' && this.$q.platform.is.desktop,
      // showRightDrawer: this.$route.name === 'olesson' && this.$q.platform.is.desktop,
      pageType: this.$route.name
    }
  },
  watch: {
    '$route.name': function (val) {
      console.log('page change')
      this.pageType = val
      this.leftDrawer = val !== 'olesson'
      // this.rightDrawer = val === 'olesson' && this.$q.platform.is.desktop
      // this.showRightDrawer = val === 'olesson' && this.$q.platform.is.desktop
    }
  },
  methods: {
    logout () {
      console.log('signing out')
      this.$firebase.auth.signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<style>

.sm-drawer {
  width: 75px
}

.lg-drawer {
  width: 100%
}

@media screen and (min-width: 1200px) {
  .lg-drawer {
    width: 35%
  }
}

</style>
