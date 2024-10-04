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
      <a href={`/written-things/${text.id}`}>
        <h1>{text.title}<br /></h1>
      </a>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: flex-start; /* Align to the left */
    align-items: center; /* Center vertically */
    height: 100vh; /* Full viewport height */
    margin: 0; /* Remove default margin */
    background-image: url("/img/background/written.PNG");
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
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
