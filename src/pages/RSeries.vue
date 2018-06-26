<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-12">
        <q-btn icon="fas fa-ellipsis-v" color="primary" class="float-right">
          <q-popover anchor="bottom right" self="top right">
            <q-list link>
              <q-item v-close-overlay @click.native="editTitle = true">Rename...</q-item>
              <!-- <q-item-separator /> -->
              <!-- <q-item v-close-overlay>Archive</q-item> -->
              <!-- <q-item v-close-overlay>Share...</q-item> -->
              <!-- <q-item v-close-overlay>Print...</q-item> -->
              <!-- <q-item v-close-overlay>Present...</q-item> -->
            </q-list>
          </q-popover>
        </q-btn>
        <h3>{{ series.title }}</h3>
      </div>
      <div class="col-12">
        <q-input v-model="series.mainIdea" float-label="Main Idea" type="textarea" :max-height="150" :min-rows="3" @blur="update()" />
      </div>
      <div class="col-12">
        <lesson-list :id="id" />
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
          <q-input v-model="series.title" />
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
import LessonList from 'components/LessonList.vue'

export default {
  components: {
    LessonList
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.seriesid,
      series: {},
      editTitle: false
    }
  },
  firebase () {
    return {
      series: {
        source: this.$firebase.ref('rseries', '', this.$route.params.seriesid),
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
      var obj = {
        title: this.series.title,
        mainIdea: this.series.mainIdea
      }
      this.$firebase.ref('rseries', '', this.id).update(obj).then(() => {
        // console.log(res)
        Notify.create({
          type: 'positive',
          message: 'Series updated!',
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
