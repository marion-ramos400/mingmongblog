<script>
import PostsItemPreview from './PostsItemPreview.vue'
import data from '@/data/dataPosts.js'
export default {
    components: {
        PostsItemPreview: PostsItemPreview
    },
    data() {
        return {//TODO temp placeholder -> put this in db and backend
            postItems: data,
        } 
    }
}
</script>
<template>
<div class="posts">
    <PostsItemPreview
        v-for="post in postItems"
            :id= "post.id"
            :title="post.title"
            :content="post.content"
    >
    </PostsItemPreview>
</div>
</template>
<style>
.posts {
    padding: 4.2em 0; 
    width: 100%;
}

.posts h1 {
    padding-top: 1.1em;
}

.posts h2{
    padding-top: 1.1em;
}

.posts p {
    font-size: 1.1rem;
}
</style>
