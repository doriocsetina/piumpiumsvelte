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

  onMount(async () => {
    try {
      console.log("doing this: ", data.thing);
      const response = await fetch("/api/texts/" + data.thing);
      if (response.ok) {
        textData = (await response.json()) as TextData;
        const markdownResponse = await fetch(
          `/written/${textData.id}/${textData.chapters[0]}`
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
  <div class="capitolo">
      <h1>{textData?.title}</h1>
      {#await markdownContent}
        <div class="markdown-content"></div>
      {:then resolvedMarkdownContent}
        <div class="markdown-content">{@html resolvedMarkdownContent}</div>
      {/await}
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
    background-image: url("/img/background/written.webp");
    background-size: contain;
    background-position: left;
    background-repeat: no-repeat;
  }

  .container {
    display: flex;
    flex-direction: row;
  }

  .capitolo {
    margin-top: 100px;
    margin-bottom: 100px;
    margin-left: auto; /* Pushes the element to the right */
    margin-right: 5%;
    max-width: 1000px;
    align-self: flex-end;
    background-color: white;
    z-index: 20;
  }

  .markdown-content{
    font-size: x-large;
    margin: 20px;
  }

  h1 {
    background-color: white;
    margin: 20px;
  }
</style>
