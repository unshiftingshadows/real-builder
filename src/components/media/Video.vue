<template>
  <div v-if="open">
    <div class="row gutter-sm" v-if="!editing">
      <div class="col-12">
        <q-btn icon="fas fa-times" size="xs" color="primary" @click.native="close" class="float-right" />
        <q-video :src="video.embedURL" />
      </div>
      <div class="col-12">
        <p>{{ video.title }}</p>
      </div>
      <div class="col-12" v-if="video.tags.length > 0 || video.bibleRefs.length > 0">
        <q-chip v-if="video.tags.length > 0" v-for="tag in video.tags" :key="tag">{{ tag }}</q-chip>
        <!-- |
        <q-chip v-if="video.bibleRefs.length > 0" v-for="bibleRef in video.bibleRefs" :key="bibleRef">{{ bibleRef }}</q-chip> -->
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="editing = true">Edit</q-btn>
      </div>
    </div>
    <div class="row gutter-sm" v-if="editing">
      <div class="col-12">
        <q-video :src="video.embedURL" />
      </div>
      <div class="col-12">
        <p><b>Location:</b> {{ video.service }}</p>
      </div>
      <div class="col-12">
        <q-chips-input v-model="video.tags" float-label="Tags" />
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="save">Save</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  props: ['data', 'open', 'close'],
  name: 'media-video',
  data () {
    return {
      editing: false,
      video: {
        tags: [],
        bibleRefs: []
      }
    }
  },
  watch: {
    'data': function (val) {
      console.log('val', val)
      if (val !== {}) {
        this.editing = false
        this.video = val
      }
    }
  },
  mounted () {
    this.video = this.data
  },
  methods: {
    save () {
      this.$database.update('video', this.video._id, this.video, (res) => {
        Notify.create({
          type: 'positive',
          message: 'Video saved!',
          position: 'bottom-left'
        })
        this.editing = false
      })
    }
  }
}
</script>

<style>

.q-video {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
  width: 100%;
}
.q-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

</style>
