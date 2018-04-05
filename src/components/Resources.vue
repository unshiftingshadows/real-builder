<template>
  <div>
    <!-- <q-btn color="primary" label="Refresh" @click.native="init" /> -->
    <q-resize-observable @resize="onResize" />
    <add-research :currentResearch="research" :id="id" :type="type" />
    <media-list :items="resources" :width="size.width/2" />
  </div>
</template>

<script>
import MediaList from 'components/MediaList.vue'
import AddResearch from 'components/AddResearch.vue'

export default {
  components: {
    MediaList,
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
    }
  },
  methods: {
    init () {
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
    }
  }
}
</script>

<style>
</style>
