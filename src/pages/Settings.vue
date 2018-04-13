<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-12">
        <h3>Settings</h3>
      </div>
      <div class="col-12">
        <q-select
          v-model="$root.user.theme"
          float-label="Theme"
          :options="themeOptions"
          @input="themeChange"
        />
      </div>
      <div class="col-12" v-if="$root.user.name">
        <q-card>
          <q-card-title>
            <q-btn color="primary" class="float-right">Edit</q-btn>
            User Info
          </q-card-title>
          <q-card-main>
            <p><b>Name:</b> <span>{{ $root.user.name.first }} {{ $root.user.name.last }}</span></p>
            <p><b>Email:</b> <span>{{ $firebase.auth.currentUser.email }}</span></p>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12" v-if="$root.user">
        <q-card>
          <q-card-title>Notes and Quotes</q-card-title>
          <q-card-main>
            <q-btn color="primary" v-if="!$root.user.nqUser">Connect</q-btn>
            <div v-if="$root.user.nqUser">
              <p>User: {{ $root.user.nqUser.email }}</p>
              <p>ID: {{ $root.user.nqUser.uid }}</p>
              <q-btn color="primary" v-if="!$root.user.nqUser">Disconnect</q-btn>
            </div>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12" v-if="$root.user.realUser">
        <q-card>
          <q-card-title>REAL Curriculum Author</q-card-title>
          <q-card-main>
            <p>You are a REAL Curriculum author.</p>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12">
        <q-card>
          <q-card-title>Other Settings</q-card-title>
          <q-card-main>
            <q-select
              v-model="$root.user.translation"
              float-label="Default Translation"
              :options="translationOptions"
              @input="translationChange"
            />
          </q-card-main>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data () {
    return {
      themeOptions: [
        {
          label: 'Light',
          value: 'light'
        },
        {
          label: 'Dark',
          value: 'dark'
        }
      ],
      translationOptions: [
        {
          label: 'English Standard Version - ESV',
          value: 'esv'
        },
        {
          label: 'New American Standard Bible - NASB',
          value: 'nas'
        },
        {
          label: 'New International Version - NIV',
          value: 'niv'
        },
        {
          label: 'New King James Version - NKJV',
          value: 'nkj'
        },
        {
          label: 'New English Translation - NET',
          value: 'net'
        },
        {
          label: 'Lexham English Bible - LEB',
          value: 'leb'
        },
        {
          label: 'King James Version - KVJ',
          value: 'kjv'
        },
        {
          label: 'American Standard Version - ASV',
          value: 'asv'
        },
        {
          label: 'World English Bible - WEB',
          value: 'web'
        }
      ]
    }
  },
  methods: {
    themeChange (val) {
      console.log('change...', val)
      this.$firebase.user().update({
        theme: this.$root.user.theme
      })
    },
    translationChange (val) {
      console.log('change...', val)
      this.$firebase.user().update({
        translation: this.$root.user.translation
      })
    }
  }
}
</script>

<style>
</style>
