<script setup>

import {ref} from 'vue';
import {home} from '/client/src/config/home.js';
const about = ref(home.about);
const aboutStrArr = about._value.split('\n').map(line => line.trim());

</script>
<template>
<div class="home">
    <p v-for="line in aboutStrArr">
        {{ line }}
    </p>
</div>
</template>
<style>

.home {
    padding: 6em 0; 
}

.home p {
    font-size: 1.4rem;
}

</style>



