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
        <q-chips-input v-model="bibleRefs" float-label="Bible Refs" @blur="update" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import * as Bible from '../statics/bible.js'
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
        tags: []
      },
      bibleRefParse: [],
      bibleRefs: []
    }
  },
  watch: {
    bibleRefs: function (userRefList) {
      userRefList.forEach((ref) => {
        var refObj = Bible.parseBibleRef(ref)
        this.bibleRefParse.push(refObj)
      })
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$database.view('oscratch', this.id, (data) => {
        this.scratch = data
        data.bibleRefs.forEach((ref) => {
          this.bibleRefs.push(Bible.stringBibleRef(ref))
        })
      })
    },
    update () {
      console.log('update!')
      var obj = {
        text: this.scratch.text,
        tags: this.scratch.tags,
        bibleRefs: this.bibleRefParse
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
