import { arrayOf } from "prop-types";

const winningPatterns = [
  // rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // crosses
  [0, 4, 8],
  [2, 4, 6],
  // columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
];

const isWinner = (board, player) => {
  let XorO;
  if (player === 1) XorO = "X";
  else XorO = "O";
  for (var i = 0; i < winningPatterns.length; i++) {
    var s = 0;
    for (var j = 0; j < 3; j++) {
      if (board[winningPatterns[i][j]] === XorO) s++;
    }
    if (s === 3) return true;
  }
  return false;
};

const isDraw = board => {
  const notDraw = board.some(index => index === "");

  return !notDraw;
};

export { isWinner, isDraw };
