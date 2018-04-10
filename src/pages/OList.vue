<template>
  <q-page padding>
    <h3>{{ type }} <q-btn size="sm" icon="fa-plus" color="primary" @click.native="openAdd()" /></h3>
    <div v-if="loading">
      <q-spinner color="primary" class="absolute-center" size="3rem" />
    </div>
    <div v-if="!loading">
      <q-card inline v-for="item in items" :key="item._id" class="media-card" @click.native="openItem(item._id)">
        <q-card-title>{{ item.title }}</q-card-title>
        <q-card-main>
          <p>{{ item.mainIdea }}</p>
        </q-card-main>
      </q-card>
    </div>
    <q-modal ref="addContentModal" v-model="showAddContent" content-classes="add-media-modal">
      <add-content :modal-fin="closeAdd" :type="'o' + type" ref="addContent" />
    </q-modal>
    <q-modal ref="addMediaModal" v-model="showAddMedia" content-classes="add-media-modal">
      <!-- TODO: Add add-media component to manage adding new medias -->
    </q-modal>
    <q-modal ref="showMediaModal" v-model="showMedia" content-classes="add-media-modal">
      <!-- TODO: Add variable components to show and edit media -->
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
      contentTypes: ['rseries', 'oseries', 'olessons', 'osermons'],
      mediaTypes: ['quotes', 'images', 'illustrations', 'lyrics', 'videos'],
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
      switch (this.type) {
        case 'series':
          this.$router.push({ name: 'oseries', params: { id: id } })
          break
        case 'lessons':
          this.$router.push({ name: 'olesson', params: { id: id } })
          break
        case 'sermons':
          this.$router.push({ name: 'osermon', params: { id: id } })
          break
        default:
          console.error('Incorrect item type for routing')
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
    closeAdd () {
      this.showAddContent = false
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
