<script>
  export default {
    data() {
      return {
        cols: 20,
        rows: 1
      }
    },
    props: [
      'pasteCallback',
      'txt',
      'focus',
    ],
    methods: {
      addRow() {
        this.rows += 1
      }
    },
    mounted() {
      if(this.focus) {
        this.$refs.txtinput.focus()
      }
      if (this.txt) {
        this.$refs.txtinput.value = this.txt
        this.$refs.txtinput.selectionEnd = 0;
      }
    }
  }
</script>
<template>
  <textarea 
    ref="txtinput"
    @scroll="addRow"
    @paste="pasteCallback"
    :cols="cols" 
    :rows="rows"
    class="form-txtarea"></textarea>
</template>
<style>
.form-txtarea {
  resize: none;
}
</style>
