<script>
  import ContentFormText from '@/components/Content/ContentFormText.vue'
  import ContentFormImage from '@/components/Content/ContentFormImage.vue'
  import ContentFormVideo from '@/components/Content/ContentFormVideo.vue'
  import { markRaw, getCurrentInstance } from 'vue'
  export default {
    components: {
      ContentFormText: markRaw(ContentFormText),
      ContentFormImage: markRaw(ContentFormImage),
      ContentFormVideo: markRaw(ContentFormVideo),
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
          const isVid = this.pasteItem(e.clipboardData, inline)
          if (isVid) {e.preventDefault()}
        
      },
      pasteItem(cbData, inline) {
        const item = cbData.items[0]
        const txtData = cbData.getData('Text')
        if (txtData.startsWith("https://www.youtube.com/")){
          this.addElemTextArea(txtData, inline, "vid") 
          return true
        }
        if (item.type.indexOf("image") === 0) {
          const blob = item.getAsFile()
          const reader = new FileReader()
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            this.addElemTextArea(dataUrl, inline, "img")
          }
          reader.readAsDataURL(blob);

        } else if (item.type.indexOf("text") === 0) {
          item.getAsString(elemStr => {
            if (elemStr.startsWith("<img")) {
              let tempDiv = document.createElement("div")
              tempDiv.innerHTML = elemStr
              this.addElemTextArea(tempDiv.firstChild.getAttribute('src'), inline, "img")
            }
          })

        }
        return false
      },
      addElemTextArea(elemSrc, inline, elemType="img") {
        let entry = {
          id: crypto.randomUUID(),
          type: ContentFormImage,
          props: { src: elemSrc, }
        }
        if (elemType == 'vid') {
          entry = {
            id: crypto.randomUUID(),
            type: ContentFormVideo,
            props: { src: elemSrc, }
          }
        }
        if(inline) {
          this.componentsMain.splice(inline.index, 1,
            {
              id: crypto.randomUUID(),
              type: ContentFormText,
              props: {txt: inline.textSplit[0]}
            },
            entry,
            {
              id: crypto.randomUUID(),
              type: ContentFormText,
              props: {txt: inline.textSplit[1], focus: true}
            }
          )

        }
        else {
          this.componentsMain.push(
            entry,
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
