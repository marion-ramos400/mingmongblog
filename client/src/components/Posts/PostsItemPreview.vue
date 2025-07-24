
<script>
import { Operation } from '@/utils/forms.js'
import postApi from '@/api/posts.js'
export default {
  data() {
    return {
      edit: Operation.EDIT,
    }
  },
  props: {
      id: String,
      title: String,
      content: String,
      deleteCallback: Function,
  },
  methods: {
      shortenContent(content) {
          const split = content.split(" ")
          return split.slice(0, 30).join(" ") //TODO figure out how to put magic number from config and load here
      },
      formatUrl(id) {
          return `/posts/${id}` 
      },
  }
}
</script>

<template>
<div class="post-preview">
  <div class="post-preview-title">
    <h2><RouterLink :to="formatUrl(id)">{{ title }}</RouterLink></h2>
    <div>
      <button class="btn oper edit">
        <RouterLink :to="{
                path: '/posts/form',
                query: { mode: edit, id: id}
              }">Edit
        </RouterLink>
      </button>
      <button @click="deleteCallback(id)" class="btn oper delete">Delete</button>
    </div>
  </div>
    <p>{{ shortenContent(content) }}</p>
</div>
</template>
<style>

.post-preview {
  width: 88%;

}
.post-preview h2{
    padding-top: 1.1em;
}
.post-preview p{
    padding: 1.2em 0;
}

.post-preview-title {
  display: flex;
  justify-content: space-between;
}

.edit {
}

.oper {
  border: 1px solid white !important;
  font-size: 12px !important;
  margin-top: 28px !important;
  margin-left: 4px;
  padding: 8px 12px !important;
}

.oper:hover {
  border: 0 !important;
}

.edit:hover {
  background: #fbdb65 !important;
  color: #121212 !important;
}

.delete:hover {
  background: #cb4154 !important;
}




</style>
