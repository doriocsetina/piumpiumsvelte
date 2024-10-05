<div class="container">
  <div class="spiegone">
    <p>benvenut sul sito web di pium pium !</p>
  </div>
</div>
<div class="background"></div>

<style>
  .background {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("/img/background/home.PNG");
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
  }
  .container {
    display: flex;
    justify-content: flex-start; /* Align to the left */
    align-items: center; /* Center vertically */
    margin: 0; /* Remove default margin */
    height: 90vh;
  }
  .spiegone {
    display: flex;
    align-items: center;
    position: relative;
  }

  .spiegone p {
    align-items: center;
    background-color: white;
    font-size: large;
  }
</style>
