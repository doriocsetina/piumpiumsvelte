<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { marked } from "marked";

  export let data: PageData;

  interface TextData {
    id: string;
    title: string;
    description: string;
    has_chapters: boolean;
    chapters: string[];
  }

  let textData: TextData;
  let markdownContent: Promise<string>;
  let chapter: number;
  $: nextChapter = chapter + 1;
  $: previousChapter = chapter - 1;
  onMount(async () => {
    try {
      chapter = parseInt(data.chapter);
      console.log("chapter is now: ", chapter)
      const response = await fetch("/api/texts/" + data.thing);
      if (response.ok) {
        textData = (await response.json()) as TextData;
        const markdownResponse = await fetch(
          `/written/${textData.id}/${textData.chapters[parseInt(data.chapter)]}`
        );
        if (markdownResponse.ok) {
          const markdown = await markdownResponse.text();
          markdownContent = Promise.resolve(marked(markdown));
        } else {
          console.error("Failed to fetch texts data:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error fetching texts data:", error);
    }
  });

</script>

<div class="container">
  <div class="container-vertical">
    <div class="capitolo">
      <h1>{textData?.title}</h1>
      {#await markdownContent}
        <div class="markdown-content"></div>
      {:then resolvedMarkdownContent}
        <div class="markdown-content">{@html resolvedMarkdownContent}</div>
      {/await}
    </div>
    <nav>
      {#if previousChapter !== undefined && previousChapter >= 0}
      <a data-sveltekit-reload href="/written-things/{textData?.id}/{previousChapter}"
      >capitolo precedente</a
      >
      {/if}
      {#if nextChapter !== undefined && textData?.chapters.length > nextChapter}
      <a data-sveltekit-reload href="/written-things/{textData?.id}/{nextChapter}"
      >capitolo successivo</a
      >
      {/if}
    </nav>
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
    background-position: left;
    background-repeat: no-repeat;
  }

  .container {
    display: flex;
    flex-direction: row;

  }

  .container-vertical {
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    margin-left: auto; /* Pushes the element to the right */
  }

  .container-vertical nav {
    display: flex;
    width: 95%;
    margin-right: 5%;
    background-color: white;
    justify-content: space-between;
  }

  .container-vertical a {
    color: black;
    text-decoration: none;
    font-size: x-large;
  }

  .capitolo {
    margin-top: 100px;
    margin-bottom: 100px;
    margin-right: 5%;
    max-width: 1400px;
    background-color: white;
    z-index: 20;
    transition: all 1s ease;

  }

  .markdown-content {
    font-size: x-large;
    margin: 20px;
  }

  h1 {
    background-color: white;
    margin: 20px;
  }
</style>
