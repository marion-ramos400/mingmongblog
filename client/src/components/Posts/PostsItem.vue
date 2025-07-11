<script>
export default {
    props: {
        title: String,
        content: String //TODO figure out how to add image with the content, text for now
    }
}
</script>

<template>
<div>
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
</div>
</template>
<style>

</style>
