import { combineReducers } from "redux";

import * as types from "./types";

const emptyBoard = Array(9).fill("");

const move = (board, { player, index }) => {
  let XorO;
  if (player === 1) XorO = "X";
  else XorO = "O";
  var newBoard = board.map((v, i) => (i === index ? XorO : v));
  return newBoard;
};

const boardReducer = (state = emptyBoard, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return emptyBoard;
    case types.MOVE:
      var board = move(state, action.payload);
      return board;
    default:
      return state;
  }
};

const gameoverReducer = (state = false, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return false;
    case types.DRAW:
      return true;
    case types.WINNER:
      return true;
    default:
      return state;
  }
};

const winnerReducer = (state = -1, action) => {
  switch (action.type) {
    case types.WINNER:
      return action.payload;
    case types.NEW_GAME:
      return -1;
    default:
      return state;
  }
};

const playerReducer = (state = 1, action) => {
  switch (action.type) {
    case types.GAME_OVER:
      return { number: state.number, timeLeft: 15 };
    case types.CHANGE_PLAYER:
      return { number: action.payload, timeLeft: 15 };
    case types.NEW_GAME:
      return { number: 1, timeLeft: 15 };
    case types.TIMER_TIC:
      if (state === 1) {
        return { number: 1, timeLeft: 15, intervalId: action.payload };
      }
      if (state.timeLeft <= 0) {
        let nextPlayer;
        switch (state.number) {
          case 1:
            nextPlayer = 2;
            break;
          case 2:
            nextPlayer = 1;
            break;
          default:
            // throw error?
            break;
        }
        return { number: nextPlayer, timeLeft: 15, intervalId: action.payload };
      } else {
        return {
          number: state.number,
          timeLeft: state.timeLeft - 1,
          intervalId: action.payload
        };
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  board: boardReducer,
  gameover: gameoverReducer,
  winner: winnerReducer,
  player: playerReducer
});

export default reducer;
