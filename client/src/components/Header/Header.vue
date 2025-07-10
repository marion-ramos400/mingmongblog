<script>
</script>
<template>
<div class="header-menu">
    <img class="avatar" src="/client/src/assets/imgs/fat-cat-face.jpg" alt="avatar"/>
    <nav class="navbar">
        <ul>
            <li><a href="#">HOME</a></li>
            <span>|</span>
            <li><a href="#">POSTS</a></li>
            <span>|</span>
            <li><a href="#">CONTACT</a></li>
        </ul>
    </nav>
</div>
</template>
<style>
.header-menu {
    display: flex;
    justify-content: space-between;
    width: 666px;/* TODO make this responsive, dont know how yet*/
    align-items: center;
    padding: 1.2em 0;
}


.avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: contain;
    transform: scaleX(-1);
}

.navbar ul {
    display: flex;
    list-style-type: none;
}

.navbar li {
    padding: 0 2em;
}


</style>


