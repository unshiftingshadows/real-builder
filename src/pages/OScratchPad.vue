<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-12">
        <h3>{{ scratch.title }}</h3>
      </div>
      <div class="col-12">
        <editor :text.sync="scratch.text" :save="update" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="scratch.tags" float-label="Tags" @blur="update" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input
          color="secondary"
          v-model="readableRefs"
          float-label="Bible References"
          @blur="update"
          @input="addRef"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import Editor from 'components/Editor.vue'

export default {
  components: {
    Editor
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.id,
      scratch: {
        tags: [],
        bibleRefs: []
      },
      readableRefs: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$database.view('oscratch', this.id, (data) => {
        this.scratch = data
        this.readableRefs = data.bibleRefs.map(e => { return this.$bible.readable(e) })
      })
    },
    addRef (newRef) {
      this.scratch.bibleRefs = newRef.map(e => { return this.$bible.parse(e) })
      this.readableRefs = newRef.map(e => { return this.$bible.readable(e) })
    },
    update () {
      console.log('update!')
      var obj = {
        text: this.scratch.text,
        tags: this.scratch.tags,
        bibleRefs: this.scratch.bibleRefs
      }
      this.$database.update('oscratch', this.id, obj, (res) => {
        console.log(res)
        Notify.create({
          type: 'positive',
          message: 'Scratch updated!',
          position: 'bottom-left'
        })
      })
    }
  }
}
</script>

<style>
</style>
