import React from "react";
import "./style.css";
import { Row, Button } from "antd";
import testPlant from "../../images/bellpeppers1_background.png";

const items = [
  {
    name: "Plant 1",
    level: 2,
    oxy: 56,
  },
  {
    name: "Plant 2",
    level: 3,
    oxy: 40,
  },
  {
    name: "Plant 3",
    level: 2,
    oxy: 30,
  },
  {
    name: "Plant 3",
    level: 2,
    oxy: 30,
  },
  {
    name: "Plant 3",
    level: 2,
    oxy: 30,
  },
  {
    name: "Plant 3",
    level: 2,
    oxy: 30,
  },
  {
    name: "Plant 3",
    level: 2,
    oxy: 30,
  },
];

function Collection(props) {
  return (
    <div>
      <div className="collection">
        {items.map((item) => {
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
              <Button type="primary" className="bgc-green radius ">
                <strong>Plant</strong>
              </Button>
            </Row>
          );
        })}
      </div>
    </div>
  );
}

export default Collection;
