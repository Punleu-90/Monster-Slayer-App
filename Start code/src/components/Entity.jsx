import React from "react";

function Entity({ healthPercentage }) {
  return (
    <div className="healthbar">
      <div
        className="healthbar__value"
        style={{ width: `${healthPercentage}%` }}
      ></div>
    </div>
  );
}

export default Entity;
