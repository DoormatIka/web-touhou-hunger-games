<script lang="ts">
  import { fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { getContext } from "svelte";

  import { createGraph, type Area, labelDistances } from "$lib/core/area";
  import human_village from "$lib/core/data/humanvillage.json";

  import type { Writable } from "svelte/store";


  let players: Writable<Array<{ name: string; picture: string }>> =
    getContext("players");
  let graphs: Writable<Map<string, Area>> = 
    getContext("graph");

  function onAdd(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name")?.toString();
    const imgu = formData.get("imgu")?.toString();

    if (!(name && imgu)) return;
    if ($players.find((v) => v.name === name)) {
      return;
    }

    $players.push({ name: name, picture: imgu });
    formData.set("name", "");
    formData.set("imgu", "");
    $players = $players; // update code
  }

  function createLabelledGraph() {
    const graph = createGraph(human_village)
    labelDistances("Dragon Road", graph) 
    graphs.set(graph);
  }
</script>

<div class="h-screen">
  <h2 class="mt-10">The Reaping</h2>
  <p>Number of players: {$players.length}</p>
  <div
    class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 grid-flow-dense gap-4"
  >
    {#each $players as { name, picture }, index (name)}
      <div
        in:fly|local={{ x: -100, duration: 500 }}
        out:fly|local={{ x: -100, duration: 500 }}
        animate:flip={{ duration: 600 }}
        class="border px-3 break-all relative m-auto"
      >
        <img src={picture} alt={name} class=" my-3 max-h-32 object-contain" />
        <p>{name}</p>
        <button
          on:click={() => {
            players.set($players.filter((v) => v.name !== name));
          }}>Remove</button
        >
      </div>
    {/each}
  </div>
  <div>
    <a 
      href="/play"
      class=" mt-10 inline-block px-32 py-3 border shadow-none hover:shadow-lg transition-all duration-300 ease-out hover:tracking-widest"
      on:click={createLabelledGraph}
    >
      Play
    </a>
  </div>
  <div class=" mt-10 flex flex-col justify-center items-center w-full">
    <form
      on:submit|preventDefault={onAdd}
      enctype="multipart/form-data"
      class=" flex flex-col justify-center items-center gap-3 w-2/4 min-w-fit border p-5"
    >
      <label class=" w-full">
        Name (should be unique)
        <input type="text" class=" h-10 w-full" name="name" required />
      </label>
      <label class="w-full">
        Image URL
        <input type="text" class=" h-10 w-full" name="imgu" required />
      </label>
      <button type="submit" class="py-3 my-3 px-10 border w-full">Add</button>
      <button
        type="reset"
        on:click={() => {
          $players = [];
        }}
        class="border p-3 w-full">Clear All</button
      >
    </form>
  </div>
</div>
