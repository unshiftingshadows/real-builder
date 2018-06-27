<template>
  <q-page padding>
    <div class="row gutter-md">
      <div class="col-xs-12 col-md-6">
        <h3>{{ lesson.title }}</h3>
      </div>
      <div class="col-xs-12 col-md-6">
        <q-btn icon="fas fa-ellipsis-v" color="primary" class="float-right" style="margin-left: 10px; margin-bottom: 10px;">
          <q-popover anchor="bottom right" self="top right">
            <q-list link>
              <q-item v-close-overlay @click.native="editTitle = true">Rename...</q-item>
              <q-item v-close-overlay @click.native="editMainIdea = true">Main Idea</q-item>
              <q-item link v-close-overlay @click.native="$router.push({ name: 'rlesson', params: { seriesid: $route.params.seriesid, lessonid: id } })">Devos</q-item>
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
        <q-input type="text" v-model="searchTerms" float-label="Search" clearable @keyup.enter="search" />
      </div>
      <div class="col-12">
        <q-spinner size="4rem" color="primary" class="absolute-center" v-if="loading" />
      </div>
      <div class="col-12" v-if="searchTerms !== '' && searchItems.length > 0">
        <n-q-list v-if="searchTerms !== ''" :items="searchItems" :add-module="addResource" add-button />
      </div>
      <div class="col-12" v-show="searchTerms === ''">
        <resource-list :id="id" type="rlesson" />
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
import NQList from 'components/NQList.vue'
import ResourceList from 'components/ResourceList.vue'

export default {
  components: {
    NQList,
    ResourceList
  },
  // name: 'PageName',
  data () {
    return {
      seriesid: this.$route.params.seriesid,
      id: this.$route.params.lessonid,
      lesson: {},
      editTitle: false,
      editMainIdea: false,
      searchTerms: '',
      searchItems: [],
      loading: false
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
  watch: {
    'searchTerms': function (value) {
      if (value === '') this.searchItems = []
    }
  },
  methods: {
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
    },
    search () {
      if (this.searchTerms !== '') {
        this.searchItems = []
        this.loading = true
        this.$database.search('nqmedia', this.searchTerms, {}, (res) => {
          this.searchItems = res
          this.loading = false
        })
      }
    },
    addResource (id, type) {
      this.$database.resources('rlesson', this.id, 'add', { id: id, type: type }, (res) => {
        console.log('RResearch', res)
      })
    },
    addResearch () {
    }
  }
}
</script>

<style>
</style>
