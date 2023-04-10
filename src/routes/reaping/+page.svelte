<script lang="ts">
  const default_image = "placeholder.jpg"
  const players: { name: string, picture: string }[] = [
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
  
  let imgurl: string | undefined;
  let name: string | undefined;
  function onAdd(e: SubmitEvent) {
    if (imgurl && name) {
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("name");
      const imgu = formData.get("imgu");
      console.log(name, imgu)
      if (name && imgu)
        players.push({ name: name.toString(), picture: imgu.toString() })
    }
  }
</script>


<div class="h-screen">
  <h2 class="m-5">The Reaping</h2>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 grid-flow-dense gap-4">
    {#each players as { name, picture }}
      <div class="border px-3 break-all">
        <img src={picture} alt={name} class=" max-h-32"/>
        <p>{ name }</p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={onAdd} class=" mt-10 flex flex-col justify-center items-center gap-3 sm:w-1/4 w-full">
    <label>
      Name
      <input type="text" class=" h-10 w-full" name="name" required />
    </label>
    <label>
      Image URL
      <input type="text" class=" h-10 w-full" name="imgu" required />
    </label>
    <button type="submit" class="py-5 px-10 border">Add</button>
  </form>
</div>