<template>
  <div class="row gutter-sm">
    <div class="col-12" v-if="structure.hook">
      <!-- Hook module -->
      <q-card color="dark">
        <div v-if="!structure.hook.editing || structure.hook.editing !== $firebase.auth.currentUser.uid">
          <q-card-title>
            <q-icon v-if="!structure.hook.editing" class="float-right cursor-pointer" name="fas fa-edit" color="primary" size="1rem" @click.native="editingId = 'hook'" />
            <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ structure.hook.time }} minutes&nbsp;&nbsp;&nbsp;</span>
            Hook
            <span slot="subtitle" v-if="structure.hook.title !== ''">{{ structure.hook.title }}</span>
          </q-card-title>
          <q-card-main>
            <p><span v-html="structure.hook.text" /></p>
          </q-card-main>
        </div>
        <div v-if="structure.hook.editing === $firebase.auth.currentUser.uid">
          <q-card-title>
            <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="editingId = ''" />
            Hook
          </q-card-title>
          <q-card-main>
            <div class="row gutter-sm">
              <div class="col-12">
                <q-input v-model="structure.hook.title" float-label="Subtitle" dark />
              </div>
              <div class="col-12">
                <editor :text.sync="structure.hook.text" />
              </div>
            </div>
          </q-card-main>
        </div>
      </q-card>
    </div>
    <!-- This is where other modules will be populated -->
    <div class="col-12">
      <draggable :list="modules" @start="drag=true" @end="onDrag">
          <component v-for="mod in modules" :key="mod['.key']" v-bind:is="'mod-' + mod.type" :id="mod['.key']" :data="mod" :edit="moduleEdit" :remove="moduleDelete" class="module-card" />
      </draggable>
    </div>
    <!-- This button should always be just below the last user-made module -->
    <div class="col-12 relative-position" style="height: 70px">
      <q-btn round color="primary" icon="fa-plus" class="absolute-center" @click.native="showAdd" />
    </div>
    <div class="col-12" v-if="structure.application">
      <!-- Application module -->
      <q-card color="dark">
        <div v-if="!structure.application.editing">
          <q-card-title>
            <q-icon class="float-right cursor-pointer" name="fas fa-edit" color="primary" size="1rem" @click.native="editingId = 'application'" />
            <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ structure.application.time }} minutes&nbsp;&nbsp;&nbsp;</span>
            Application
            <span slot="subtitle" v-if="structure.application.title !== ''">{{ structure.hook.title }}</span>
          </q-card-title>
          <q-card-main>
            <p><span v-html="structure.application.text" /></p>
          </q-card-main>
        </div>
        <div v-if="structure.application.editing">
          <q-card-title>
            <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="editingId = ''" />
            Application
          </q-card-title>
          <q-card-main>
            <div class="row gutter-sm">
              <div class="col-12">
                <q-input v-model="structure.application.title" float-label="Subtitle" dark />
              </div>
              <div class="col-12">
                <q-input v-model="structure.application.thought" float-label="Questions to Consider" type="textarea" :max-height="100" :min-rows="1" dark />
              </div>
              <div class="col-12">
                <q-input v-model="structure.application.today" float-label="Today" type="textarea" :max-height="100" :min-rows="1" dark />
              </div>
              <div class="col-12">
                <q-input v-model="structure.application.thisweek" float-label="This Week" type="textarea" :max-height="100" :min-rows="1" dark />
              </div>
            </div>
          </q-card-main>
        </div>
      </q-card>
    </div>
    <div class="col-12" v-if="structure.prayer">
      <!-- Prayer module -->
      <q-card color="dark">
        <div v-if="!structure.prayer.editing">
          <q-card-title>
            <q-icon class="float-right cursor-pointer" name="fas fa-edit" color="primary" size="1rem" @click.native="editingId = 'prayer'" />
            <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ structure.prayer.time }} minutes&nbsp;&nbsp;&nbsp;</span>
            Prayer
            <span slot="subtitle" v-if="structure.hook.title !== ''">{{ structure.prayer.title }}</span>
          </q-card-title>
          <q-card-main>
            <p><span v-html="structure.prayer.text" /></p>
          </q-card-main>
        </div>
        <div v-if="structure.prayer.editing">
          <q-card-title>
            <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="editingId = ''" />
            Prayer
          </q-card-title>
          <q-card-main>
            <div class="row gutter-sm">
              <div class="col-12">
                <q-input v-model="structure.prayer.title" float-label="Subtitle" dark />
              </div>
              <div class="col-12">
                <editor :text.sync="structure.prayer.text" />
              </div>
            </div>
          </q-card-main>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'
import Editor from 'components/Editor.vue'
import ModPoint from 'components/modules/Point.vue'
import ModQuote from 'components/modules/Quote.vue'
import ModText from 'components/modules/Text.vue'
import ModBible from 'components/modules/Bible.vue'
import ModActivity from 'components/modules/Activity.vue'
import ModQuestion from 'components/modules/Question.vue'
import ModVideo from 'components/modules/Video.vue'
import ModImage from 'components/modules/Image.vue'
import ModComposition from 'components/modules/Composition.vue'

