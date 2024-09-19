<script lang="ts">
  import { onMount } from "svelte";
  let images: string[] = [];

  onMount(async () => {
    const response = await fetch("api/images");
    const data = await response.json();
    images = data;
  });
</script>

<p>in pratica è il sito web di piumpium</p>
<div class="gallery">
  {#each images as image}
    <a href={`/gallery/${image}`}>
      <img src={`/img/gallery/${image}`} alt={image} class="gallery-image" />
    </a>
  {/each}
</div>