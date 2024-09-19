<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<h1>Image: {data.props.image}</h1>
<img src={`/img/gallery/${data.props.image}`} alt={data.props.image} class="full-image">
