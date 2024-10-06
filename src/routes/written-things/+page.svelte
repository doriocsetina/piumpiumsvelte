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

  let previewDesc: string = "";
  let previewIsOn: boolean = false;
  function showPreview(desc: string) {
    previewDesc = desc;
    previewIsOn = true;
  }

  function hidePreview() {
    previewDesc = "";
    previewIsOn = false;
  }
</script>

<div class="container">
  <div class={previewIsOn ? "preview" : ""}>
    {#if previewIsOn}
      <p>{previewDesc}</p>
    {/if}
  </div>
  <div class="spiegone">
    <p>tutte le mie quasi zine - da maneggiare con cura</p>

    {#each textsData as text}
      {#if text.has_chapters}
        <a
          href={`/written-things/${text.id}/0`}
          on:mouseover={() => showPreview(text.description)}
          on:focus={() => showPreview(text.description)}
          on:mouseout={hidePreview}
          on:blur={hidePreview}
        >
          <h1>{text.title}<br /></h1>
        </a>
      {:else}
        <a
          href={`/written-things/${text.id}`}
          on:mouseover={() => showPreview(text.description)}
          on:focus={() => showPreview(text.description)}
          on:mouseout={hidePreview}
          on:blur={hidePreview}
        >
          <h1>{text.title}<br /></h1>
        </a>
      {/if}
    {/each}
  </div>
</div>

<div class="background"></div>

<style>
  .container {
    display: flex;
    justify-content: flex-start;
    margin-top: 100px;
    margin-left: 20px;
    height: 59vh;
  }

  .spiegone {
    display: flex;
    align-items: start;
    flex-direction: column;
    position: relative;
  }

  .spiegone h1 {
    background-color: white;
    color: black;
  }

  .spiegone a {
    text-decoration: none;
  }

  .spiegone p {
    align-items: center;
    background-color: white;
    font-size: x-large;
  }

  .preview {
    position: fixed;
    top: 50%;
    right: 50px;
    transform: translateY(-50%);
    padding: 10px;
    z-index: 10;
    width: 50%;
  }
  .preview p {
    background-color: white;
    font-size: xx-large;
  }
  .background {
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: url("/img/background/written.webp");
    background-size: contain;
    background-position: right;
    background-repeat: no-repeat;
  }
</style>
