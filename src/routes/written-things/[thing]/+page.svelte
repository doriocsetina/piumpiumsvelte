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
  .capitolo {
    max-width: 700px;
  }

  h1 {
    background-color: white;
  }
</style>
