<script>
  export default {
    data() {
      return {
        rows: 1,
        cols: 20,
        txt: "",
        imgTags: [],
      }
    },
    methods: {
      addRow(e) {
        this.rows += 1;
      },
      pasteFromClipboard(e) {
        let item = e.clipboardData.items[0]; 
        this.pasteImage(item)  
      },
      pasteImage(item) {
        //handle image wether "text/html" or "image/png"
        if (item.type.indexOf("image") === 0) {
          const blob = item.getAsFile()
          const reader = new FileReader()
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            this.imgTags.push(dataUrl)
          }
          reader.readAsDataURL(blob);
        } else if (item.type.indexOf("text") === 0) {
          item.getAsString(elemStr => {
            if (elemStr.startsWith("<img")) {
              let tempDiv = document.createElement("div")
              tempDiv.innerHTML = elemStr
              this.imgTags.push(tempDiv.firstChild.getAttribute('src'))
            }
          })

        }
      },
    },
  }


</script>
<template>
  <textarea 
    @scroll="addRow"
    @paste="pasteFromClipboard"
    class="test-txtarea" :cols="cols" :rows="rows">{{ txt }}</textarea>

    <img v-for="imgSrc in imgTags"
         :src="imgSrc" alt="test"
    >

</template>
<style>
.test-txtarea {
  resize: none;
}
</style>
