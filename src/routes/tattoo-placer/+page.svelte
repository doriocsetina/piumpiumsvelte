<script lang="ts">
  import { onMount } from "svelte";
  import * as THREE from "three";

  let scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
    body: THREE.Mesh;
  let tattoos = ["tatu1.png", "tatu2.png", "tatu3.png"]; // List of tattoo images

  onMount(() => {
    init();
    animate();
  });

  function init() {
    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.7, window.innerHeight * 0.7);
    document.getElementById("3d-body")?.appendChild(renderer.domElement);

    // Add a light
    const light1 = new THREE.DirectionalLight(0xffffff, 1);
    light1.position.set(0, 1, 1).normalize();
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.position.set(1, 0, 1).normalize();
    scene.add(light2);

    // Create a sphere as a placeholder for the body
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa });
    body = new THREE.Mesh(geometry, material);
    scene.add(body);

    camera.position.z = 5;

    // Add event listeners for drag-and-drop
    const images = document.querySelectorAll<HTMLImageElement>(".tattoo-image");
    images.forEach((image) => {
      image.addEventListener("dragstart", onDragStart);
    });
    renderer.domElement.addEventListener("dragover", onDragOver);
    renderer.domElement.addEventListener("drop", onDrop);
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  function onDragStart(event: DragEvent) {
    if (event.dataTransfer && event.target instanceof HTMLImageElement) {
      event.dataTransfer.setData("text/plain", event.target.src);
    }
  }

  function onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();
    const src = event.dataTransfer?.getData("text/plain");
    if (src) {
      applyTattoo(src);
    }
  }

  function applyTattoo(src: string) {
    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      const material = new THREE.MeshPhongMaterial({ map: texture });
      body.material = material;
    });
  }
</script>

<div class="container">
  <div id="3d-body" class="threejs-container" />
  <div class="tattoo-list">
    {#each tattoos as tattoo}
      <img
        src={`/img/tattoos/${tattoo}`}
        alt={tattoo}
        class="tattoo-image"
        draggable="true"
      />
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    height: 100vh;
  }
  .threejs-container {
    flex: 1;
  }
  .tattoo-list {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #f0f0f0;
    padding: 1rem;
  }
  .tattoo-image {
    width: 500px;
    margin-bottom: 1rem;
    cursor: grab;
  }
</style>
