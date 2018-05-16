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
        <q-icon name="fas fa-align-left" color="primary" size="2rem" />&nbsp;&nbsp;&nbsp;
        {{ data.title }}
      </q-card-title>
      <q-card-main>
        <p>{{ data.mainIdea }}</p>
        <p class="q-caption">{{ data.notes }}</p>
        <q-chip v-for="ref in readableRefs" :key="ref" color="secondary">{{ ref }}</q-chip>
      </q-card-main>
    </div>
    <div v-if="data.editing === $firebase.auth.currentUser.uid">
      <q-card-main>
        <q-icon link class="float-right cursor-pointer" name="fas fa-times" size="1rem" @click.native="close" />
        <div class="row gutter-sm">
          <div class="col-12">
            <q-input v-model="data.title" float-label="Title" />
          </div>
          <div class="col-12">
            <q-input v-model="data.mainIdea" float-label="Main Idea" type="textarea" :max-height="150" :min-rows="3" />
          </div>
          <div class="col-12">
            <q-input v-model="data.notes" float-label="Notes" type="textarea" :max-height="150" :min-rows="3" />
          </div>
          <div class="col-12">
            <q-chips-input
              color="secondary"
              v-model="readableRefs"
              float-label="Bible References"
              @input="addRef"
            />
          </div>
          <div class="col-12">
            <q-btn color="primary" @click.native="save(id)">Save</q-btn>
            <q-btn outline color="negative" @click.native="remove(id)">Delete</q-btn>
          </div>
        </div>
      </q-card-main>
    </div>
  </q-card>
</template>

<script>
import Editor from 'components/Editor.vue'

export default {
  components: {
    Editor
  },
  name: 'mod-lesson',
  props: [ 'id', 'data', 'edit', 'save', 'close', 'remove' ],
  data () {
    return {
      readableRefs: []
    }
  },
  watch: {
    'data': function (val) {
      if (val.bibleRefs !== undefined) {
        this.readableRefs = val.bibleRefs.split(',').map(e => { return this.$bible.readable(e) })
      }
    }
  },
  methods: {
    addRef (newRef) {
      this.data.bibleRefs = newRef.map(e => { return this.$bible.parse(e) }).join(',')
      this.readableRefs = newRef.map(e => { return this.$bible.readable(e) })
    }
  }
}
</script>

<style>
</style>
