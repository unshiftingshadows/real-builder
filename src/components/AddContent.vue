<template>
  <div>
    <h4>Add {{ type }}</h4>
    <div class="row gutter-sm">
      <div class="col-12">
        <q-input type="text" float-label="Title" v-model="title" />
      </div>
      <div class="col-12">
        <q-btn color="primary" class="float-right" @click.native="add">Add {{ type }}</q-btn>
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
      title: '',
      types: ['rseries', 'oseries', 'olesson', 'osermon', 'oscratch']
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
      if (this.types.includes(this.type)) {
        var obj = {
          title: this.title
        }
        this.$database.add(this.type, obj, (res) => {
          this.modalFin()
          Notify.create({
            message: this.type + ' created!',
            type: 'positive',
            position: 'bottom-left'
          })
          this.$router.push({ name: this.type, params: { id: res._id } })
        })
      }
    }
  }
}
</script>

<style>
</style>
