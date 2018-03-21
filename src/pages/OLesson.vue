<template>
  <q-page padding>
    <div class="row gutter-md items-center">
      <div class="col-12">
        <h3>{{ lesson.title }}</h3>
      </div>
      <div class="col-xs-12 col-md-4">
        <q-input v-model="seriesName" label="Series" dark>
          <q-autocomplete
            @search="search"
            :min-characters="3"
            @selected="selected"
          />
        </q-input>
      </div>
      <div class="col-xs-12 col-md-8">
        <q-input v-model="lesson.mainIdea" float-label="Main Idea" type="textarea" :max-height="100" :min-rows="2" dark />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="bibleRefs" float-label="Bible References" dark />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="lesson.tags" float-label="Tags" dark />
      </div>
      <div class="col-12">
        <bible-passage-list :passages="bibleRefs" />
      </div>
      <div class="col-12">
        <editor />
      </div>
    </div>
  </q-page>
</template>

<script>
import * as Bible from '../statics/bible.js'
import BiblePassageList from 'components/BiblePassageList.vue'
import Editor from 'components/Editor.vue'

export default {
  components: {
    BiblePassageList,
    Editor
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.id,
      lesson: {
        tags: []
      },
      seriesName: '',
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
      this.$database.view('olesson', this.id, (data) => {
        this.lesson = data
        data.bibleRefs.forEach((ref) => {
          this.bibleRefs.push(Bible.stringBibleRef(ref))
        })
      })
    },
    search (terms, done) {
      var obj = {
        title: terms
      }
      var options = {
        autocomplete: true,
        data: false
      }
      this.$database.search('oseries', obj, options, (res) => {
        done(res)
      })
    },
    selected (item) {
      this.seriesName = item.label
      this.lesson.seriesID = item.value
      this.update()
    },
    update () {
      // Call update function from database
      // this.database.update('olesson', this.id, data, (res) => {
      // })
      console.log('update!')
    }
  }
}
</script>

<style>
</style>
