<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center w-screen">
  <h1>{$page.status}</h1>
  <p>{$page.error?.message}</p>
  <a href="/">Go back.</a>
</div>