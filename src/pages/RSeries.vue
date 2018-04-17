<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-12">
        <h3>{{ series.title }}</h3>
      </div>
      <div class="col-12">
        <q-input v-model="series.mainIdea" float-label="Main Idea" type="textarea" :max-height="150" :min-rows="3" />
      </div>
      <div class="col-12">
        <lesson-list type="lesson" :id="id" />
      </div>
    </div>
  </q-page>
</template>

<script>
import LessonList from 'components/LessonList.vue'

export default {
  components: {
    LessonList
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.id,
      series: {}
    }
  },
  firebase () {
    return {
      series: {
        source: this.$firebase.ref('rseries', '', this.$route.params.id),
        asObject: true,
        readyCallback: function (val) {
          console.log('ran!', val)
        }
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // this.$database.view('rseries', this.id, (res) => {
      //   this.series = res
      // })
    }
  }
}
</script>

<style>
</style>
