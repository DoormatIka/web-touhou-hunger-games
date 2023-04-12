<script lang="ts">
  import type { Writable } from "svelte/store";
  import { getContext } from "svelte";
  import { getPlayersLength, type Area, type createGraph, getLastPlayer } from "$lib/core/area";
  import { onProceed, type Message } from "$lib/core/continue";
  import { Player, createPlayers } from "$lib/core/player";
  import { redirect } from "@sveltejs/kit";
  import Move from "./move.svelte";

  let players: Writable<Array<{ name: string; picture: string }>> =
    getContext("players");
  let graphs: Writable<Map<string, Area>> = 
    getContext("graph");
  
  if ($players.length === 0 || $graphs.size === 0) {
    throw redirect(301, "/")
  }

  if (getPlayersLength($graphs) === 0) {
    $graphs.get("Dragon Road")
        ?.players.push(
          ...createPlayers($players, "Dragon Road"))
  }

  let results: {
    onMovement: Message[],
    onStay: Message[],
    onKill: Message[],
    onRandomDeath: Message[],
    rounds: number
  } = { onMovement: [], onStay: [], onRandomDeath: [], onKill: [], rounds: 1 }
</script>

{#if $players.length < 1}
  <p class="text-red-500">Players not set.</p>
{:else if $graphs.size < 1}
  <p class="text-red-500">Graphs not set.</p>
{:else}
  {#if results}
    {#each results.onMovement as { message, pictures }}
      <Move move={ message } def={ pictures.unmarked } dead={ pictures.marked } color="white"></Move>
    {/each}
    {#each results.onKill as { message, pictures }}
      <Move move={ message } def={ pictures.unmarked } dead={ pictures.marked } color="red"></Move>
    {/each}
    {#each results.onRandomDeath as { message, pictures }}
      <Move move={ message } def={ pictures.unmarked } dead={ pictures.marked } color="grey"></Move>
    {/each}
    {#each results.onStay as { message, pictures }}
      <Move move={ message } def={ pictures.unmarked } dead={ pictures.marked } color="sky"></Move>
    {/each}
    <p>Round: {results.rounds}</p>
  {/if}

  {#if getPlayersLength($graphs) === 1}
    <p class="text-yellow-300">Winner: { getLastPlayer($graphs)?.id }</p>
  {/if}
  <button on:click={() => { results = onProceed($graphs, results.rounds); graphs = graphs; }}>Continue</button>
{/if}