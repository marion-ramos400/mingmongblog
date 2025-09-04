<script>
  import ContentFormText from '@/components/Content/ContentFormText.vue'
  import ContentFormImage from '@/components/Content/ContentFormImage.vue'
  import { markRaw, getCurrentInstance } from 'vue'
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
        componentsMain: [],
      }
    },
    methods: {
      preload(data) {
        this.componentsMain = data.map((e) => {
          if (e.type == "text") {
            return {
              type: ContentFormText,
              id: crypto.randomUUID(),
              props: { txt: e.content }
            }
          }
          else if (e.type.startsWith("img"))
            return {
              id: crypto.randomUUID(),
              type: ContentFormImage,
              props: { 
                src: e.content, 
                dWidth: e.imgWidth,
                dHeight: e.imgHeight
              }
            }
        })
      },
      getPostData() {
        let children = [].slice.call(
          this.$refs.postData.children
        )
        return children.map((e) => {
          if (e.type == "textarea") {
            return {type: "text", content: e.value}
          }
          else if (e.tagName == "DIV") {
            const imgtag = [].slice.call(e.children)[0]
            if (imgtag.tagName == "IMG") {
              const imgtype = imgtag.src.startsWith("data") ? "imgdata" : "imgUrl"
              return {
                type: imgtype, 
                content: imgtag.src,
                imgWidth: e.clientWidth,
                imgHeight: e.clientHeight
              }
            }
          }
        });
      },
      pasteFromClipboard(e, id) {
        const index = this.componentsMain.map(item => item.id).indexOf(id)
        let item = e.clipboardData.items[0]; 
        let cursor = e.target.selectionEnd
        let inline = null
        if (cursor < e.target.value.length) {
          //if cursor target is in between words (inside full text)
          //replace current element with ContentFormText1, ContentFormImage, ContentFormText2
          const text = e.target.value
          const textval1 = text.slice(0, cursor)
          const textval2 = text.slice(cursor)
          inline = {
            index: index,
            textSplit: [textval1, textval2]
          }

        }
        this.pasteImage(item, inline)

      },
      pasteImage(item, inline) {
        //handle image wether "text/html" or "image/png"
        if (item.type.indexOf("image") === 0) {
          const blob = item.getAsFile()
          const reader = new FileReader()
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            this.addImageTextArea(dataUrl, inline)
          }
          reader.readAsDataURL(blob);

        } else if (item.type.indexOf("text") === 0) {
          item.getAsString(elemStr => {
            if (elemStr.startsWith("<img")) {
              let tempDiv = document.createElement("div")
              tempDiv.innerHTML = elemStr
              this.addImageTextArea(tempDiv.firstChild.getAttribute('src'), inline)
            }
          })
        }
      },
      addImageTextArea(imgSrc, inline) {
        if(inline) {
          this.componentsMain.splice(inline.index, 1,
            {
              id: crypto.randomUUID(),
              type: ContentFormText,
              props: {txt: inline.textSplit[0]}
            },
            {
              id: crypto.randomUUID(),
              type: ContentFormImage,
              props: { src: imgSrc, }
            },
            {
              id: crypto.randomUUID(),
              type: ContentFormText,
              props: {txt: inline.textSplit[1], focus: true}
            }
          )

        }
        else {
          this.componentsMain.push(
            {
              id: crypto.randomUUID(),
              type: ContentFormImage,
              props: { src: imgSrc, }
            },
            {
              id: crypto.randomUUID(),
              type: ContentFormText,
              props: {focus: true}
            }
          )
        }
      },
    },
    mounted() {
      this.componentsMain.push(
        {
          type: ContentFormText,
          id: crypto.randomUUID(),
            props: {
              placeholder: "Pour out a cup of feelings here..."
            }
        },
      )
    }
  }


</script>
<template>
<div class="form-content" ref="postData">
  <component 
    v-for="(component, index) in componentsMain"
    :is="component.type"
    :key="component.id"
    @paste="(e) => {pasteFromClipboard(e, component.id)}"
    v-bind="component.props">
  </component>
</div>

</template>
<style>
.form-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
