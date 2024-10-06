<script lang="ts">
  import { isTitleShown } from "$lib/stores";
</script>

<link rel="stylesheet" href="/css/global.css" />

<a href="/">
  <img
    class="homebar-image {$isTitleShown ? '' : 'hidden'}"
    src="/img/titolone.gif"
    alt="Home"
  />
</a>

<nav class="main-nav">
  <a href="/">home</a>
  <a href="/about">about</a>
  <a href="/gallery">gallery</a>
  <a href="/written-things">written</a>
</nav>

<slot></slot>

<footer>
  puoi cercarmi su
  <a href="https://www.instagram.com/piumpiuwm/"> instagram</a>
  <a href="https://t.me/piumpiuwm"> telegram</a>
  <a href="https://github.com/doriocsetina"> github</a>
</footer>

<div id="overlay"></div>

<style>
  .homebar-image {
    width: 50%;
    height: auto;
  }

  .homebar-image.hidden {
    width: 50%;
    height: auto;
    display: none;
  }

  .main-nav {
    left: 5px;
    display: flex;
    position: sticky;
    top: 5px;
    left: 20px;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap; /* Allow items to wrap */
    width: 500px;
    height: 40px;
    font-size: xx-large;
    background-color: white;
    transition: all 0.5s ease;
  }

  nav a,
  footer a {
    color: black;
    text-decoration: none;
  }

  footer {
    width: 400px;
    margin-left: 20px;
    bottom: 0;
    background-color: white;
  }

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
</style>
