<script>
import { getCurrentInstance } from 'vue'
import PostsItemPreview from './PostsItemPreview.vue'
import postApi  from '@/api/posts.js'
import { Operation } from '@/utils/forms.js'
export default {
  components: {
      PostsItemPreview: PostsItemPreview
  },
  data() {
      return {
          postItems: [],
          add: Operation.ADD,
      } 
  },
  methods: {
    getPostItems() {
      (async() => {
        const res = await postApi.getAllPosts() 
        this.postItems = res.data
        })()
    },
    deleteItem(id){
      (async() => {
        await postApi.deletePost(id);
      })();
      
      //update using array function
      //note: simply replacing the array wont work in vue
      const index = this.postItems.map(item => item.id).indexOf(id);
      this.postItems.pop(index, 1);

    },
  },
  mounted() {
      //declare anonymous async function and call it
      this.getPostItems();
  }
}
</script>
<template>
<div class="posts">
    <button class="btn">
      <RouterLink :to="
        {
          path: '/posts/form',
          query: { mode: add}
        }">Add Post
      </RouterLink>
    </button>
    <PostsItemPreview
        v-for="(post, index) in postItems"
            :id= "post.id"
            :title="post.title"
            :content="post.content"
            :deleteCallback="this.deleteItem"
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

.btn {
  margin-top: 24px;
  padding: 8px 18px;
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  border: 2px solid white;
  border-radius: 0.5em;
  color: white;
  background: transparent
}

.btn:hover {
  background: #1bb21b;
  border: 2px solid transparent;
}

.btn:active {
  transform: scale(0.9);
}

</style>
