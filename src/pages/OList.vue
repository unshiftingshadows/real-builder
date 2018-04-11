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
    <div v-if="!loading && mediaTypes.includes(type)">
      <q-card inline v-for="item in items" :key="item._id" class="media-card" @click.native="openItem(item._id)">
        <q-card-media v-if="type === 'image' || type === 'video'">
          <img :src="item.thumbURL" />
          <q-card-title slot="overlay" v-if="type === 'video'">{{ item.title }}</q-card-title>
        </q-card-media>
        <q-card-title v-if="type === 'lyric' || type === 'illustration'">{{ item.title }}</q-card-title>
        <q-card-main v-if="type !== 'image' && type !== 'video'">
          <p>{{ item.text }}</p>
        </q-card-main>
      </q-card>
    </div>
    <q-modal ref="addContentModal" v-model="showAddContent" content-classes="add-media-modal">
      <add-content :modal-fin="closeAddContent" :type="'o' + type" ref="addContent" />
    </q-modal>
    <q-modal ref="addMediaModal" v-model="showAddMedia" content-classes="add-media-modal">
      <add-media :modal-fin="closeAddMedia" :type="type" ref="addMedia" />
    </q-modal>
    <q-modal ref="showMediaModal" v-model="showMedia" content-classes="add-media-modal">
      <!-- TODO: Add variable components to show and edit media -->
    </q-modal>
  </q-page>
</template>

<script>
import AddContent from 'components/AddContent.vue'
import AddMedia from 'components/AddMedia.vue'

export default {
  components: {
    AddContent,
    AddMedia
  },
  // name: 'PageName',
  data () {
    return {
      contentTypes: ['series', 'lesson', 'sermon', 'scratch'],
      mediaTypes: ['quote', 'image', 'illustration', 'lyric', 'video'],
      type: this.$route.params.type,
      items: [],
      loading: false,
      showAddContent: false,
      showAddMedia: false,
      showMedia: false
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
      this.$database.list('o' + type, (data) => {
        console.log('data', data, this)
        this.items = data
        this.loading = false
      })
    },
    openItem (id) {
      console.log(id)
      console.log(this.type)
      if (this.contentTypes.includes(this.type)) {
        this.$router.push({ name: 'o' + this.type, params: { id: id } })
      } else if (this.mediaTypes.includes(this.type)) {
        console.log('open media')
      }
    },
    openAdd () {
      if (this.contentTypes.includes(this.type)) {
        this.showAddContent = true
      } else if (this.mediaTypes.includes(this.type)) {
        this.showAddMedia = true
      } else {
        console.error('incorrect type to add')
      }
    },
    closeAddContent () {
      this.showAddContent = false
    },
    closeAddMedia (newItem) {
      this.showAddMedia = false
      this.items.push(newItem)
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

.add-media-modal {
  padding: 30px;
  width: 100%;
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
  .add-media-modal {
    min-width: 500px;
    width: 500px;
  }
}

</style>
