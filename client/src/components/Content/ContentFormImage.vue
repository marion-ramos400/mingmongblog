<script>
  export default {
    props: [
      'src',
    ]
  }
</script>
<template>
  <div class="content-form-img">
    <img :src="src" alt="image inside form"/>
  </div>
</template>
<style>
.content-form-img {
  resize: both;
  overflow: auto;
}

.content-form-img img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}

</style>
