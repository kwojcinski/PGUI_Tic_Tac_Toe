import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

function Player(props) {
  return (
    <div
      className="d-inline-flex flex-column align-items-center px-2"
      style={{ width: "200px" }}
    >
      <h3>{props.player}</h3>
      <div className="progress" style={{ width: "100%" }}>
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow={props.timeLeft}
          aria-valuemin="0"
          aria-valuemax="100"
          style={{ width: props.timeLeft + "%" }}
        />
      </div>
    </div>
  );
}

Player.propTypes = {
  player: PropTypes.number.isRequired,
  timeLeft: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    timeLeft: state.timeLeft
  };
};

export default connect(mapStateToProps)(Player);
