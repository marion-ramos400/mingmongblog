<script>
//import {useRoute} from 'vue-router'
//const route = useRoute();
//console.log(route.params)

export default {
    data() {
        return {
            id: -1,
            title: "",
            content: "" //TODO figure out how to add image with the content, text for now
        }
    },
    mounted() {
        const params = this.$route.params
        this.id = parseInt(params.id)
        this.title = params.title
        this.content = params.content
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
