<script>
  import ContentFormText from '@/components/Content/ContentFormText.vue'
  import ContentFormImage from '@/components/Content/ContentFormImage.vue'
  import { markRaw } from 'vue'
  export default {
    components: {
      ContentFormText: markRaw(ContentFormText),
      ContentFormImage: markRaw(ContentFormImage),
    },
    data() {
      return {
        rows: 1,
        cols: 20,
        txt: "",
        imgTags: [],
        txtItems: [],
        elemsImg: [],
        componentsMain: [],
      }
    },
    methods: {
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
            this.addImageTextArea(dataUrl)
//            this.imgTags.push(dataUrl)
          }
          reader.readAsDataURL(blob);

        } else if (item.type.indexOf("text") === 0) {
          item.getAsString(elemStr => {
            if (elemStr.startsWith("<img")) {
              let tempDiv = document.createElement("div")
              tempDiv.innerHTML = elemStr
              this.addImageTextArea(tempDiv.firstChild.getAttribute('src'))
//              this.imgTags.push(tempDiv.firstChild.getAttribute('src'))
            }
          })
        }
      },
      addImageTextArea(imgSrc) {
        this.componentsMain.push(
          {
            type: ContentFormImage,
            props: {
              src: imgSrc,
            }
          },
          {
            type: ContentFormText,
            props: {
              pasteCallback: this.pasteFromClipboard
            }
          }
        )
      }
    },
    mounted() {
      this.componentsMain.push(
        {
          type: ContentFormText,
          props: {
            pasteCallback: this.pasteFromClipboard
          }
        }
      )
    }
  }


</script>
<template>
<div class="form-content">
  <component 
    v-for="component in componentsMain"
    :is="component.type"
    v-bind="component.props">
  </component>
</div>

</template>
<style>
.form-content {
  display: flex;
  flex-direction: column;
  width: 25%;
}
</style>
