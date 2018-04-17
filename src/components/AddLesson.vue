<template>
  <div class="col-12 relative-position" style="height: 70px">
    <q-btn round color="primary" icon="fa-plus" class="absolute-center" @click.native="addModule" />
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [ 'nextLessonOrder', 'close', 'edit' ],
  data () {
    return {
      showAddMedia: false,
      type: 'lesson'
    }
  },
  methods: {
    addModule () {
      console.log('add module')
      this.close()
      var newRef = this.$firebase.lessonsRef(this.$parent.id).push({
        editing: this.$firebase.auth.currentUser.uid,
        order: this.nextLessonOrder,
        title: '',
        mainIdea: '',
        bibleRefs: '',
        notes: '',
        prayer: '',
        application: ''
      })
      this.edit(newRef.key)
    }
  }
}
</script>

<style>

.add-media-modal {
  padding: 30px;
  width: 100%;
}
@media screen and (min-width: 1200px) {
  .add-media-modal {
    min-width: 500px;
    width: 500px;
  }
}

</style>
