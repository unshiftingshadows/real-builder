<template>
  <div class="col-12 relative-position" style="height: 70px">
    <q-btn round color="primary" icon="fa-plus" class="absolute-center" @click.native="showAdd" />
    <q-modal ref="addMediaModal" v-model="showAddMedia" content-classes="add-media-modal" v-if="mediaTypes.includes(type)">
      <add-media :modal-fin="finMedia" :type="type" ref="addMedia" />
    </q-modal>
  </div>
</template>

<script>
import AddMedia from 'components/AddMedia.vue'

export default {
  components: {
    AddMedia
  },
  // name: 'ComponentName',
  props: [ 'nextModOrder', 'nextSectionOrder', 'close', 'edit' ],
  data () {
    return {
      mediaTypes: ['quote', 'image', 'illustration', 'lyric', 'video'],
      showAddMedia: false,
      type: ''
    }
  },
  methods: {
    showAdd () {
      // NOTE: Need to split list for lessons vs sermons
      var actions = [
        {
          label: 'Section',
          color: 'primary',
          icon: 'fa-list-ol',
          handler: () => {
            console.log('section!')
            this.addModule('section')
          }
        },
        {
          label: 'Text',
          color: 'primary',
          icon: 'fa-align-left',
          handler: () => {
            console.log('text!')
            this.addModule('text')
          }
        },
        {
          label: 'Bible',
          color: 'primary',
          icon: 'fa-book',
          handler: () => {
            console.log('bible!')
            this.addModule('bible')
          }
        },
        {
          label: 'Activity',
          color: 'primary',
          icon: 'fa-trophy',
          handler: () => {
            console.log('activity!')
            this.addModule('activity')
          }
        },
        {
          label: 'Question',
          color: 'primary',
          icon: 'fa-question',
          handler: () => {
            console.log('question!')
            this.addModule('question')
          }
        }
      ]
      if (this.$root.user.prefs.mediaType.quote) {
        actions.push({
          label: 'Quote',
          color: 'primary',
          icon: 'fa-quote-left',
          handler: () => {
            console.log('quote!')
            this.type = 'quote'
            this.showAddMedia = true
          }
        })
      }
      if (this.$root.user.prefs.mediaType.image) {
        actions.push({
          label: 'Image',
          color: 'primary',
          icon: 'fa-image',
          handler: () => {
            console.log('image!')
            this.type = 'image'
            this.showAddMedia = true
          }
        })
      }
      if (this.$root.user.prefs.mediaType.illustration) {
        actions.push({
          label: 'Illustration',
          color: 'primary',
          icon: 'fa-paint-brush',
          handler: () => {
            console.log('illustration!')
            this.type = 'illustration'
            this.showAddMedia = true
          }
        })
      }
      if (this.$root.user.prefs.mediaType.lyric) {
        actions.push({
          label: 'Lyric',
          color: 'primary',
          icon: 'fa-music',
          handler: () => {
            console.log('lyric!')
            this.type = 'lyric'
            this.showAddMedia = true
          }
        })
      }
      if (this.$root.user.prefs.mediaType.video) {
        actions.push({
          label: 'Video',
          color: 'primary',
          icon: 'fa-play',
          handler: () => {
            console.log('video!')
            this.type = 'video'
            this.showAddMedia = true
          }
        })
      }
      this.$q.actionSheet({
        title: 'Add Module',
        grid: true,
        actions: actions
      })
    },
    addModule (type, id) {
      console.log('add module')
      this.close()
      var newRef = this.$firebase.ref(this.$parent.type, 'modules', this.$parent.id).push()
      switch (type) {
        case 'section':
          newRef.set({
            type: 'section',
            title: '',
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            number: this.nextSectionOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'text':
          newRef.set({
            type: 'text',
            title: '',
            text: '',
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'bible':
          newRef.set({
            type: 'bible',
            text: '',
            bibleRef: '',
            translation: this.$root.user.prefs.bibleTranslation,
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'activity':
          newRef.set({
            type: 'activity',
            title: '',
            text: '',
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'question':
          newRef.set({
            type: 'question',
            text: '',
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'quote':
          newRef.set({
            type: 'quote',
            mediaid: id,
            editing: false,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'image':
          newRef.set({
            type: 'image',
            mediaid: id,
            editing: false,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'illustration':
          newRef.set({
            type: 'illustration',
            mediaid: id,
            editing: false,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'lyric':
          newRef.set({
            type: 'lyric',
            mediaid: id,
            editing: false,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        case 'video':
          newRef.set({
            type: 'video',
            mediaid: id,
            editing: false,
            slide: false,
            order: this.nextModOrder,
            time: 0,
            wordcount: 0
          })
          break
        default:
          console.error('incorrect new module type')
          return false
      }
      if (this.mediaTypes.includes(type)) {
        this.edit('')
      } else {
        this.edit(newRef.key)
      }
    },
    finMedia (media) {
      this.showAddMedia = false
      this.addModule(this.type, media._id)
      this.type = ''
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
