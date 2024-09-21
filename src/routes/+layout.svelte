<link rel="stylesheet" href="/css/global.css" />
<a href="/"
  ><img src="/img/titolone.gif" alt="" style="position: fixed; width: 50%; height  : auto;" /></a
>

<nav class="main_nav">
  <a href="/">home</a>
  <a href="/about">about</a>
  <a href="/gallery">gallery</a>
  <a href="/written-things">written things</a>
</nav>

<slot></slot>

<footer>
  puoi cercarmi su
  <a href="https://www.instagram.com/piumpiuwm/">instagram</a>
  <a href="https://t.me/piumpiuwm">telegram</a>
  <a href="https://github.com/doriocsetina">github</a>
</footer>

<style>
  .main_nav{
    position: fixed;
    top: 25%;
    background-color: white;
  }
  
  footer {
    position: fixed;
    bottom: 0%;
    left: 10%;
    background-color: white;
  }
</style>