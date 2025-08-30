<script>
  import postApi  from '@/api/posts.js'
  import { Operation } from '@/utils/forms.js'
  import Modal from '@/components/Modal/Modal.vue'
  import ContentFormInput from '@/components/Content/ContentFormInput.vue'
  export default {
    components: {
        Modal: Modal,
        ContentFormInput: ContentFormInput,
    },
    data() {
      return {
        id: "",
        title: "",
        content: "",
        mode: "",
        success: false,
        successMsg: "",
      }
    },
    methods: {
      addPost() {
        postApi.createPost(
          {
            title: this.title,
            content: this.content
          },
          (resData) => {
            this.success = true;
            this.successMsg = "Post Successfully Created!"
            this.id = resData.newPost.id
            this.$refs.processForm.reset()
          }
        )
      },
      updatePost() {
        postApi.updatePost(
          {
            id: this.id,
            title: this.title,
            content: this.content
          },
          (resData) => {
            this.success = true;  
            this.successMsg = "Post Successfully Updated!"
          }
        )
      },
      redirect(event, exit=false) {
        let endpoint = "/posts"
        if (this.mode === Operation.EDIT && exit === false) {
          endpoint = endpoint + `/${this.id}`
        }
        this.$router.push(endpoint);
      },
      processPost() {
        if (this.mode == Operation.ADD) {
          this.addPost();
        }
        else if (this.mode == Operation.EDIT) {
          this.updatePost();
        }
      },
    },
    mounted() {
      this.mode = this.$route.query.mode
      if (this.mode == Operation.EDIT) {
        //load post item
        this.id = this.$route.query.id;
        postApi.getPost(this.id, (resData) => {
          this.title = resData.title
          this.content = resData.content
        })
      }
    }
  }
</script>
<template>
  <Modal 
    v-if="success" 
    :msg="successMsg" 
    :confirmCallback="redirect"/>
  <div class="posts">
    <form 
      class="add-form"
      ref="processForm"
      v-on:submit.prevent="processPost" 
      >
        <h2 v-if="mode == 'add'">New Post</h2>
        <h2 v-if="mode == 'edit'">Edit Post</h2>
        <input 
          placeholder="Title"
          type="text" 
          required 
          v-model="title">
        <div class="content-container">
          <ContentFormInput/>
        </div>
        <br>
        <button class="btn" type="submit">Save</button>
        <button @click="(e)=>{this.redirect(e, exit=true)}" class="btn" style="marginLeft:8px;">Exit
        </button>
    </form>
  </div>
</template>
<style>

.add-form input {
  background: transparent;
  color: white;
  border: 0;
  border-bottom: 2px solid;
  border-color: white;
  font-size: 1.4em;
  margin-top: 0.6em;
  width: 100%;
  outline: none;
}

.content-container {
  border: 1px solid white;
  border-radius: 10px;
  padding: 1.2em;
  margin-top: 1.6em;
  height: 540px;
  overflow: auto;
}

</style>
