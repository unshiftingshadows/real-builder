<template>
  <q-card flat class="bg-primary">
    <q-card-title><h5 style="margin: 0;">{{ id === 'hook' ? 'Hook' : data.title }}</h5></q-card-title>
    <div class="row gutter-sm" style="padding-left: 10px; padding-right: 10px;">
      <div class="col-12">
        <draggable :list="modules" @start="drag=true" @end="onDrag" @add="onAdd" @remove="onRemove" ref="secModuleDrag" :options="{ group: 'modules', disabled: disabled || $q.platform.is.mobile }">
          <component v-for="mod in modules" :key="mod['.key']" v-bind:is="'mod-' + mod.type" :id="mod['.key']" :data="mod" :edit="editModule" :save="saveModule" :autosave="autoSaveModule" :close="closeModule" :remove="removeModule" class="module-card" v-bind:class="{ 'active-card': mod.editing === $firebase.auth.currentUser.uid }" />
        </draggable>
      </div>
      <div class="col-12">
        <add-module :next-mod-order="nextModOrder" :sectionid="id" :edit="editModule" :close="closeModule" :content-type="contentType" dark />
      </div>
    </div>
  </q-card>
</template>

<script>
import Draggable from 'vuedraggable'
import AddModule from 'components/AddModule.vue'
import ModSection from 'components/modules/Section.vue'
import ModQuote from 'components/modules/Quote.vue'
import ModText from 'components/modules/Text.vue'
import ModBible from 'components/modules/Bible.vue'
import ModActivity from 'components/modules/Activity.vue'
import ModQuestion from 'components/modules/Question.vue'
import ModVideo from 'components/modules/Video.vue'
import ModImage from 'components/modules/Image.vue'
import ModComposition from 'components/modules/Composition.vue'
import ModLyric from 'components/modules/Lyric.vue'
import ModIllustration from 'components/modules/Illustration.vue'

export default {
  components: {
    Draggable,
    AddModule,
    ModSection,
    ModQuote,
    ModText,
    ModBible,
    ModActivity,
    ModQuestion,
    ModVideo,
    ModImage,
    ModComposition,
    ModLyric,
    ModIllustration
  },
  // name: 'ComponentName',
  props: ['id', 'data', 'disabled', 'contentType', 'contentid'],
  data () {
    return {
      drag: false
    }
  },
  firebase () {
    return {
      'modules': {
        source: this.$firebase.sectionModules(this.contentType, this.contentid, this.id, this.$route.params.seriesid, this.$route.params.lessonid),
        readyCallback: function (val) {
          console.log('section modules loaded')
          this.modules.forEach((mod) => {
            mod.editing = false
          })
        }
      }
    }
  },
  computed: {
    nextModOrder: function () {
      if (this.data.modules) {
        return this.data.modules.length
      } else {
        return 0
      }
    }
  },
  methods: {
    editModule (moduleid) {
      this.$emit('edit', moduleid, this.id)
    },
    saveModule (moduleid, data) {
      this.$emit('save', moduleid, this.id, data)
    },
    autoSaveModule (moduleid, text) {
      this.$emit('autosave', moduleid, this.id, text)
    },
    closeModule (moduleid) {
      this.$emit('close', moduleid, this.id)
    },
    removeModule (moduleid) {
      this.$emit('remove', moduleid, this.id)
    },
    onAdd () {

    },
    onRemove () {

    },
    onDrag () {
      this.drag = false
      console.log('dragged')
    }
  }
}
</script>

<style>
</style>
