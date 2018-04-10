<template>
  <div>
    <div class="row gutter-sm">
      <div class="col-12">
        <q-btn label="Pack" color="primary" @click.native="pack" />
      </div>
      <div class="col-12">
        <q-input v-model="searchTerms" dark />
      </div>
      <div class="col-12">
        <bricks
          ref="bricks"
          :data="showItems"
          :sizes="sizes"
        >
          <template slot-scope="scope">
            <q-card color="primary" inline v-bind:class="[scope.item.type] + 'l'" class="media-cardl" @click.native="openItem(scope.item._id, scope.item.type)">
              <!-- <q-icon name="fas fa-plus" color="positive" class="float-right cursor-pointer" style="margin-top: 5px; margin-right: 5px;" /> -->
              <q-card-media v-if="scope.item.type == 'video' || scope.item.type == 'image'">
                <img :src="scope.item.thumbURL" />
              </q-card-media>
              <q-card-title v-if="scope.item.type == 'video' || scope.item.type === 'lyric'">
                {{ scope.item.title }}
              </q-card-title>
              <q-card-main v-if="scope.item.type === 'quote' || scope.item.type === 'illustration'">
                <p v-if="scope.item.type === 'illustration'"><b>{{ scope.item.title }}</b></p>
                <p>{{ scope.item.text }}</p>
                <p class="q-body-2" v-if="scope.item.type === 'quote'">{{ scope.item.author }} - {{ scope.item.mediaTitle }}</p>
                <p class="q-body-2" v-if="scope.item.type === 'illustration'">{{ scope.item.author }}</p>
              </q-card-main>
            </q-card>
          </template>
        </bricks>
      </div>
    </div>
    <q-modal v-model="resourceOpen" content-classes="resource-modal">
      <resource-preview :type="resourceType" :resource="resource" :addModule="addModule" :close="closeResource" />
    </q-modal>
  </div>
</template>

<script>
import Bricks from 'vue-bricks'
import ResourcePreview from 'components/ResourcePreview.vue'

export default {
  components: {
    Bricks,
    ResourcePreview
  },
  // name: 'ComponentName',
  props: ['width', 'addModule'],
  data () {
    return {
      items: [],
      showItems: [],
      resourceOpen: false,
      resourceType: '',
      resource: '',
      sizes: [
        { columns: 1, gutter: 20 },
        { mq: '800px', columns: 2, gutter: 20 },
        { mq: '1000px', columns: 3, gutter: 20 },
        { mq: '1200px', columns: 2, gutter: 20 }
      ],
      cardStyle: {
        width: this.width
      },
      selectedTypes: [
        'book',
        'quote'
      ],
      types: [
        {
          label: 'Image',
          value: 'image'
        },
        {
          label: 'Video',
          value: 'video'
        },
        {
          label: 'Quote',
          value: 'quote'
        },
        {
          label: 'Illustration',
          value: 'illustration'
        },
        {
          label: 'Lyric',
          value: 'lyric'
        }
      ]
    }
  },
  watch: {
    'selectedTypes': function () {
      this.showItems = this.items.filter(this.checkType)
    },
    'items': function (value) {
      this.showItems = value
      this.pack()
    },
    'width': function () {
      this.pack()
    }
  },
  updated () {
    console.log('updated')
    console.log(this.$refs.bricks)
    this.pack()
  },
  methods: {
    openItem (item, type) {
      console.log(item)
      console.log(type)
      if (this.types.map(function (e) { return e.value }).includes(type)) {
        this.resource = item
        this.resourceType = type
        this.resourceOpen = true
      } else {
        console.error('Incorrect item type for routing...')
      }
    },
    closeResource () {
      this.resourceOpen = false
    },
    pack () {
      this.$refs.bricks.pack()
    },
    checkType (item) {
      return this.selectedTypes.includes(item.type)
    },
    search () {
      this.$database.search('omedia', this.searchTerms, {}, (res) => {
        this.items = res
      })
    }
  }
}
</script>

<style>
.media-cardl {
  /* margin: 10px; */
  /* width: 100%; */
  cursor: pointer;
}
.image-cardl {
  opacity: 0.5;
  transition: opacity .25s;
  transition-timing-function: ease-in;
}
.image-cardl:hover {
  opacity: 1;
}
@media screen and (min-width: 800px) {
  .bookl, .moviel, .imagel, .videol, .articlel, .notel, .quotel {
    width: 300px;
  }
}
@media screen and (min-width: 1200px) {
  .bookl, .moviel, .imagel, .videol, .articlel, .notel, .quotel {
    width: 200px;
  }
}
@media screen and (min-width: 1500px) {
  .bookl, .moviel, .imagel, .videol, .articlel, .notel, .quotel {
    width: 250px;
  }
}
.resource-modal {
  /* padding: 30px; */
  width: 100%;
  height: 100%;
}
@media screen and (min-width: 1200px) {
  .resource-modal {
    min-width: 650px;
    width: 650px;
  }
}
</style>
