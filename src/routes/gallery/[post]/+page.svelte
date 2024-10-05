<script lang="ts">
  import type { PageData } from "./$types";
  import { onDestroy, onMount } from "svelte";
  import { isTitleShown } from "$lib/stores";
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
    $isTitleShown = false;
    try {
      const response = await fetch("/api/images/" + data.post);
      if (response.ok) {
        postData = (await response.json()) as PostData;
      } else {
        console.error("Failed to fetch posts data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching posts data:", error);
    }
  });
  onDestroy( () => $isTitleShown = true)
  let currentIndex = 0;

  function scrollToImage(index: number) {
    const gallery = document.querySelector(".gallery-wrapper");
    const images = document.querySelectorAll(".gallery-image");
    if (gallery && images[index]) {
      const image = images[index] as HTMLElement;
      gallery.scrollTo({
        left: image.offsetLeft - (gallery.clientWidth - image.clientWidth) / 2,
        behavior: "smooth",
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
  <div class="gallery-container">
    {#if postData && postData.files.length > 1}
      {#if currentIndex > 0}
        <button class="nav-button left" on:click={prevImage}>&lt;</button>
      {/if}
      <div class="gallery-wrapper">
        {#each postData.files as postImage}
          <img
            src={`/gallery/${postImage}`}
            alt={postImage}
            class="gallery-image"
            on:load={() => scrollToImage(currentIndex)}
          />
        {/each}
      </div>
      {#if currentIndex + 1 != postData.files.length}
        <button class="nav-button right" on:click={nextImage}>&gt;</button>
      {/if}
    {:else if postData && postData.files.length == 1}
      <img
        src={`/gallery/${postData.preview}`}
        alt="${postData.preview}"
        class="gallery-image"
      />
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center; /* Center items vertically */
    justify-content: space-between; /* Space out items horizontally */
    margin-right: 10%;
  }
  .title,
  .description {
    margin: 0; /* Remove default margin */
    background-color: white; /* Set background color to white */
    font-size: large;
  }
  .text-content {
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center text vertically */
  }

  .gallery-container {
    max-width: 98vh; /* Adjust height as needed */
    max-height: 93vh; /* Full width */

    overflow: hidden; /* No scrollbars for the outer container */
    position: relative; /* Positioning control */
    z-index: 20;
  }

  .gallery-wrapper {
    display: flex; /* Make it a flex container */
    overflow-x: scroll; /* Enable horizontal scrolling */
    scroll-snap-type: x mandatory; /* Snap scrolling */
    scroll-behavior: smooth; /* Smooth scrolling */
    height: 100%; /* Full height of the container */
    -webkit-overflow-scrolling: touch;
  }
  .gallery-image {
    flex: 0 0 auto; /* Prevent images from shrinking or growing */
    width: 100%; /* Each image takes full width */
    height: 100%; /* Full height */
    scroll-snap-align: start; /* Snap points */
  }

  .nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    padding: 1rem;
    cursor: pointer;
    z-index: 1;
  }
  .nav-button.left {
    left: 0;
    z-index: 51;
  }
  .nav-button.right {
    right: 0;
    z-index: 51;
  }
</style>