export default {
  components: {
    Draggable,
    Editor,
    ModPoint,
    ModQuote,
    ModText,
    ModBible,
    ModActivity,
    ModQuestion,
    ModVideo,
    ModImage,
    ModComposition
  },
  props: ['type', 'id'],
  // name: 'ComponentName',
  firebase () {
    return {
      structure: {
        source: this.$firebase.ref(this.type, 'structure', this.id),
        asObject: true
      },
      modules: {
        source: this.$firebase.ref(this.type, 'modules', this.id).orderByChild('order'),
        readyCallback: function (val) {
          var check = this.modules.find((element) => {
            return element.editing === this.$firebase.auth.currentUser.uid
          })
          if (check) {
            this.closeEdit(check['.key'])
          }
        }
      }
    }
  },
  mounted () {
    // this.init()
  },
  beforeDestroy () {
    if (this.editingId !== '') {
      this.closeEdit(this.editingId)
    }
  },
  data () {
    return {
      editingId: false,
      drag: false
    }
  },
  watch: {
    editingId: function (newid, oldid) {
      console.log('old', oldid)
      console.log('new', newid)
      if (!oldid) {
        console.log('no oldid...')
      } else {
        this.closeEdit(oldid)
      }
      if (newid !== '') {
        this.startEdit(newid)
      }
    }
  },
  computed: {
    nextModOrder: function () {
      return this.modules.length
    },
    nextPointOrder: function () {
      return this.modules.filter((val) => {
        return val.type === 'point'
      }).length + 1
    }
  },
  methods: {
    init () {
    },
    showAdd () {
      this.$q.actionSheet({
        title: 'Add Module',
        grid: true,
        actions: [
          {
            label: 'Point',
            color: 'primary',
            icon: 'fa-list-ol',
            handler: () => {
              console.log('point!')
              this.addModule('point')
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
      })
    },
    addModule (type) {
      console.log('add module')
      if (this.editingId !== '') {
        this.closeEdit(this.editingId)
      }
      var newRef = this.$firebase.ref(this.type, 'modules', this.id).push()
      switch (type) {
        case 'point':
          newRef.set({
            type: 'point',
            title: '',
            editing: this.$firebase.auth.currentUser.uid,
            slide: false,
            order: this.nextModOrder,
            number: this.nextPointOrder,
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
        default:
          console.error('incorrect new module type')
          return false
      }
      this.editingId = newRef.key
    },
    startEdit (id) {
      console.log('edit', id)
      // Turn on editing for id
      if (id === 'hook' || id === 'application' || id === 'prayer') {
        // this.structure[id].editing = true
        this.$firebase.ref(this.type, 'structure', this.id).child(id).update({
          editing: this.$firebase.auth.currentUser.uid
        })
      } else {
        // this.modules[id].editing = true
        this.$firebase.ref(this.type, 'modules', this.id).child(id).update({
          editing: this.$firebase.auth.currentUser.uid
        })
      }
    },
    closeEdit (id) { // closes editing on a module and **saves** any edits
      console.log('close', id)
      if (id) {
        if (id === 'hook' || id === 'application' || id === 'prayer') {
          this.structure[id].editing = false
          if (id === 'hook' || id === 'prayer') {
            this.structure[id].wordcount = this.getWordCount(this.structure[id].text)
            this.structure[id].time = this.getEstTime(this.structure[id].wordcount)
          } else {
            this.strucutre.application.wordcount = this.getWordCount(this.structure.application.thought + ' ' + this.structure.application.today + ' ' + this.structure.application.thisweek)
            this.structure.application.time = this.getEstTime(this.structure.application.wordcount)
          }
          // Save changes
          this.$firebase.ref(this.type, 'structure', this.id).child(id).update(this.structure[id])
        } else {
          var updatedMod = {...this.getModuleById(id)}
          updatedMod.editing = false
          delete updatedMod['.key']
          if (updatedMod.type === 'text' || updatedMod.type === 'bible' || updatedMod === 'quote') {
            // If needing to set wordcount and time
            updatedMod.wordcount = this.getWordCount(updatedMod.text)
            updatedMod.time = this.getEstTime(updatedMod.wordcount)
          }
          console.log('updated', updatedMod)
          // Save changes
          this.$firebase.ref(this.type, 'modules', this.id).child(id).set(updatedMod)
        }
      } else {
      }
      // Close edting for all modules
      // this.structure.hook.editing = false
      // this.structure.application.editing = false
      // this.structure.prayer.editing = false
      // console.log('length', this.modules)
      // if (this.modules['.value'] !== null) {
      //   for (var mod in this.modules) {
      //     this.modules[mod].editing = false
      //   }
      // }
    },
    moduleEdit (id) {
      this.editingId = id
    },
    moduleDelete (id) {
      this.$firebase.ref(this.type, 'modules', this.id).child(id).remove()
    },
    getModuleById (id) {
      return this.modules.find((element) => {
        return element['.key'] === id
      })
    },
    getModuleByOrder (order) {
      return this.modules.find((element) => {
        return element.order === order
      })
    },
    getWordCount (string) {
      return string.split(' ').length
    },
    getEstTime (wordcount) {
      return Math.ceil(wordcount / 120)
    },
    onDrag (val) {
      this.drag = false
      console.log('dragged', val)
      console.log('ran')
      var allMods = {}
      // Needs to update the 'order' prop of all modules
      var pointCount = 1
      this.modules.forEach((mod, index) => {
        var updatedMod = {...mod}
        updatedMod.order = index
        delete updatedMod['.key']
        if (mod.type === 'point') {
          console.log('pointCount', pointCount)
          console.log('point', updatedMod)
          updatedMod.number = pointCount
          pointCount = pointCount + 1
        }
        allMods[mod['.key']] = updatedMod
        // console.log('reorder', updatedMod)
      })
      console.log(allMods)
      this.$firebase.ref(this.type, 'modules', this.id).update(allMods)
    }
  }
}
</script>

<style>

.module-card {
  margin-bottom: 20px;
}

</style>
