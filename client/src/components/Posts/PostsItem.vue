<script>
import ContentViewItem from '@/components/Content/ContentViewItem.vue'
import data from '@/data/dataPosts.js'
import postApi from '@/api/posts.js'

export default {
    components: {
      ContentViewItem: ContentViewItem
    },
    data() {
        return {
            id: "",
            title: "",
            content: []
        }
    },
    mounted() {
      const params = this.$route.params
      this.id = params.id;
      postApi.getPost(this.id, (resData) => {
        this.title = resData.title
        const contarr = JSON.parse(resData.content)
        this.content = contarr
      })
    },
    methods: {
    }
}

</script>

<template>
<div class="posts">
  <h1>{{ title }}</h1>
  <ContentViewItem
      v-for="(c, i) in content"
      v-bind="c"
  >
  </ContentViewItem>
</div>
</template>
<style>

</style>
