import { shallowTraverseGraph } from "./area";
import type { Area } from "./area";
import { chooseDeath, chooseKill, chooseMove, chooseStay } from "./data/responses/response";
import { randomDeathPlayers, sweepPlayer, vsPlayers } from "./mark";
import { arrayMoveTo } from "./move";

export type Message = {
  message: string,
  pictures: { unmarked: string | undefined, marked: string | undefined },
}

export function onProceed(
  adj_list: Map<string, Area>, 
  rounds: number,
  gap: number
) {
  const onMovement: Message[] = [];
  const onStay: Message[] = [];
  const onKill: Message[] = [];
  const onRandomDeath: Message[] = [];
  const onBarrier: Message[] = [];

  shallowTraverseGraph(adj_list, (area, current) => {
    arrayMoveTo(area, adj_list, // random messages
      (player, moved_to) => { 
        onMovement.push({ 
          message: chooseMove(player.id, moved_to, current), 
          pictures: { unmarked: player.imageLink, marked: undefined } 
        }) 
      }, 
      (player) => { 
        onStay.push({ 
          message: chooseStay(player.id, current), 
          pictures: { unmarked: player.imageLink, marked: undefined } 
        }) 
      },
      (player, moved_to) => {
        onBarrier.push({
          message: `${player.id} barriered ${moved_to}.`,
          pictures: { unmarked: player.imageLink, marked: undefined }
        })
      }, gap);
  })

  shallowTraverseGraph(adj_list, (area, curr) => {
    if (rounds > 3) {
      vsPlayers(area, (unmarked, marked) => { 
        onKill.push({
          message: chooseKill(
            marked.id, 
            unmarked.id, 
            unmarked.getFightingChance(), 
            marked.getFightingChance()
          ),
          pictures: { unmarked: unmarked.imageLink, marked: marked.imageLink }
        })
      })
      randomDeathPlayers(area, (dead) => { 
        onRandomDeath.push({ 
          message: chooseDeath(dead.id), 
          pictures: { unmarked: undefined, marked: dead.imageLink }
        }) 
      })
    }
    for (let i = 0; i < area.players.length; i++) {
      area.players[i].hasPlayed = false;
      sweepPlayer(area, i);
    }
  })

  return {
    onMovement,
    onStay,
    onKill,
    onRandomDeath,
    onBarrier,
    rounds,
    gap
  }
}