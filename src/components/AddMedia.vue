<template>
  <div>
    <h4>Add {{ type }}</h4>
    <div class="row gutter-sm">
      <div class="col-12" v-if="type === 'quote'">
        <q-input v-model="quoteText" float-label="Quote Text" type="textarea" :max-height="100" :min-rows="1" />
      </div>
      <div class="col-12" v-if="type === 'illustration'">
        <q-input type="text" float-label="Illustatration Title" v-model="illustrationTitle" />
      </div>
      <div class="col-12" v-if="type === 'lyric'">
        <q-input type="text" float-label="Lyric Title" v-model="lyricTitle" />
      </div>
      <div class="col-12" v-if="type === 'image'">
        <q-btn-toggle
          v-model="imageType"
          toggle-color="primary"
          :options="imageOptions"
        />
      </div>
      <div class="col-12" v-if="imageType === 'wiki'">
        <q-input type="text" float-label="Wiki Title" v-model="imageTitle" />
      </div>
      <div class="col-12" v-if="imageType === 'upload'">
        <!-- Add module for drag and drop or select files -->
        <!-- Verify that it is an image file first (.jpg, .png, .gif, .pdf?) -->
      </div>
      <div class="col-12" v-if="imageType === 'link'">
        <q-input type="text" float-label="Image URL" v-model="imageURL" />
      </div>
      <div class="col-12" v-if="type === 'video'">
        <q-input type="text" float-label="Video URL" v-model="videoURL" />
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
      quoteText: '',
      illustrationTitle: '',
      lyricTitle: '',
      videoURL: '',
      imageType: '',
      imageTitle: '',
      imageURL: '',
      imageOptions: [
        {
          label: 'Wiki',
          value: 'wiki'
        },
        {
          label: 'Upload',
          value: 'upload'
        },
        {
          label: 'Link',
          value: 'link'
        }
      ],
      types: ['quote', 'image', 'illustration', 'lyric', 'video']
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.text = ''
    },
    add () {
      console.log('add')
      if (this.types.includes(this.type)) {
        var obj = {}
        switch (this.type) {
          case 'quote':
            obj.data = this.quoteText
            break
          case 'image':
            switch (this.imageType) {
              case 'wiki':
                obj.data = this.imageTitle
                obj.service = 'wiki'
                break
              case 'upload':
                obj.data = 'something'
                obj.service = 'upload'
                break
              case 'link':
                obj.data = this.imageURL
                obj.service = 'link'
                break
              default:
                console.error('invalid image type')
            }
            break
          case 'illustration':
            obj.data = this.illustrationTitle
            break
          case 'lyric':
            obj.data = this.lyricTitle
            break
          case 'video':
            obj.data = this.videoURL
            break
          default:
            console.error('invalid add media type')
        }
        this.$database.add(this.type, obj, (res) => {
          this.modalFin(res)
          Notify.create({
            message: this.type + ' created!',
            type: 'positive',
            position: 'bottom-left'
          })
        })
      }
    }
  }
}
</script>

<style>
</style>
