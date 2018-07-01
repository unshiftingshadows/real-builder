<template>
  <q-page padding>
    <div class="row gutter-md items-center">
      <div class="col-xs-12">
        <q-btn icon="fas fa-ellipsis-v" color="primary" class="float-right">
          <q-popover anchor="bottom right" self="top right">
            <q-list link>
              <q-item v-close-overlay @click.native="editTitle = true">Rename...</q-item>
              <q-item v-close-overlay @click.native="showPreview = true">Preview</q-item>
              <q-item-separator />
              <q-item v-close-overlay><q-toggle label="Hook" v-model="structure.hook" /></q-item>
              <q-item v-close-overlay><q-toggle label="Application" v-model="structure.application" /></q-item>
              <q-item v-close-overlay><q-toggle label="Prayer" v-model="structure.prayer" /></q-item>
              <!-- <q-item v-close-overlay>Archive</q-item> -->
              <!-- <q-item v-close-overlay>Share...</q-item> -->
              <!-- <q-item v-close-overlay>Print...</q-item> -->
              <!-- <q-item v-close-overlay>Present...</q-item> -->
            </q-list>
          </q-popover>
        </q-btn>
        <h3>{{ sermon.title }}</h3>
        <!-- <q-input v-model="seriesName" float-label="Series" dark>
          <q-autocomplete
            @search="search"
            :min-characters="3"
            @selected="selected"
          />
        </q-input> -->
      </div>
      <div class="col-12">
        <q-input v-model="sermon.mainIdea" float-label="Main Idea" type="textarea" :max-height="100" :min-rows="1" @blur="update" />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input
          color="secondary"
          v-model="readableRefs"
          float-label="Bible References"
          @blur="update"
          @input="addRef"
        />
      </div>
      <div class="col-xs-12 col-md-6">
        <q-chips-input v-model="sermon.tags" float-label="Tags" @blur="update" />
      </div>
      <!-- <div class="col-12">
        <bible-passage-list :passages="bibleRefs" />
      </div> -->
      <div class="col-12">
        <!-- <module-list type="osermon" :id="id" @modules-init="modulesInit" /> -->
        <content-editor :key="id" :id="id" type="osermon" @modules-init="modulesInit" />
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
          <q-input v-model="sermon.title" />
        </div>
        <div class="col-12">
          <q-btn color="primary" @click.native="update">Save</q-btn>
        </div>
      </div>
    </q-modal>
    <q-modal v-model="showPreview" ref="previewModal" content-classes="preview-modal" maximized>
      <div class="row gutter-md justify-center" v-if="showPreview">
        <div class="col-xs-12 col-md-8">
          <q-btn
            color="primary"
            @click.native="showPreview = false"
            icon="fas fa-times"
            class="float-right"
            size="sm"
          />
          <h2>{{ sermon.title }}</h2>
        </div>
        <div class="col-xs-12 col-md-8">
          <h3>Main Idea</h3>
          <h6>{{ sermon.mainIdea }}</h6>
        </div>
        <div class="col-xs-12 col-md-8">
          <render-modules :id="id" type="osermon" />
        </div>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { Notify } from 'quasar'
// import BiblePassageList from 'components/BiblePassageList.vue'
// import ModuleList from 'components/ModuleList.vue'
import ContentEditor from 'components/ContentEditor.vue'
import RenderModules from 'components/preview/RenderModules.vue'

export default {
  components: {
    // BiblePassageList,
    // ModuleList,
    ContentEditor,
    RenderModules
  },
  // name: 'PageName',
  data () {
    return {
      id: this.$route.params.id,
      sermon: {
        tags: [],
        bibleRefs: []
      },
      seriesName: '',
      readableRefs: [],
      editTitle: false,
      structure: {
        hook: true,
        application: true,
        prayer: true
      },
      updating: true,
      showPreview: false
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    'structure.hook': function (newHook) {
      this.$firebase.ref('osermon', 'structure', this.id).child('hook').update({ show: newHook })
    },
    'structure.application': function (newApplication) {
      this.$firebase.ref('osermon', 'structure', this.id).child('application').update({ show: newApplication })
    },
    'structure.prayer': function (newPrayer) {
      this.$firebase.ref('osermon', 'structure', this.id).child('prayer').update({ show: newPrayer })
    }
  },
  methods: {
    init () {
      this.$database.view('osermon', this.id, (data) => {
        this.sermon = data
        this.readableRefs = data.bibleRefs.map(e => { return this.$bible.readable(e) })
      })
    },
    modulesInit (structure) {
      this.updating = true
      this.structure = structure
      this.updating = false
    },
    addRef (newRef) {
      this.sermon.bibleRefs = newRef.map(e => { return this.$bible.parse(e) })
      this.readableRefs = newRef.map(e => { return this.$bible.readable(e) })
    },
    search (terms, done) {
      var obj = {
        title: terms
      }
      var options = {
        autocomplete: true,
        data: false
      }
      this.$database.search('oseries', obj, options, (res) => {
        done(res)
      })
    },
    selected (item) {
      this.seriesName = item.label
      this.sermon.seriesID = item.value
      this.update()
    },
    update () {
      // Call update function from database
      console.log('update!')
      this.editTitle = false
      var obj = {
        title: this.sermon.title,
        mainIdea: this.sermon.mainIdea,
        bibleRefs: this.sermon.bibleRefs,
        tags: this.sermon.tags,
        seriesID: this.sermon.seriesID
      }
      this.$database.update('osermon', this.id, obj, (res) => {
        console.log(res)
        Notify.create({
          type: 'positive',
          message: 'Sermon Updated!',
          position: 'bottom-left'
        })
      })
    }
  }
}
</script>

<style>

.edit-title-modal, .preview-modal {
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
