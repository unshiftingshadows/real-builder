<template>
  <q-page padding>
    <div class="row gutter-md items-center">
      <div class="col-xs-12 col-md-8">
        <h3>{{ lesson.title }}</h3>
      </div>
      <div class="col-xs-12 col-md-4">
        <q-input v-model="seriesName" float-label="Series" dark>
          <q-autocomplete
            @search="search"
            :min-characters="3"
            @selected="selected"
          />
        </q-input>
      </div>
      <div class="col-12">
        <q-input v-model="lesson.mainIdea" float-label="Main Idea" type="textarea" :max-height="100" :min-rows="1" dark @blur="update" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="bibleRefs" float-label="Bible References" dark @blur="update" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="lesson.tags" float-label="Tags" dark @blur="update" />
      </div>
      <div class="col-12">
        <bible-passage-list :passages="bibleRefs" />
      </div>
      <div class="col-12">
        <module-list type="olesson" :id="id" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
import * as Bible from '../statics/bible.js'
import BiblePassageList from 'components/BiblePassageList.vue'
import ModuleList from 'components/ModuleList.vue'

export default {
  components: {
    BiblePassageList,
    ModuleList
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
      console.log('update!')
      var obj = {
        mainIdea: this.lesson.mainIdea,
        bibleRefs: this.bibleRefParse,
        tags: this.lesson.tags,
        seriesID: this.lesson.seriesID
      }
      this.$database.update('olesson', this.id, obj, (res) => {
        console.log(res)
        Notify.create({
          type: 'positive',
          message: 'Lesson Updated!',
          position: 'bottom-left'
        })
      })
    }
  }
}
</script>

<style>
</style>
