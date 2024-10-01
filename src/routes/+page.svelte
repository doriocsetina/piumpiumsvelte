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
</script>

<div class="gallery">
  {#each postsData as post}
    <a href={`/gallery/${post.id}`}>
      <img
        src={`/img/gallery/${post.preview}`}
        alt={post.title}
        class="gallery-image"
      />
    </a>
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
