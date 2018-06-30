<template>
  <q-card color="secondary">
    <div v-show="!data.editing || data.editing !== $firebase.auth.currentUser.uid">
      <q-card-title>
        <q-icon v-show="!data.editing" class="float-right cursor-pointer" name="fas fa-ellipsis-v" size="1rem">
          <q-popover anchor="bottom right" self="top right">
            <q-list>
              <q-item link v-close-overlay @click.native="edit(id)">Edit</q-item>
              <q-item link @click.native="remove(id)">Delete</q-item>
            </q-list>
          </q-popover>
        </q-icon>
        <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ data.time }} minutes&nbsp;&nbsp;&nbsp;</span>
        <q-icon name="fas fa-book" size="2rem" />&nbsp;&nbsp;&nbsp;
        {{ data.bibleRef }} <span class="q-caption">{{ data.translation }}</span>
      </q-card-title>
      <q-card-main>
        <p>{{ data.text }}</p>
      </q-card-main>
    </div>
    <div v-if="data.editing === $firebase.auth.currentUser.uid">
      <q-card-main>
        <q-icon link class="float-right cursor-pointer" name="fas fa-times" size="1rem" @click.native="close" />
        <div class="row gutter-sm">
          <div class="col-12">
            <q-input v-model="data.bibleRef" float-label="Bible Ref" @keyup.enter="preSave" class="dark-label" dark autofocus />
          </div>
          <div class="col-12">
            <q-select
              v-model="translation"
              float-label="Bible Translation"
              :options="translationOptions"
              class="dark-label"
              dark
            />
          </div>
          <div class="col-12">
            <q-btn color="primary" @click.native="preSave" :disabled="loading">Save</q-btn>
            <q-btn outline color="negative" @click.native="remove(id)">Delete</q-btn>
            &nbsp;&nbsp;
            <q-spinner color="primary" size="2rem" v-if="loading" />
          </div>
        </div>
      </q-card-main>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'mod-bible',
  props: [ 'id', 'data', 'edit', 'save', 'close', 'remove' ],
  data () {
    return {
      loading: false,
      passages: [],
      translation: this.data.translation,
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
    preSave () {
      this.loading = true
      this.$database.bible(this.data.bibleRef, this.translation, (data) => {
        console.log(data)
        // NOTE: This needs to be moved to the server side -- not all versions will
        //       follow this same format
        this.data.text = data.text
        this.data.translation = this.translation
        this.data.bibleRef = this.$bible.readable(this.data.bibleRef)
        this.loading = false
        this.save(this.id, this.data)
      })
    }
  }
}
</script>

<style>

.dark-label .q-if-label {
  color: white !important;
}

</style>
