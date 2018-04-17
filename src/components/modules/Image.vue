<template>
  <q-card>
    <div v-show="!data.editing || data.editing !== $firebase.auth.currentUser.uid">
      <q-card-title>
        <q-icon v-show="!data.editing" class="float-right cursor-pointer" name="fas fa-ellipsis-v" color="primary" size="1rem">
          <q-popover>
            <q-list>
              <q-item link v-close-overlay @click.native="edit(id)">Edit</q-item>
              <q-item link @click.native="remove(id)">Delete</q-item>
            </q-list>
          </q-popover>
        </q-icon>
        <q-icon name="fas fa-image" color="primary" size="2rem" />&nbsp;&nbsp;&nbsp;
      </q-card-title>
      <q-card-media>
        <img :src="media.imageURL" style="width: 100%;" />
      </q-card-media>
    </div>
    <div v-if="data.editing === $firebase.auth.currentUser.uid">
      <q-card-main>
        <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="close" />
        <div class="row gutter-sm">
          <div class="col-12">
            <p>To edit images...use the media links on the left to edit the original image directly</p>
          </div>
          <div class="col-12">
            <!-- <q-btn color="primary" @click.native="preSave">Save</q-btn> -->
            <q-btn color="negative" @click.native="remove(id)">Delete</q-btn>
          </div>
        </div>
      </q-card-main>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'mod-image',
  props: [ 'id', 'data', 'edit', 'save', 'remove', 'close' ],
  data () {
    return {
      media: {
        imageURL: ''
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.$database.view(this.data.type, this.data.mediaid, (res) => {
        if (!this.$root.user.nqUser) {
          if (res.resource.service === 'upload') {
            this.$firebase.imagesRef.child(res.resource._id).getDownloadURL().then((url) => {
              res.resource.thumbURL = url
              res.resource.imageURL = url
              res.resource.pageURL = url
            })
          }
        } else {
          console.log('pull nq resource...')
        }
        this.media = res.resource
      })
    },
    preSave () {
      this.save(this.id)
    }
  }
}
</script>

<style>
</style>
