<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  export let data: PageData;

  interface PostData {
    id: string;
    title: string;
    description: string;
    preview: string;
    files: string[];
  }
  let postData: PostData;

  onMount(async () => {
    try {
      const response = await fetch("/api/" + data.post);
      if (response.ok) {
        postData = (await response.json()) as PostData;
      } else {
        console.error("Failed to fetch posts data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  });

  let currentIndex = 0;

  function scrollToImage(index: number) {
    const gallery = document.querySelector('.gallery-wrapper');
    const images = document.querySelectorAll('.gallery-image');
    if (gallery && images[index]) {
      const image = images[index] as HTMLElement;
      gallery.scrollTo({
        left: image.offsetLeft - (gallery.clientWidth - image.clientWidth) / 2,
        behavior: 'smooth'
      });
      currentIndex = index;
    }
  }

  function nextImage() {
    if (postData && currentIndex < postData.files.length - 1) {
      scrollToImage(currentIndex + 1);
    }
  }

  function prevImage() {
    if (currentIndex > 0) {
      scrollToImage(currentIndex - 1);
    }
  }
</script>

<div class="container">
  <div class="text-content">
    <h1 class="title">{postData?.title}</h1>

    <p class="description">{postData?.description}</p>
  </div>
  <img
    src={`/img/gallery/${postData?.preview}`}
    alt={postData?.preview}
    class="full-image"
  />
</div>

<style>
  .container {
    display: flex;
    align-items: center; /* Center items vertically */
    justify-content: space-between; /* Space out items horizontally */
    height: 100vh; /* Full viewport height */
    padding: 0 2vw; /* Add some padding to the sides */
  }
  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center text vertically */
    padding: 1rem; /* Add some padding around the text */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow for better visibility */
  }
  .full-image {
    max-width: 90vw; /* Adjust width as needed */
    max-height: 90vh; /* Maintain aspect ratio */
    object-fit: contain; /* Maintain aspect ratio and fit within the container */
  }
  .title, .description {
    margin: 0; /* Remove default margin */
    background-color: white; /* Set background color to white */
    font-size: large;
  }
</style>
