<template>
  <div>
    <div class="row gutter-sm">
      <!-- <div class="col-12">
        <q-btn label="Pack" color="primary" @click.native="pack" />
      </div> -->
      <div class="col-12">
        <q-select
          multiple
          v-model="selectedTypes"
          :options="types"
          dark
        />
      </div>
      <div class="col-12">
        <div v-masonry transition-duration="0.3s" item-selection=".media-cardl">
          <q-card v-masonry-tile v-for="item in showItems" :key="item._id" color="primary" v-bind:class="[item.type] + 'l'" class="media-cardl" @click.native="openItem(item.media, item.type)">
            <!-- <q-icon name="fas fa-plus" color="positive" class="float-right cursor-pointer" style="margin-top: 5px; margin-right: 5px;" /> -->
            <q-card-media v-if="item.type == 'book' || item.type == 'movie' || item.type == 'video' || item.type == 'article' || item.type == 'image'">
              <img :src="item.media.thumbURL" />
            </q-card-media>
            <q-card-title v-if="item.type == 'book' || item.type == 'movie' || item.type == 'video' || item.type == 'article' || item.type == 'discourse' || item.type == 'note'">
              {{ item.media.title }}
              <span v-if="item.type == 'book' || item.type == 'movie' || item.type == 'video' || item.type == 'article' || item.type == 'discourse'" v-for="author in item.media.author" :key="author" slot="subtitle">{{ author }}</span>
              <span v-if="item.type == 'note'" slot="subtitle">{{ item.media.text }}</span>
            </q-card-title>
            <q-card-main v-if="item.type == 'quote'">
              <p>{{ item.media.text }}</p>
              <p class="q-body-2"><span v-for="author in item.media.mediaid.author" :key="author">{{ author }} | </span>{{ item.media.mediaid.title }}</p>
            </q-card-main>
          </q-card>
        </div>
      </div>
    </div>
    <q-modal v-model="resourceOpen" content-classes="resource-modal">
      <resource-preview :type="resourceType" :resource="resource" :addModule="addModule" :close="closeResource" />
    </q-modal>
  </div>
</template>

<script>
import ResourcePreview from 'components/ResourcePreview.vue'

export default {
  components: {
    ResourcePreview
  },
  // name: 'ComponentName',
  props: ['items', 'width', 'addModule'],
  data () {
    return {
      showItems: [],
      isImage: this.type === 'images',
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
          label: 'All',
          value: 'all'
        },
        {
          label: 'Book',
          value: 'book'
        },
        {
          label: 'Movie',
          value: 'movie'
        },
        {
          label: 'Image',
          value: 'image'
        },
        {
          label: 'Video',
          value: 'video'
        },
        {
          label: 'Article',
          value: 'article'
        },
        {
          label: 'Note',
          value: 'note'
        },
        {
          label: 'Document',
          value: 'document'
        },
        {
          label: 'Discourse',
          value: 'discourse'
        },
        {
          label: 'Composition',
          value: 'composition'
        },
        {
          label: 'Quote',
          value: 'quote'
        },
        {
          label: 'Outline',
          value: 'outline'
        },
        {
          label: 'Idea',
          value: 'idea'
        },
        {
          label: 'Illustration',
          value: 'illustration'
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
      // this.pack()
    },
    'width': function () {
      // this.pack()
    }
  },
  // mounted () {
  //   this.showItems = this.items.filter(this.checkType)
  // },
  updated () {
    console.log('updated')
    // console.log(this.$refs.bricks)
    // this.pack()
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
    // pack () {
    //   this.$refs.bricks.pack()
    // },
    checkType (item) {
      return this.selectedTypes.includes(item.type)
    }
  }
}
</script>

<style>
.media-cardl {
  margin: 5px;
  width: 95%;
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
    width: 31%;
  }
}
@media screen and (min-width: 1200px) {
  .bookl, .moviel, .imagel, .videol, .articlel, .notel, .quotel {
    width: 45%;
  }
  .resource-modal {
    min-width: 650px;
    width: 650px;
  }
}
.resource-modal {
  /* padding: 30px; */
  width: 100%;
  height: 100%;
}
</style>
