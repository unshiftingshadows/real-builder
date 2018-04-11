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
        <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ data.time }} minutes&nbsp;&nbsp;&nbsp;</span>
        <q-icon name="fas fa-align-left" color="primary" size="2rem" />&nbsp;&nbsp;&nbsp;
        {{ data.title }}
      </q-card-title>
      <q-card-main>
        <p><span v-html="data.text" /></p>
      </q-card-main>
    </div>
    <div v-if="data.editing === $firebase.auth.currentUser.uid">
      <q-card-main>
        <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="close" />
        <div class="row gutter-sm">
          <div class="col-12">
            <q-input v-model="data.title" float-label="Title" />
          </div>
          <div class="col-12">
            <editor :text.sync="data.text" />
          </div>
          <div class="col-12">
            <q-btn color="primary" @click.native="save(id)">Save</q-btn>
            <q-btn color="negative" @click.native="remove(id)">Delete</q-btn>
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
  name: 'mod-text',
  props: [ 'id', 'data', 'edit', 'save', 'close', 'remove' ],
  data () {
    return {}
  }
}
</script>

<style>
</style>
