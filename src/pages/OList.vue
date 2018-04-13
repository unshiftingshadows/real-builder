<template>
  <q-page padding>
    <h3>{{ type }} <q-btn size="sm" icon="fa-plus" color="primary" @click.native="openAdd()" /></h3>
    <div v-if="loading">
      <q-spinner color="primary" class="absolute-center" size="3rem" />
    </div>
    <div v-if="!loading && contentTypes.includes(type)">
      <q-card inline v-for="item in items" :key="item._id" class="media-card" @click.native="openItem(item._id)">
        <q-card-title>{{ item.title }}</q-card-title>
        <q-card-main>
          <p>{{ item.mainIdea }}</p>
        </q-card-main>
      </q-card>
    </div>
    <q-modal ref="addContentModal" v-model="showAddContent" content-classes="add-media-modal" v-if="contentTypes.includes(type)">
      <add-content :modal-fin="closeAddContent" :type="'o' + type" ref="addContent" />
    </q-modal>
  </q-page>
</template>

<script>
import AddContent from 'components/AddContent.vue'

export default {
  components: {
    AddContent
  },
  // name: 'PageName',
  data () {
    return {
      contentTypes: ['series', 'lesson', 'sermon', 'scratch'],
      type: this.$route.params.type,
      items: [],
      loading: false,
      showAddContent: false
    }
  },
  mounted () {
    this.init(this.type)
  },
  watch: {
    '$route.params.type' (newType, oldType) {
      this.type = newType
      this.init(newType)
    }
  },
  methods: {
    init (type) {
      this.loading = true
      this.items = []
      this.$database.list('o' + type, (data) => {
        console.log('data', data, this)
        this.items = data
        this.loading = false
      })
    },
    openItem (id, item) {
      console.log(id)
      console.log(this.type)
      if (this.contentTypes.includes(this.type)) {
        this.$router.push({ name: 'o' + this.type, params: { id: id } })
      }
    },
    openAdd () {
      if (this.contentTypes.includes(this.type)) {
        this.showAddContent = true
      } else {
        console.error('incorrect type to add')
      }
    },
    closeAddContent () {
      this.showAddContent = false
    }
  }
}
</script>

<style>

.media-card {
  margin: 10px;
  width: 95%;
  cursor: pointer;
}

@media screen and (min-width: 800px) {
  .media-card {
    width: 47%;
  }
}
@media screen and (min-width: 1200px) {
  .media-card {
    width: 31%;
  }
}

</style>
