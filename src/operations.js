import { newGame, draw, switchPlayer, winner, movePlayer } from "./actions";
import { isWinner, isDraw } from "./game";

const playTurn = (player, index, board, intervalId) => dispatch => {
  let nextPlayer;

  switch (player) {
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
  let XorO;
  if (player === 1) XorO = "X";
  else XorO = "O";
  var newBoard = board.map((v, i) => (i === index ? XorO : v));
  if (isWinner(newBoard, player)) {
    clearInterval(intervalId);
    dispatch(winner(player));
    dispatch(draw());
  } else if (isDraw(newBoard)) {
    clearInterval(intervalId);
    dispatch(winner(0));
    dispatch(draw());
  }
  dispatch(movePlayer(player, index));
  dispatch(switchPlayer(nextPlayer));
};

const newGameOperation = () => dispatch => {
  dispatch(newGame());
};

export { newGame, playTurn, newGameOperation };
