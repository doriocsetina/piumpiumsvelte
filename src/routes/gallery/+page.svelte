<script lang="ts">
  import { onMount } from "svelte";
  import { onDestroy } from "svelte";
  import { y } from "$lib/stores";

  interface PostData {
    id: string;
    title: string;
    description: string;
    preview: string;
    files: string[];
  }
  let postsData: PostData[] = [];

  onMount(async () => {
    try {
      const response = await fetch("/api/images");
      if (response.ok) {
        postsData = await response.json();
        if (typeof window !== "undefined") {
          setTimeout(() => {
            window.scrollTo(0, $y);
          }, 1); // Delay of 1 second
        }
      } else {
        console.error("Failed to fetch posts data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      $y = window.scrollY;
    }
  });

  let previewTitle: string = "";
  let previewIsOn: boolean = false;
  function showPreview(title: string) {
    previewTitle = title;
    previewIsOn = true;
  }

  function hidePreview() {
    previewTitle = "";
    previewIsOn = false;
  }
</script>

<div class="container">
  <div class="text-container">
    <p>
      raccolta dei disegni delle bozze delle cose exported, <br />
      in no particular order
    </p>
  </div>
  <div class={previewIsOn ? "preview" : ""}>
    {#if previewTitle}
      <h1>{previewTitle}</h1>
    {/if}
  </div>
  <div class="gallery-container">
    <div class="gallery">
      {#each postsData as post}
        <a href={`/gallery/${post.id}`} on:blur={hidePreview}>
          <img
            src={`/gallery/${post.preview}`}
            alt={post.title}
            class="gallery-image"
            on:mouseover={() => showPreview(post.title)}
            on:focus={() => showPreview(post.title)}
            on:mouseout={hidePreview}
            on:blur={hidePreview}
          />
        </a>
      {/each}
    </div>
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
    background-image: url("/img/background/gallery.webp");

    background-position: left;
    background-repeat: no-repeat;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    z-index: 1;
  }

  .text-container {
    margin-top: 100px;
  }

  .gallery-container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    align-items: end;
  }

  .preview {
    position: fixed;
    top: 50%;
    left: 50px;
    transform: translateY(-50%);
    background-color: white;
    padding: 10px;
    z-index: 10;
  }

  p {
    background-color: white;
    height: auto;
    width: auto;
    font-size: x-large;
  }

  .gallery {
    display: flex;
    flex-direction: column; /* Arrange images in a column */
    max-width: 90vh;
  }

  .gallery-image {
    max-width: 100%; /* Make images responsive */
    height: auto; /* Maintain aspect ratio */
    margin-bottom: 10px; /* Add some space between images */
  }

  .gallery a:last-child .gallery-image {
    margin-bottom: 0; /* Remove margin from the last image */
  }
</style>
