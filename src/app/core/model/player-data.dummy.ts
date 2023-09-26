import {Player} from "./player.model";

export const PlayerData: Player[] = [
  {id: 0, name: 'Player 1', wins: 0, isNextTurn: false, currentTurn: true, sign: 'x'},
  {id: 1, name: 'Player 2', wins: 0, isNextTurn: true,currentTurn: false, sign: 'o'},
]
