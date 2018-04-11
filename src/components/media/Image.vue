<template>
  <div v-if="open">
    <div class="row gutter-sm" v-if="!editing">
      <div class="col-12">
        <q-btn icon="fas fa-times" size="xs" color="primary" @click.native="close" class="float-right" />
        <img :src="image.imageURL" width="100%" />
      </div>
      <div class="col-12" v-if="image.tags.length > 0 || image.bibleRefs.length > 0">
        <q-chip v-if="image.tags.length > 0" v-for="tag in image.tags" :key="tag">{{ tag }}</q-chip>
        <!-- |
        <q-chip v-if="image.bibleRefs.length > 0" v-for="bibleRef in image.bibleRefs" :key="bibleRef">{{ bibleRef }}</q-chip> -->
      </div>
      <div class="col-12">
        <q-btn color="primary" @click.native="editing = true">Edit</q-btn>
      </div>
    </div>
    <div class="row gutter-sm" v-if="editing">
      <div class="col-12">
        <img :src="image.imageURL" width="100%" />
      </div>
      <div class="col-12">
        <p><b>Location:</b> {{ image.service }}</p>
      </div>
      <div class="col-12">
        <q-chips-input v-model="image.tags" float-label="Tags" />
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
  name: 'media-image',
  data () {
    return {
      editing: false,
      image: {
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
        this.image = val
      }
    }
  },
  mounted () {
    this.image = this.data
  },
  methods: {
    save () {
      this.$database.update('image', this.image._id, this.image, (res) => {
        Notify.create({
          type: 'positive',
          message: 'Image saved!',
          position: 'bottom-left'
        })
        this.editing = false
      })
    }
  }
}
</script>

<style>
</style>
