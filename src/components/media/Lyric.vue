<template>
  <div v-if="open">
    <div class="row gutter-sm" v-if="!editing">
      <div class="col-12">
        <q-btn icon="fas fa-times" size="xs" color="primary" @click.native="close" class="float-right" />
        <h5>{{ lyric.title }}</h5>
      </div>
      <div class="col-12">
        <p>{{ lyric.text }}</p>
      </div>
      <div class="col-12" v-if="lyric.tags.length > 0 || lyric.bibleRefs.length > 0">
        <q-chip v-if="lyric.tags.length > 0" v-for="tag in lyric.tags" :key="tag">{{ tag }}</q-chip>
        <!-- |
        <q-chip v-if="lyric.bibleRefs.length > 0" v-for="bibleRef in lyric.bibleRefs" :key="bibleRef">{{ bibleRef }}</q-chip> -->
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="editing = true">Edit</q-btn>
      </div>
    </div>
    <div class="row gutter-sm" v-if="editing">
      <div class="col-12">
        <q-input v-model="lyric.title" float-label="Title" type="text" />
      </div>
      <div class="col-12">
        <q-input v-model="lyric.text" float-label="Lyric" type="textarea" :max-height="100" :min-rows="1" />
      </div>
      <div class="col-12">
        <q-chips-input v-model="lyric.tags" float-label="Tags" />
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="save">Save</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  props: ['data', 'open', 'close'],
  name: 'media-lyric',
  data () {
    return {
      editing: false,
      lyric: {
        tags: [],
        bibleRefs: [],
        author: '',
        text: '',
        mediaTitle: ''
      }
    }
  },
  watch: {
    'data': function (val) {
      console.log('val', val)
      if (val !== {}) {
        this.editing = false
        this.lyric = val
      }
    }
  },
  mounted () {
    this.lyric = this.data
  },
  methods: {
    save () {
      this.$database.update('lyric', this.lyric._id, this.lyric, (res) => {
        Notify.create({
          type: 'positive',
          message: 'Lyric saved!',
          position: 'bottom-left'
        })
        this.editing = false
      })
    }
  }
}
</script>

<style>
</style>
