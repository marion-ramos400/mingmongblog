
<script>
  import logoFb from "@/assets/imgs/logo-facebook.svg"
  import logoIg from "@/assets/imgs/logo-instagram.svg"
  import logoX from "@/assets/imgs/logo-twitter.svg"
  export default {
    data() {
      return {
        itemsSocial: [
          {
            imgsrc: logoFb,
            href: "https://facebook.com",
            text: "facebook.com/ming",
            alt: "logo-fb"
          },
          {
            imgsrc: logoIg,
            href: "https://instagram.com",
            text: "instagram.com/ming",
            alt: "logo-ig"
          },
          {
            imgsrc: logoX,
            href: "https://x.com",
            text: "x.com/ming",
            alt: "logo-x"
          }
        ]
      }
    }
  }
</script>
<template>
  <div class="contact">
    <h2>follow me at my socials!</h2>
    <div v-for="item in itemsSocial" class="item-social">
      <img :src="item.imgsrc" :alt="item.alt">
      <a :href="item.href">{{ item.text }}</a>

    </div>
<!--     <div class="item-social"> -->
<!--       <img :src="fb.imgsrc" alt="logo-facebook"> -->
<!--       <a :href="fb.href">{{ fb.text }}</a> -->
<!--     </div> -->
  </div>
</template>
<style>

.contact {
    padding: 6em 0; 
    width: 100%;
}

.item-social {
  display: flex;
  margin: 1em 0;
}

.item-social img {
  width: 36px;
  height: 36px;
}

.item-social a {
  margin-left: 1em;
}
</style>


