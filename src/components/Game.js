import React, { Component } from "react";
import Board from "./Board";
import PropTypes from "prop-types";
import * as gameOperations from "../operations";
import { connect } from "react-redux";
import Field from "./Field";

class Game extends Component {
  constructor(props, context) {
    super(props, context);

    // binding 'this' to the handler so we can use 'this' to refer to props of this class
    this.handleBoardOnMoveFirst = this.handleBoardOnMoveFirst.bind(this);
    this.handleNewGame = this.handleNewGame.bind(this);
  }

  handleBoardOnMoveFirst(square) {
    // when a square is clicked we want to mark that square for the current player
    const { board, player, gameover, playTurn } = this.props;
    const { index } = square;
    // only mark if the game is still in progress and the square is empty (none)
    // otherwise, ignore the play
    if (gameover || board[index] !== "") {
      return;
    }
    if (player === 1 || player === 2) {
      // make a play for the player
      playTurn(player, index, board, player.intervalId);
    } else {
      playTurn(player.number, index, board, player.intervalId);
    }
  }
  handleNewGame() {
    const { newGameOperation } = this.props;
    newGameOperation();
  }

  render() {
    const { board, gameover, winner } = this.props;
    let div;
    if (gameover === false) {
      div = (
        <div>
          <div>Gracz: {this.props.player.number}</div>
          <div>Pozostały czas: {this.props.player.timeLeft}</div>
        </div>
      );
    } else if (winner === 0) {
      div = (
        <div>
          <div>Remis</div>
        </div>
      );
    } else {
      div = <div>Wygrał gracz {winner}</div>;
    }

    return (
      <div>
        <h1>Kółko i krzyżyk!</h1>
        <div onClick={() => this.handleNewGame()}>
          <h2>Nowa gra</h2>
        </div>
        {div}
        <div className="board">
          {board.map((v, i) => (
            <Field
              key={i}
              value={v}
              onClick={() => this.handleBoardOnMoveFirst({ index: i })}
            />
          ))}
        </div>
      </div>
    );
  }
}
Game.propTypes = {
  board: PropTypes.arrayOf(String).isRequired,
  player: PropTypes.shape({
    number: PropTypes.number,
    timeLeft: PropTypes.number,
    intervalId: PropTypes.number
  }),
  winner: PropTypes.number,
  gameover: PropTypes.bool.isRequired,
  playTurn: PropTypes.func.isRequired,
  newGameOperation: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    board: state.board,
    player: state.player,
    gameover: state.gameover,
    winner: state.winner
  };
};

const mapDispatchToProps = {
  playTurn: gameOperations.playTurn,
  checkWinner: gameOperations.checkWinner,
  newGameOperation: gameOperations.newGameOperation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
