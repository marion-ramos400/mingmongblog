<script>
export default {
  props: [
      'type',
      'content',
      'imgWidth',
      'imgHeight',
    ]
}
</script>
<template>
  <p v-if="type === 'text'">{{ content }}</p>
  <img 
    v-if="type.startsWith('img')" 
    :src="content"
    :width="imgWidth"
    :height="imgHeight">
</template>
<style>
</style>
