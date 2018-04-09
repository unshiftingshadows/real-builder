<template>
  <q-card color="dark">
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
        <q-icon name="fas fa-book" color="primary" size="2rem" />&nbsp;&nbsp;&nbsp;
        {{ data.bibleRef }}
      </q-card-title>
      <q-card-main>
        <p>{{ data.text }}</p>
      </q-card-main>
    </div>
    <div v-if="data.editing === $firebase.auth.currentUser.uid">
      <q-card-main>
        <q-icon link class="float-right cursor-pointer" name="fas fa-times" color="primary" size="1rem" @click.native="close" />
        <div class="row gutter-sm">
          <div class="col-12">
            <q-input v-model="data.bibleRef" float-label="Bible Ref" dark @keyup.enter="preSave" />
          </div>
          <div class="col-12">
            <q-btn color="primary" @click.native="preSave">Save</q-btn>
            <q-btn color="negative" @click.native="remove(id)">Delete</q-btn>
          </div>
        </div>
      </q-card-main>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'mod-bible',
  props: [ 'id', 'data', 'edit', 'save', 'close', 'remove' ],
  data () {
    return {
      passages: []
    }
  },
  methods: {
    preSave () {
      this.$database.bible(this.data.bibleRef, 'esv', (data) => {
        console.log(data)
        // NOTE: This needs to be moved to the server side -- not all versions will
        //       follow this same format
        this.data.text = data.passages[0]
        this.data.bibleRef = data.canonical
        this.save(this.id)
      })
    }
  }
}
</script>

<style>
</style>
