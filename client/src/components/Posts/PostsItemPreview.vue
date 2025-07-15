
<script>
import data from '@/data/dataPosts.js'
export default {
    props: {
        id: Number,
        title: String,
        content: String
    },
    methods: {
        shortenContent(content) {
            const split = content.split(" ")
            return split.slice(0, 15).join(" ") //TODO figure out how to put magic number from config and load here
        },
        formatUrl(id) {
            return `/posts/${id}` 
        }
    }
}
</script>

<template>
<div class="post-preview">
    <h2><RouterLink :to="formatUrl(id)">{{ title }}</RouterLink></h2>
    <p>{{ shortenContent(content) }}</p>
</div>
</template>
<style>
.post-preview h2{
    padding-top: 1.1em;
}
.post-preview p{
    padding: 1.2em 0;
}


</style>
