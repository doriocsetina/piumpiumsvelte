<script lang="ts">
  import { onMount } from "svelte";
  import { isTitleShown } from "$lib/stores";

  let isScrolled: Boolean = false;

  onMount(() => {
    const homebarImage = document.querySelector(".homebar-image");
    $isTitleShown = true;
    if (!homebarImage) {
      console.error("mainNav or homebarImage not found");
      return;
    }

    const handleScroll = () => {
      const homebarImageBottom =
        homebarImage.getBoundingClientRect().bottom + window.scrollY;
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;

      if (window.scrollY > homebarImageBottom) {
        isScrolled = true;
        console.log("first option to: ", isScrolled);
        console.log("scrolled: ", homebarImageBottom);
        console.log("scrolled: ", window.scrollY);
      } else {
        isScrolled = false;
        console.log("changing visibility to: ", isScrolled);
        console.log("now false: ", window.scrollY);
        console.log("now false: ", homebarImageBottom);
      }

      // Handle edge case where scroll position is at the maximum
      if (window.scrollY >= maxScrollY) {
        isScrolled = true;
        console.log("Reached max scroll position: ", maxScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<link rel="stylesheet" href="/css/global.css" />

<div class="homebar">
  <a href="/">
    <img
      class="homebar-image {$isTitleShown ? '' : 'hidden'}"
      src="/img/titolone.gif"
      alt="Home"
    />
  </a>

  <nav class="main_nav {isScrolled ? 'scrolled' : ''}">
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/gallery">gallery</a>
    <a href="/written-things">written</a>
    <a href="/tattoo-placer">tattoos</a>
  </nav>
</div>

<slot></slot>

<footer>
  puoi cercarmi su
  <a href="https://www.instagram.com/piumpiuwm/"> instagram</a>
  <a href="https://t.me/piumpiuwm"> telegram</a>
  <a href="https://github.com/doriocsetina"> github</a>
</footer>

<div id="overlay"></div>

<style>
  #overlay {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    pointer-events: none;
    backdrop-filter: blur(1px) saturate(250%) contrast(150%);
  }

  .homebar {
    top: 0;
    width: 100%;
    transition: all 0.3s ease;
  }

  .homebar-image {
    width: 50%;
    height: auto;
  }
  .homebar-image.hidden {
    width: 50%;
    height: auto;
    display: none;
  }

  .main_nav {
    left: 5px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap; /* Allow items to wrap */
    width: 600px;
    height: 40px;
    font-size: xx-large;
    background-color: white;
    transition: all 0.5s ease;
  }

  .main_nav.scrolled {
    position: fixed;
    top: 0;
    left: 5px;
  }

  @media (max-width: 768px) {
    .main_nav.scrolled {
      position: static;
    }
  }

  nav a,
  footer a {
    color: black;
    text-decoration: none;
  }

  footer {
    width: 400px;
    bottom: 0;
    background-color: white;
  }
</style>
