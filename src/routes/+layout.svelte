<link rel="stylesheet" href="/css/global.css" />

<div class="homebar">
  <a href="/">
    <img id="homebar-image" src="/img/titolone.gif" alt="Home" />
  </a>

  <nav class="main_nav">
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
  .homebar {
    position: fixed;
    top: 0;
    width: 100%;
  }

  @media (max-width: 768px) {
    .homebar {
      position: static;
    }

  }
  #homebar-image {
    width: 50%;
    height: auto;
  }
  .main_nav {
    left: 0;
    width: 35%;
    font-size: xx-large;
    background-color: white;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap; /* Allow items to wrap */
  }

  nav a,
  footer a {
    color: black;
    text-decoration: none;
  }

  footer {
    position: fixed;
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: space-between;
  }

  footer a {
    margin-right: 10px;
  }
</style>
