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
    <q-modal ref="addModal" v-model="showAdd" content-classes="add-media-modal">
      <add-content :modal-fin="closeAdd" :type="'r' + type" ref="addContent" />
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
      type: this.$route.params.type,
      items: [],
      loading: false,
      showAdd: false
    }
  },
  mounted () {
    this.init(this.type)
  },
  methods: {
    init (type) {
      this.loading = true
      this.$database.list('r' + type, (data) => {
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
          this.$router.push({ name: 'rseries', params: { id: id } })
          break
        case 'lessons':
          this.$router.push({ name: 'rlesson', params: { id: id } })
          break
        default:
          console.error('Incorrect item type for routing')
      }
    },
    openAdd () {
      this.showAdd = true
    },
    closeAdd () {
      this.showAdd = false
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
