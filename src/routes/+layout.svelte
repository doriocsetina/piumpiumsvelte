<link rel="stylesheet" href="/css/global.css" />

<div class="homebar">
  <a href="/">
    <img src="/img/titolone.gif" alt="" style="width: 50%; height  : auto;" />
  </a>

  <nav class="main_nav">
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/gallery">gallery</a>
    <a href="/written-things">written things</a>
  </nav>
</div>

<slot></slot>

<footer>
  <p>
    puoi cercarmi su
    <a href="https://www.instagram.com/piumpiuwm/"> instagram</a>
    <a href="https://t.me/piumpiuwm"> telegram</a>
    <a href="https://github.com/doriocsetina"> github</a>
  </p>
</footer>

<div id="overlay"></div>
<style>
  .homebar {
    position: fixed;
  }
  .main_nav {
    left: 0;
    width: 20%;
    background-color: white;
    display: flex;
    justify-content: space-around;
  }

  footer {
    position: fixed;
    bottom: 0;
    left: 10%;
    width: 20%;
    background-color: white;
    display: flex;
    justify-content: center;
  }
</style>
