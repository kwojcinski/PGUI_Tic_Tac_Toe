import React from "react";
import PropTypes from "prop-types";
import Field from "./Field";
import "../styles.css";

const Board = ({ classes, board, onMove }) => {
  // the 'board' and 'onMove' handler are passed in from the props of the Game which
  // holds this component and control the state
  // we will simply render the 'board' in its current state and call the 'onMove'
  // handler function given to us when a player clicks on a Square
  return (
    <div>
      {board.map((v, i) => (
        <Field key={i} value={v} onClick={() => onMove({ index: i })} />
      ))}
    </div>
  );
};

const { arrayOf, number, object, func } = PropTypes;

Board.propTypes = {
  classes: object.isRequired,
  board: arrayOf(arrayOf(number)).isRequired,
  onMove: func.isRequired
};

export default Board;
