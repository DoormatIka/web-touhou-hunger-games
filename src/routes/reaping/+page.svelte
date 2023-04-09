<script lang="ts">
  const default_image = "https://images-ext-1.discordapp.net/external/HJNf2kgLANTjmvnPUPk-VwaJFsALQDwB1wkW7UWEuUg/https/i.pinimg.com/originals/68/07/39/680739eaa243c983e7d345a23a6269d8.jpg?width=676&height=676"
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
  ]
</script>


<div class="h-screen">
  <h2 class="m-5">The Reaping</h2>
  <div class="grid grid-cols-3 lg:grid-cols-5 grid-flow-dense gap-4">
    {#each players as { name, picture }}
      <div class="border px-3 break-all">
        <img src={picture} alt={name} class=" max-h-32"/>
        <p>{ name }</p>
      </div>
    {/each}
  </div>
</div>