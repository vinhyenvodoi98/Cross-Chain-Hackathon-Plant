import React from "react";
import shelfImg from "../../images/shelf_side_rotate.png";
import testPlant from "../../images/bellpeppers1_background.png";
import testPot from "../../images/pot_empty.png";
import "./Middle.css";
import { State } from "../../constant";

function Plant(props) {
  if (props.plant.state === State.PLANTED) {
    return (
      <div className="plant">
        <div className="stem">
          <img src={testPlant} alt="" className="plantImg" />
        </div>
        <div className="pot">
          <img src={testPot} alt="" className="potImg" />
        </div>
      </div>
    );
  } else {
    return <div className="plant" />;
  }
}

function PlantArea(props) {
  const renderPlant = (i) => {
    return <Plant plant={props.plants[i]} />;
  };

  return (
    <div className="plant-area">
      <div className="row" />
      <img className="shelf" src={shelfImg} alt="" />
      <div className="row">
        {renderPlant(8)}
        {renderPlant(9)}
        {renderPlant(10)}
        {renderPlant(11)}
      </div>
      <img className="shelf" src={shelfImg} alt="" />
      <div className="row">
        {renderPlant(4)}
        {renderPlant(5)}
        {renderPlant(6)}
        {renderPlant(7)}
      </div>
      <img className="shelf" src={shelfImg} alt="" />
      <div className="row">
        {renderPlant(0)}
        {renderPlant(1)}
        {renderPlant(2)}
        {renderPlant(3)}
      </div>
      <img className="shelf" src={shelfImg} alt="" />
    </div>
  );
}

function Middle(props) {
  return (
    <div>
      <PlantArea plants={props.plants} />
    </div>
  );
}

export default Middle;
