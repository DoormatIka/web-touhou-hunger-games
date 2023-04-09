<script>
  import "../app.css";
</script>

<svelte:head>
  <title>Touhou Hunger Games</title>
  <meta content="Touhou Hunger Games (Incomplete)" property="og:title" />
  <meta content="A simulator to make players fight to the death in the land of Gensokyo." property="og:description" />
</svelte:head>

<div class="h-screen flex-grow w-screen flex sm:flex-row flex-col overflow-hidden">
  <div
    class="relative menu-bg min-h-fit w-full sm:h-full sm:w-1/4 min-w-min sm:max-w-xs border"
  >
    <div class="text-center py-7 px-4">
      <h3>Touhou Hunger Games</h3>
      <div class="flex sm:flex-col flex-row gap-5 sm:gap-2 sm:mt-14 mt-10 mx-3 text-white justify-center">
        <a href="/" class="sm:mb-5">Disclaimer</a>
        <a href="/">Options</a>
        <a href="/">Help</a>
        <a href="/">Modify Events</a>
      </div>
    </div>
  </div>
  <div class="overflow-y-auto w-full">
    <div
      class="flex justify-center items-center mx-10 my-6 text-center leading-loose flex-col"
    >
    <slot />
  </div>
  </div>
</div>
