import * as types from "./types";

const newGame = () => ({
  type: types.NEW_GAME
});

const draw = () => ({
  type: types.DRAW
});

const movePlayer = (player, index) => ({
  type: types.MOVE,
  payload: { player, index }
});

const switchPlayer = player => ({
  type: types.CHANGE_PLAYER,
  payload: player
});

const winner = player => ({
  type: types.WINNER,
  payload: player
});

const timerTick = value => ({
  type: types.TIMER_TIC,
  payload: value
});

const gameover = () => ({
  type: types.GAME_OVER
});

export { newGame, draw, movePlayer, switchPlayer, winner, timerTick, gameover };
