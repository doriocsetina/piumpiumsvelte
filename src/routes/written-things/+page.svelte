<script lang="ts">
  import { onMount } from "svelte";

  interface TextData {
    id: string;
    title: string;
    description: string;
    has_chapters: boolean;
    chapters: string[];
  }

  let textsData: TextData[] = [];

  onMount(async () => {
    try {
      const response = await fetch("/api/texts");
      if (response.ok) {
        textsData = await response.json();
      } else {
        console.error("Failed to fetch texts data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching texts data:", error);
    }
  });
</script>

<div class="container">
  <div class="spiegone">
    <p>tutte le mie quasi zine - da maneggiare con cura</p>

    {#each textsData as text}
      {#if text.has_chapters}
      <a href={`/written-things/${text.id}/0`}>
        <h1>{text.title}<br /></h1>
      </a>
      {:else}
      <a href={`/written-things/${text.id}`}>
        <h1>{text.title}<br /></h1>
      </a>
      {/if}
    {/each}
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
    background-image: url("/img/background/written.PNG");
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
  }
  .container {
    display: flex;
    align-items: center; 
    margin: 0; 
  }
  .spiegone {
    display: flex;
    align-items: start;
    flex-direction: column;
    position: relative;
  }
  .spiegone h1 {
    background-color: white;
  }

  .spiegone p {
    align-items: center;
    background-color: white;
    font-size: large;
  }
</style>
