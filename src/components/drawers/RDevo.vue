<template>
  <div>
    <h5>{{ lesson.title }}</h5>
    <p>{{ lesson.mainIdea }}</p>
    <hr/>
    <q-input v-model="devo.notes" float-label="Devo Notes" type="textarea" :max-height="150" :min-rows="3" />
    <hr/>
    <resources />
  </div>
</template>

<script>
import Resources from 'components/Resources.vue'

export default {
  components: {
    Resources
  },
  // name: 'ComponentName',
  firebase () {
    return {
      lesson: {
        source: this.$firebase.lessonsRef(this.$route.params.seriesid).child(this.$route.params.lessonid),
        asObject: true,
        readyCallback: function (val) {
          console.log('ran!', val)
        }
      },
      devo: {
        source: this.$firebase.devoContentRef(this.$route.params.seriesid, this.$route.params.lessonid, this.$route.params.devoid),
        asObject: true
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
