<script>
import PostsItemPreview from './PostsItemPreview.vue'
export default {
    components: {
        PostsItemPreview: PostsItemPreview
    },
    data() {
        return {//TODO temp placeholder -> put this in db and backend
            postItems: [
                { title: "This is the Article 1", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."},
                { title: "Mmmmme  meow Mmoewmwew", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."},
                { title: "Mm prrrr Mm preeow", content: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat."},
            ] 
        } 
    }
}
</script>
<template>
<div class="posts">
    <PostsItemPreview
        v-for="post in postItems"
            :title="post.title"
            :content="post.content"
    >
    </PostsItemPreview>
</div>
</template>
<style>
.posts {
    padding: 4.2em 0; 
}

.posts p {
    font-size: 1.1rem;
}
</style>
