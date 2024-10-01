<script lang="ts">
  import { onMount } from "svelte";
  let postsData: string[] = [];

  onMount(async () => {
    const response = await fetch("api/images");
    const data = await response.json();
    postsData = data;
  });
</script>

<div class="gallery">
  {#each postsData as image}
    <p>{image}</p>
  {/each}
</div>

<style>
  .gallery {
    justify-content: center;
    padding: 60px;
    margin-left: 20%;
  }

  .gallery p {
    background-color: white;
    font-size: large;
  }
  .gallery-image {
    max-width: 100%;
    justify-content: center;
    height: auto;
    image-rendering: pixelated;
    margin-bottom: 60px;
  }
</style>
