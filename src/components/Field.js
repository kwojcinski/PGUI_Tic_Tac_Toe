import React from "react";
import PropTypes from "prop-types";
import "../styles.css";

function Field(props) {
  return (
    <div className="field" onClick={props.onClick}>
      {props.value}
    </div>
  );
}

Field.propTypes = {
  value: PropTypes.number,
  onClick: PropTypes.func
};

export default Field;
