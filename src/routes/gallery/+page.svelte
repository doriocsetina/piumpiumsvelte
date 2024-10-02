<script lang="ts">
  import { onMount } from "svelte";
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
      } else {
        console.error("Failed to fetch posts data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  });

  let previewTitle: string = '';

  function showPreview(title: string) {
    previewTitle = title;
  }

  function hidePreview() {
    previewTitle = '';
  }
</script>

<div class="container">
  <div class="preview">
    {#if previewTitle}
      <h1>{previewTitle}</h1>
    {/if}
  </div>
  <div class="gallery">
    {#each postsData as post}
      <a href={`gallery/${post.id}`} on:blur={hidePreview}>
        <img
          src={`gallery/${post.preview}`}
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

<style>
  .container {
    display: flex;
    flex-direction: column;
    overflow: auto;
    align-items:end;
    margin-right: 10%;
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
