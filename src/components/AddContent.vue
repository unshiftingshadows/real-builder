<template>
  <q-modal ref="addContentModal" v-model="showAddContent" content-classes="add-content-modal">
    <q-btn
      color="primary"
      @click.native="showAddContent = false"
      icon="fas fa-times"
      class="float-right"
      size="sm"
    />
    <h4>Add {{ readableType }}</h4>
    <div class="row gutter-sm">
      <div class="col-12">
        <q-input type="text" float-label="Title" v-model="title" />
      </div>
      <div class="col-12" v-if="type === 'osermon' || type === 'olesson'">
        <h5>Choose a template...</h5>
      </div>
      <div class="col-xs-12 col-md-6" v-if="type === 'osermon' || type === 'olesson'">
        <q-card>
          <q-card-title>Expositional</q-card-title>
          <q-card-main>
            <p>Start out with a passage and break it down, verse-by-verse!</p>
            <q-input type="text" float-label="Bible Passage" v-model="bibleRef" />
            <br/>
            <br/>
            <q-btn color="primary" class="float-right" :disabled="bibleRef === ''" @click.native="add('expo')">Choose</q-btn>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-xs-12 col-md-6" v-if="type === 'osermon' || type === 'olesson'">
        <q-card>
          <q-card-title>3-Point</q-card-title>
          <q-card-main>
            <p>The familiar 3-point {{ type }} to get you started!</p>
            <q-btn color="primary" class="float-right" @click.native="add('3point')">Choose</q-btn>
          </q-card-main>
        </q-card>
      </div>
      <div class="col-12">
        <h5 v-if="type === 'osermon' || type === 'olesson'">...Or start from scratch</h5>
        <q-btn color="primary" class="float-right" @click.native="add('blank')">Add Blank {{ readableType }}</q-btn>
      </div>
    </div>
  </q-modal>
</template>

<script>
import { Notify, format } from 'quasar'
const { capitalize } = format

export default {
  props: ['type'],
  // name: 'ComponentName',
  data () {
    return {
      showAddContent: false,
      title: '',
      types: ['rseries', 'oseries', 'olesson', 'osermon', 'oscratch'],
      bibleRef: ''
    }
  },
  computed: {
    readableType: function () {
      return capitalize(this.type.slice(1))
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.title = ''
    },
    add (template) {
      if (this.types.includes(this.type)) {
        var obj = {
          title: this.title,
          template: template,
          prefs: this.$root.user.prefs[this.type + 'Structure']
        }
        this.$database.add(this.type, obj, (res) => {
          this.showAddContent = false
          Notify.create({
            message: this.type + ' created!',
            type: 'positive',
            position: 'bottom-left'
          })
          this.$router.push({ name: this.type, params: { id: res._id } })
        })
      }
    },
    show () {
      this.showAddContent = true
    }
  }
}
</script>

<style>
</style>
