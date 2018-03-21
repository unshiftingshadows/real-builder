<template>
  <div>
    <h4>Add {{ type }}</h4>
    <div class="row gutter-sm">
      <div class="col-12">
        <q-input type="text" float-label="Title" v-model="title" dark />
      </div>
      <div class="col-12">
        <q-btn color="primary" class="float-right" @click.native="add()">Add {{ type }}</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  props: ['type', 'modalFin'],
  // name: 'ComponentName',
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.title = ''
    },
    add () {
      switch (this.type) {
        case 'rseries':
          this.addRSeries()
          break
        case 'oseries':
          this.addOSeries()
          break
        case 'olessons':
          this.addOLesson()
          break
        default:
          console.error('Incorrect add type')
      }
    },
    addRSeries () {
      var obj = {
        title: this.title
      }
      this.database.add('rseries', obj, (res) => {
        this.modalFin()
        Notify.create({
          message: 'REAL Series created!',
          type: 'positive',
          positon: 'bottom-left'
        })
        this.$router.push({ name: 'rseries', params: { id: res._id } })
      })
    },
    addOSeries () {
      var obj = {
        title: this.title
      }
      this.database.add('oseries', obj, (res) => {
        this.modalFin()
        Notify.create({
          message: 'Other Series created!',
          type: 'positive',
          positon: 'bottom-left'
        })
        this.$router.push({ name: 'oseries', params: { id: res._id } })
      })
    },
    addOLesson () {
      var obj = {
        title: this.title
      }
      this.database.add('olesson', obj, (res) => {
        this.modalFin()
        Notify.create({
          message: 'Other Lesson created!',
          type: 'positive',
          positon: 'bottom-left'
        })
        this.$router.push({ name: 'olesson', params: { id: res._id } })
      })
    }
  }
}
</script>

<style>
</style>
