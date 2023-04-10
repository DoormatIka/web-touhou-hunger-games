<script lang="ts">
  import { fly } from "svelte/transition"
  const default_image = "placeholder.jpg"
  $: players = [
    { name: "zent", picture: default_image },
    { name: "dankmemez", picture: default_image },
    { name: "alice", picture: default_image },
    { name: "nickahmad", picture: default_image },
    { name: "mikanyannyan", picture: default_image },
    { name: "cikeci", picture: default_image },
    { name: "miharioyama", picture: default_image },
    { name: "frame", picture: default_image },
    { name: "onnloong", picture: default_image },
    { name: "yuki", picture: default_image },
    { name: "thom", picture: default_image }
  ];
  
  function onAdd(e: SubmitEvent) {
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name");
    const imgu = formData.get("imgu");
    if (name && imgu)
      players.push({ name: name.toString(), picture: imgu.toString() });
      formData.set("name", "");
      formData.set("imgu", "");
      players = players; // update code
  }
</script>


<div class="h-screen">
  <h2 class="mt-10">The Reaping</h2>
  <p>Number of players: {players.length}</p>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 grid-flow-dense gap-4">
      {#each players as { name, picture }, index}
        {#key index}
          <div in:fly={{ y: 200 }} out:fly={{ y: -200 }} class="border px-3 break-all">
            <img src={picture} alt={name} class=" max-h-32"/>
            <p>{ name }</p>
            <button on:click={() => { players.splice(index, 1); players = players; }}>Remove</button>
          </div>
        {/key}
      {/each}
  </div>
  <div class=" mt-10 flex flex-col justify-center items-center w-full">
    <form on:submit|preventDefault={onAdd} enctype="multipart/form-data" class=" flex flex-col justify-center items-center gap-3 w-2/4 min-w-fit border p-5">
      <label class=" w-full">
        Name
        <input type="text" class=" h-10 w-full" name="name" required />
      </label>
      <label class="w-full">
        Image URL
        <input type="text" class=" h-10 w-full" name="imgu" required />
      </label>
      <button type="submit" class="py-3 my-3 px-10 border w-full">Add</button>
      <button type="reset" on:click={() => { players = [] }} class="border p-3 w-full">Clear All</button>
    </form>
  </div>
</div>