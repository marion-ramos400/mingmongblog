<script>
  export default {
    props: [
      'src',
    ]
  }
</script>
<template>
  <img :src="src" alt="image inside form" class="content-form-img"/>
</template>
<style>
.content-form-img {
  object-fit: contain;
}
</style>
