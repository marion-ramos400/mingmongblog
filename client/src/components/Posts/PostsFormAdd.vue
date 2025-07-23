<script>
  import postApi  from '@/api/posts.js'
  export default {
    data() {
      return {
        title: "",
        content: "",
      }
    },
    methods: {
      addPost() {
        (async() => {
          const res = await postApi.createPost({
            title: this.title,
            content: this.content
          })
        })()
      }
    }
  }
</script>
<template>
  <div class="posts">
    <form v-on:submit.prevent="addPost" class="add-form">
      <h2>New Post</h2>
      <input 
        placeholder="Title"
        type="text" 
        required 
        v-model="title">
      <textarea 
        cols="70" rows="31"
        required v-model="content" 
        placeholder="Pour out a cup of feelings here...">
      </textarea>
      <br>
      <button class="btn" type="submit">Add</button>
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

.add-form textarea {
  border: 1px solid white;
  outline: none;
  resize: none;
  color: white;
  background: transparent;
  overflow: auto;
  font-size: 1em;
  border-radius: 10px;
  padding: 1.2em;
  margin-top: 1.6em;
}

</style>
