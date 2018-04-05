<template>
  <div>
    <q-btn color="primary" @click.native="open = !open">Add Research</q-btn>
    <q-modal v-model="open" content-classes="research-modal">
      <div class="row gutter-sm">
        <div class="col-12">
          <p>Current Research</p>
          <q-list>
            <q-item v-for="item in currentResearch" :key="item['_id']">
              <q-item-main>
                {{ item.media.title }}
              </q-item-main>
              <q-item-side right>
                <q-item-tile icon="fas fa-times" color="negative" />
              </q-item-side>
            </q-item>
          </q-list>
        </div>
        <div class="col-12">
          <p>Add Research</p>
          <q-input v-model="searchTerm" float-label="Search" dark @keyup.enter="search" />
          <q-list>
            <q-item v-for="item in searchResults" :key="item['_id']">
              <q-item-main>
                {{ item.title }}
              </q-item-main>
              <q-item-side right>
                <q-item-tile icon="fas fa-plus" color="positive" />
              </q-item-side>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
export default {
  // name: 'ComponentName',
  props: [ 'currentResearch', 'id', 'type' ],
  data () {
    return {
      open: false,
      searchTerm: '',
      searchResults: []
    }
  },
  methods: {
    search () {
      this.$database.search('topic', this.searchTerm, {}, (res) => {
        this.searchResults = res
      })
    },
    add () {
      console.log('add research')
    },
    remove () {
      console.log('remove research')
    }
  }
}
</script>

<style>

.research-modal {
  padding: 30px;
  width: 100%;
  height: 100%;
}

@media screen and (min-width: 1200px) {
  .research-modal {
    min-width: 650px;
    width: 650px;
  }
}

</style>
