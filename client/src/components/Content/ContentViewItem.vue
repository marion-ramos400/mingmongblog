<script>
export default {
  props: [
      'type',
      'content'
    ]
}
</script>
<template>
  <p v-if="type === 'text'">{{ content }}</p>
  <img v-if="type.startsWith('img')" :src="content">
</template>
<style>
</style>
