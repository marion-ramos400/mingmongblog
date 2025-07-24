<script>
import { getCurrentInstance } from 'vue'
import PostsItemPreview from '@/components/Posts/PostsItemPreview.vue'
import Modal from '@/components/Modal/Modal.vue'
import postApi  from '@/api/posts.js'
import { Operation } from '@/utils/forms.js'

export default {
  components: {
      PostsItemPreview: PostsItemPreview,
      Modal: Modal,
  },
  data() {
      return {
          postItems: [],
          add: Operation.ADD,
          postDeleteEvent: {
            NONE: 0,
            PROMPT: 1,
            CONFIRM: 2,
          },
          userDeleteProcess: 0,
          modalMsg: "",
          focusId: "",
      } 
  },
  methods: {
    getPostItems() {
      postApi.getAllPosts((resData) => {
        this.postItems = resData;
      })
    },
    userPromptDelete(id) {
      this.focusId = id;
      this.userDeleteProcess = this.postDeleteEvent.PROMPT;
      this.modalMsg = "Are you sure you want to delete this post?"
    },
    deleteItem(){
      postApi.deletePost(this.focusId, (resData) => {
        //update using array function
        //note: simply replacing the array wont work in vue
        const index = this.postItems.map(item => item.id).indexOf(this.focusId);
        this.postItems.splice(index, 1);
        this.userDeleteProcess = this.postDeleteEvent.CONFIRM;
        this.modalMsg = "Successfully Deleted Post!"
      })
    },
  },
  mounted() {
      this.getPostItems();
  }
}
</script>
<template>
<Modal 
  v-if="userDeleteProcess == postDeleteEvent.PROMPT" 
  :msg="modalMsg" 
  :confirmation="true"
  :confirmTxt="`Delete`"
  :confirmCallback="deleteItem"
  :cancelCallback="()=>{userDeleteProcess = postDeleteEvent.NONE}"
  />
<Modal
  v-else-if="userDeleteProcess == postDeleteEvent.CONFIRM"
  :msg="modalMsg"
  :confirmCallback="()=>{userDeleteProcess = postDeleteEvent.NONE}"
/>
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
            :deleteCallback="this.userPromptDelete"
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
