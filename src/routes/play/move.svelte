<script lang="ts">
  export let move: string;
  export let dead: string | undefined;
  export let def: string | undefined;
  export let color: "red" | "grey" | "white" | "sky";
</script>

<div class="border m-3 sm:w-3/5 sm:min-w-min w-full">
  <div class=" flex flex-row gap-3 justify-center p-5">
    {#if def}
      <img class="border w-1/3 lg:w-1/5 my-3 mx-3" src={def} alt={move}>
    {/if}
    {#if dead}
      <img class="border w-1/3 lg:w-1/5 my-3 mx-3 grayscale" src={dead} alt={move}>
    {/if}
  </div>
  <div class="p-3">
    {#if color === "red"}
      <p class="text-red-300">{move}</p>
    {:else if color === "white"}
      <p>{move}</p>
    {:else if color === "grey"}
      <p class="text-gray-300">{move}</p>
    {:else if color === "sky"}
      <p class="text-sky-300">{move}</p>
    {/if}
  </div>
</div>