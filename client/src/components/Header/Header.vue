<script>
</script>
<template>
<div class="header-menu">
    <nav class="navbar">
        <img class="avatar" src="/client/src/assets/imgs/fat-cat-face.jpg" alt="avatar"/>
        <ul>
            <li><RouterLink to="/">HOME</RouterLink></li>
            <span>|</span>
            <li><RouterLink to="/posts">POSTS</RouterLink></li>
            <span>|</span>
            <li><RouterLink to="/contact">CONTACT</RouterLink></li>
        </ul>
    </nav>
</div>
</template>
<style>
.header-menu {
    display: flex;
    /*width: 666px;TODO make this responsive, dont know how yet*/
    align-items: center;
    padding: 1.2em 0;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgba(24, 24, 24, 0.96);
}

.avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: contain;
    transform: scaleX(-1);
}


.navbar {
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 666px;
}

.navbar ul {
    display: flex;
    list-style-type: none;
}

.navbar li {
    padding: 1.2em 2em;
}

.navbar span {
  padding: 1.2em 0;
}


</style>


