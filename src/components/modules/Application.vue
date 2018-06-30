<template>
  <q-card>
    <div v-if="!data.editing">
      <q-card-title>
        <q-icon class="float-right cursor-sectioner" name="fas fa-edit" color="primary" size="1rem" @click.native="edit(id)" />
        <span class="float-right" style="font-size: .8rem; vertical-align: top; line-height: 1rem;">{{ data.time }} minutes&nbsp;&nbsp;&nbsp;</span>
        Application
        <span slot="subtitle" v-if="data.title !== ''">{{ data.title }}</span>
      </q-card-title>
      <q-card-main>
        <p><span v-html="data.text" /></p>
      </q-card-main>
    </div>
    <div v-if="data.editing">
      <q-card-title>
        <q-icon link class="float-right cursor-sectioner" name="fas fa-times" color="primary" size="1rem" @click.native="close" />
        Application
      </q-card-title>
      <q-card-main>
        <div class="row gutter-sm">
          <div class="col-12">
            <q-input v-model="data.title" float-label="Subtitle" />
          </div>
          <div class="col-12">
            <q-input v-model="data.thought" float-label="Questions to Consider" type="textarea" :max-height="100" :min-rows="1" />
          </div>
          <div class="col-12">
            <q-input v-model="data.today" float-label="Today" type="textarea" :max-height="100" :min-rows="1" />
          </div>
          <div class="col-12">
            <q-input v-model="data.thisweek" float-label="This Week" type="textarea" :max-height="100" :min-rows="1" />
          </div>
          <div class="col-12">
            <q-btn color="primary" @click.native="save(id, undefined, data)">Save</q-btn>
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
  name: 'mod-application',
  props: [ 'id', 'data', 'edit', 'save', 'close', 'remove' ],
  data () {
    return {}
  },
  methods: {
    autoSave () {
      console.log('auto save text')
      this.$firebase.ref(this.$parent.$parent.type, 'modules', this.$parent.$parent.id).child(this.id).update({
        text: this.data.text
      })
    }
  }
}
</script>

<style>
</style>
