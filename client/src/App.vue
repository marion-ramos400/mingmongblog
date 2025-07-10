<script>
import Header from './components/Header/Header.vue';
import Home from './components/Home.vue';
export default {
    components: {
        Header: Header,
        Home: Home
    }     
}
</script>

<template>
  <div class="content">
    <header>
      <Header/>
    </header>
    <main>
      <Home/>
    </main>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
.content {
  width: 666px;
}
    /*
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
  */
}
</style>
