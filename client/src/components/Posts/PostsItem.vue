<script>
import data from '@/data/dataPosts.js'

export default {
    data() {
        return {
            id: -1,
            title: "",
            content: "" //TODO figure out how to add image with the content, text for now
        }
    },
    mounted() {
        const params = this.$route.params
        this.id = parseInt(params.id)
        const res = this.getPost(this.id)
      if (res) {
        this.title = res.title
        this.content = res.content

      }
         
    },
    methods: {
      getPost(id) {
        const res = data.filter(item => {return item.id === id})
        if (res.length > 0) return res[0]
        return null
      },
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
