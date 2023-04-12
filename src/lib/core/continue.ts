import { shallowTraverseGraph } from "./area";
import type { Area } from "./area";
import { chooseDeath, chooseKill, chooseMove, chooseStay } from "./data/responses/response";
import { randomDeathPlayers, sweepPlayer, vsPlayers } from "./mark";
import { arrayMoveTo } from "./move";

export function onProceed(
  adj_list: Map<string, Area>, 
  rounds: number,
) {
  const onMovement: string[] = [];
  const onStay: string[] = [];
  const onKill: string[] = [];
  const onRandomDeath: string[] = [];

  shallowTraverseGraph(adj_list, (area, current) => {
    arrayMoveTo(area, adj_list, // random messages
      (player, moved_to) => { onMovement.push(chooseMove(player.id, moved_to, current)) }, 
      (player)           => { onStay.push(chooseStay(player.id, current)) });
  })

  shallowTraverseGraph(adj_list, (area, curr) => {
    if (rounds > 3) {
      vsPlayers(area, (unmarked, marked) => { 
        onKill.push(chooseKill(
          marked.id, 
          unmarked.id, 
          unmarked.getFightingChance(), 
          marked.getFightingChance())) 
        })
      randomDeathPlayers(area, (dead) => { onRandomDeath.push(chooseDeath(dead.id)) })
    }
    for (let i = 0; i < area.players.length; i++) {
      area.players[i].hasPlayed = false;
      sweepPlayer(area, i);
    }
  })
  rounds++;
  // Object.freeze()
  // console.log(adj_list)
  return {
    onMovement,
    onStay,
    onKill,
    onRandomDeath,
    rounds
  }
}