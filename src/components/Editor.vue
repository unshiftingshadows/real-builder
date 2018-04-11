<template>
  <div>
    <vue-editor
      ref="editor"
      :editorToolbar="toolbarContent"
      :value="text"
      @input="$emit('update:text', $event)"
    />
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  components: {
    VueEditor
  },
  // name: 'ComponentName',
  props: [ 'text', 'save' ],
  data () {
    return {
      content: this.text,
      toolbarContent: [
        [{ 'header': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
      ],
      editCount: 0
    }
  },
  mounted () {
    console.log('editor', this.$refs.editor)
    if (this.save) {
      this.$refs.editor.quill.on('selection-change', (range, oldRange, source) => {
        if (range === null && oldRange !== null) {
          this.editCount = 0
          this.save()
        }
      })
      this.$refs.editor.quill.on('text-change', (delta, oldDelta, source) => {
        if (this.editCount >= 100) {
          this.editCount = 0
          this.save()
        } else this.editCount++
      })
    }
  }
}
</script>

<style>

.ql-picker-label {
  color: #bbb !important;
}

.ql-fill {
  fill: #bbb !important;
}

.ql-stroke {
  stroke: #bbb !important;
}

</style>
