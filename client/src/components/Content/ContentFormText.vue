<script>
  export default {
    data() {
      return {
        cols: 20,
        rows: 1
      }
    },
    props: [
      'pasteCallback'
    ],
    methods: {
      addRow() {
        this.rows += 1
      }
    },
    mounted() {
      this.$refs.txtinput.focus()
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
