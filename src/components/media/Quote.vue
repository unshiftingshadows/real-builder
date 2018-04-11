<template>
  <div v-if="open">
    <div class="row gutter-sm" v-if="!editing">
      <div class="col-12">
        <q-btn icon="fas fa-times" size="xs" color="primary" @click.native="close" class="float-right" />
        <p>{{ quote.text }}</p>
      </div>
      <div class="col-12" v-if="quote.mediaid.title || quote.mediaid.author">
        <p>{{ quote.mediaid.title }} | {{ quote.mediaid.author }}</p>
      </div>
      <div class="col-12" v-if="quote.tags.length > 0 || quote.bibleRefs.length > 0">
        <q-chip v-if="quote.tags.length > 0" v-for="tag in quote.tags" :key="tag">{{ tag }}</q-chip>
        <!-- |
        <q-chip v-if="quote.bibleRefs.length > 0" v-for="bibleRef in quote.bibleRefs" :key="bibleRef">{{ bibleRef }}</q-chip> -->
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="editing = true">Edit</q-btn>
        <q-btn color="primary" v-if="addModule !== undefined" @click.native="add">Add</q-btn>
      </div>
    </div>
    <div class="row gutter-sm" v-if="editing">
      <div class="col-12">
        <q-input v-model="quote.text" float-label="Quote" type="textarea" :max-height="100" :min-rows="1" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-input v-model="quote.mediaid.title" float-label="Title" type="text" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-input v-model="quote.mediaid.author" float-label="Author" type="text" />
      </div>
      <div class="col-12">
        <q-chips-input v-model="quote.tags" float-label="Tags" />
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
  props: ['data', 'open', 'close', 'addModule'],
  name: 'media-quote',
  data () {
    return {
      editing: false,
      quote: {
        tags: [],
        bibleRefs: [],
        mediaid: {
          title: '',
          author: ''
        }
      }
    }
  },
  watch: {
    'data': function (val) {
      console.log('val', val)
      if (val !== {}) {
        this.editing = false
        this.quote = val
      }
    }
  },
  mounted () {
    this.quote = this.data
  },
  methods: {
    save () {
      this.$database.update('quote', this.quote._id, this.quote, (res) => {
        Notify.create({
          type: 'positive',
          message: 'Quote saved!',
          position: 'bottom-left'
        })
        this.editing = false
      })
    },
    add () {
      this.addModule(this.quote._id, 'quote', this.quote)
      this.close()
    }
  }
}
</script>

<style>
</style>
