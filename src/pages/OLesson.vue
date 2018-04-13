<template>
  <q-page padding>
    <div class="row gutter-md items-center">
      <div class="col-xs-12 col-md-8">
        <h3>{{ lesson.title }}</h3>
      </div>
      <div class="col-xs-12 col-md-4">
        <q-input v-model="seriesName" float-label="Series">
          <q-autocomplete
            @search="search"
            :min-characters="3"
            @selected="selected"
          />
        </q-input>
      </div>
      <div class="col-12">
        <q-input v-model="lesson.mainIdea" float-label="Main Idea" type="textarea" :max-height="100" :min-rows="1" @blur="update" />
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
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="lesson.tags" float-label="Tags" @blur="update" />
      </div>
      <!-- <div class="col-12">
        <bible-passage-list :passages="bibleRefs" />
      </div> -->
      <div class="col-12">
        <module-list type="olesson" :id="id" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
// import BiblePassageList from 'components/BiblePassageList.vue'
import ModuleList from 'components/ModuleList.vue'

export default {
  components: {
    // BiblePassageList,
    ModuleList
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.id,
      lesson: {
        tags: [],
        bibleRefs: []
      },
      seriesName: '',
      readableRefs: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$database.view('olesson', this.id, (data) => {
        this.lesson = data
        this.readableRefs = data.bibleRefs.map(e => { return this.$bible.readable(e) })
      })
    },
    addRef (newRef) {
      this.lesson.bibleRefs = newRef.map(e => { return this.$bible.parse(e) })
      this.readableRefs = newRef.map(e => { return this.$bible.readable(e) })
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
        bibleRefs: this.lesson.bibleRefs,
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
