<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-xs-12 col-md-6">
        <h3>{{ lesson.title }} <span class="q-headline text-weight-light">Review</span></h3>
      </div>
      <div class="col-xs-12 col-md-6">
        <q-btn icon="fas fa-ellipsis-v" color="primary" class="float-right" style="margin-left: 10px; margin-bottom: 10px;">
          <q-popover anchor="bottom right" self="top right">
            <q-list link>
              <q-item v-close-overlay @click.native="editTitle = true">Rename...</q-item>
              <q-item v-close-overlay @click.native="editMainIdea = true">Main Idea</q-item>
              <q-item link v-close-overlay @click.native="$router.push({ name: 'rlesson', params: { seriesid: $route.params.seriesid, lessonid: id } })">Devos</q-item>
              <q-item link v-close-overlay @click.native="$router.push({ name: 'rresearch', params: { seriesid: $route.params.seriesid, lessonid: id } })">Research</q-item>
              <q-item link v-close-overlay @click.native="$router.push({ name: 'rguide', params: { seriesid: $route.params.seriesid, lessonid: id } })">Guides</q-item>
              <!-- <q-item-separator /> -->
              <!-- <q-item v-close-overlay>Archive</q-item> -->
              <!-- <q-item v-close-overlay>Share...</q-item> -->
              <!-- <q-item v-close-overlay>Print...</q-item> -->
              <!-- <q-item v-close-overlay>Present...</q-item> -->
            </q-list>
          </q-popover>
        </q-btn>
        <p>{{ lesson.mainIdea }}</p>
      </div>
      <div class="col-12">
      </div>
    </div>
    <q-modal v-model="editTitle" ref="editTitleModal" content-classes="edit-title-modal">
      <div class="row gutter-md">
        <div class="col-12">
          <q-btn
            color="primary"
            @click.native="editTitle = false"
            icon="fas fa-times"
            class="float-right"
            size="sm"
          />
          <h4>Edit Title</h4>
        </div>
        <div class="col-12">
          <q-input v-model="lesson.title" />
        </div>
        <div class="col-12">
          <q-btn color="primary" @click.native="update">Save</q-btn>
        </div>
      </div>
    </q-modal>
    <q-modal v-model="editMainIdea" ref="editMainIdeaModal" content-classes="edit-title-modal">
      <div class="row gutter-md">
        <div class="col-12">
          <q-btn
            color="primary"
            @click.native="editMainIdea = false"
            icon="fas fa-times"
            class="float-right"
            size="sm"
          />
          <h4>Edit Main Idea</h4>
        </div>
        <div class="col-12">
          <q-input v-model="lesson.mainIdea" />
        </div>
        <div class="col-12">
          <q-btn color="primary" @click.native="update">Save</q-btn>
        </div>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'

export default {
  // name: 'PageName',
  data () {
    return {
      seriesid: this.$route.params.seriesid,
      id: this.$route.params.lessonid,
      lesson: {},
      editTitle: false,
      editMainIdea: false
    }
  },
  firebase () {
    return {
      lesson: {
        source: this.$firebase.ref('rlesson', this.$route.params.lessonid, this.$route.params.seriesid),
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
    },
    update () {
      this.editTitle = false
      this.editMainIdea = false
      var obj = {
        title: this.lesson.title,
        mainIdea: this.lesson.mainIdea
      }
      this.$firebase.ref('rlesson', this.$route.params.lessonid, this.$route.params.seriesid).update(obj).then(() => {
        Notify.create({
          type: 'positive',
          message: 'Lesson updated!',
          position: 'bottom-left'
        })
      })
    }
  }
}
</script>

<style>

.edit-title-modal {
  padding: 30px;
  width: 100%;
}

@media screen and (min-width: 1200px) {
  .edit-title-modal {
    min-width: 500px;
    width: 500px;
  }
}

</style>
