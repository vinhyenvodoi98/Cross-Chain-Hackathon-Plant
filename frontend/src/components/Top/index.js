import React from "react";
import oxyImg from "../../images/oxygen_bubble_big.png";

import "./top.css";

function Top() {
  return (
    <div className="oxy-area p-10px">
      <div className="oxy-num">
        <img src={oxyImg} className="oxy-img" alt="oxy" />
        <strong className="number">100k</strong>
      </div>
    </div>
  );
}

export default Top;
