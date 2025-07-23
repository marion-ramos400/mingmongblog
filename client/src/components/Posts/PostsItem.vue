<script>
import data from '@/data/dataPosts.js'
import postApi from '@/api/posts.js'

export default {
    data() {
        return {
            id: "",
            title: "",
            content: "" //TODO figure out how to add image with the content, text for now
        }
    },
    mounted() {
      const params = this.$route.params
      this.id = params.id;
      (async() => {
        const res = await postApi.getPost(this.id)
          if (res) {
            this.title = res.data.title
            this.content = res.data.content
          }
      })()
    },
    methods: {
    }
}

</script>

<template>
<div class="posts">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
</div>
</template>
<style>

</style>
