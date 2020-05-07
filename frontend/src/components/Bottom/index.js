import React from "react";
import plantImg from "../../images/icn_plantlist.png";
import bstImg from "../../images/icn_boosters.png";

import "./bottom.css";

function Bottom() {
  return (
    <div className="bot">
      <i className="plantLst bgc-w ">
        <img src={plantImg} alt="icon" />
      </i>
      <i className="bstLst bgc-w">
        <img src={bstImg} alt="icon" />
      </i>
    </div>
  );
}

export default Bottom;
