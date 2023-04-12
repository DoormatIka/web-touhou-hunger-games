<script lang="ts">
  import type { Area } from "$lib/core/area";
  import "../app.css";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const default_image = "placeholder.jpg"
  const players = writable<Array<{ name: string, picture: string }>>([]);
  const graph = writable<Map<string, Area>>(new Map());
  const event = writable(Array<string>);

  players.set([
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
  ]);

  setContext("players", players);
  setContext("graph", graph);
  setContext("event", event);
</script>

<svelte:head>
  <title>Touhou Hunger Games</title>
  <meta content="Touhou Hunger Games (Incomplete)" property="og:title" />
  <meta content="A simulator to make players fight to the death in the land of Gensokyo." property="og:description" />
</svelte:head>

<div class="h-screen flex-grow w-screen flex sm:flex-row flex-col overflow-hidden">
  <div
    class="menu-bg min-h-fit w-full sm:h-full sm:w-1/4 min-w-min sm:max-w-xs border"
  >
    <div class="text-center py-7 px-4">
      <h3>Touhou Hunger Games</h3>
      <div class="flex sm:flex-col flex-row gap-5 sm:gap-2 sm:mt-14 mt-10 mx-3 text-white justify-center">
        <a href="/">Disclaimer</a>
        <a href="/credit">Credits</a>
        <a href="/todo" class="sm:mt-5">Todo List</a>
        <a href="https://github.com/DoormatIka/touhou-hunger-games">Github Project</a>
        <a href="https://github.com/DoormatIka">Github Profile</a>
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
