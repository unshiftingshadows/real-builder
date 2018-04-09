<template>
  <div>
    <!-- <q-btn color="primary" label="Refresh" @click.native="init" /> -->
    <q-resize-observable @resize="onResize" />
    <add-research :currentResearch="research" :id="id" :type="type" :reinit="init" />
    <n-q-list :items="resources" :width="size.width/2" :addModule="addModule" />
  </div>
</template>

<script>
import MediaList from 'components/MediaList.vue'
import NQList from 'components/NQList.vue'
import AddResearch from 'components/AddResearch.vue'

export default {
  components: {
    MediaList,
    NQList,
    AddResearch
  },
  // name: 'ComponentName',
  data () {
    return {
      type: this.$route.name,
      id: this.$route.params.id,
      resources: [],
      research: [],
      size: {
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route.name': function (val) {
      this.type = val
      this.init()
    }
  },
  methods: {
    init () {
      // Check if NQ user to determine what resources to get ---
      //    NQ user --> get from $database.resources
      //    Non-NQ user --> get from $database.list?
      console.log(this.type)
      this.resources = []
      this.$database.resources(this.type, this.id, (res) => {
        console.log('response', res)
        this.research = res.research
        res.research.forEach((research) => {
          this.resources = this.resources.concat(research.media.resources)
        })
        // Once media is also implemented
        // this.resources.push(res.media)
      })
    },
    resType (type) {
      var items = []
      this.resources.forEach(item => {
        if (item.type === type) {
          items.push(item.media)
        }
      })
      return items
    },
    onResize (size) {
      this.size = size
    },
    addModule (id, type) {
      var newRef = this.$firebase.ref(this.type, 'modules', this.id).push()
      switch (type) {
        case 'quote':
          newRef.set({
            type: 'quote',
            mediaid: id,
            editing: false,
            slide: false,
            order: 'new',
            time: 0,
            wordcount: 0
          })
          break
        default:
          console.error('incorrect new module type')
          return false
      }
    }
  }
}
</script>

<style>
</style>
