import React from "react";
import "./style.css";
import { Row, Button } from "antd";
import testPlant from "../../images/bellpeppers1_background.png";
import { State } from "../../constant";

function PlantCollection(props) {
  return (
    <div>
      <div className="collection">
        {props.plants.map((item) => {
          if (item.state === State.INSTOCK) {
            return (
              <Row className="bgc-w item">
                <div className="plantAva bgc-blue">
                  <img src={testPlant} className="plantImg" alt="" />
                </div>
                <div>
                  <strong>{item.name}</strong> <br />
                  <span>Level {item.level}</span> <br />
                  <span className="green">{item.oxy} oxygen/s</span>
                </div>
                <Button
                  type="primary"
                  className="bgc-green radius "
                  onClick={() => props.onAddPlant(item.id)}
                >
                  <strong>Plant</strong>
                </Button>
              </Row>
            );
          }
        })}
      </div>
    </div>
  );
}

export default PlantCollection;
