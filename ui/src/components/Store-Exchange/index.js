import { Row, Col } from "antd";
import React from "react";
import "./style.css";
import testPlant from "../../images/bellpeppers1_background.png";
import oxyImg from "../../images/oxygen_bubble_big.png";
import { State } from "../../constant";

// const style = { background: "#0092ff", padding: "8px 0" };

const plant1 = {
  name: "Plant 1",
  level: 2,
  oxy: 56,
  price: 530,
};

const items = [];
for (var i = 0; i < 30; i++) {
  items.push(plant1);
}

function Item(props) {
  return (
    <Col className="gutter-row r-bot-10px r-top-10px " span={6}>
      <div className="bg-swapItem swapItem">
        <div className="bgc-w mg-15px r-bot-10px ">
          <div className="oxy-num unset-width flex-display p-left-5px">
            <img src={oxyImg} className="oxy-img" alt="oxy" />
            <strong className="number">100k</strong>
          </div>
        </div>
        <div className="divSwapImg center">
          <img src={testPlant} className=" swapItemImg " alt="" />
          <h2 className="priceSwapItem"> +3310 </h2>
        </div>
      </div>
    </Col>
  );
}

function Store(props) {
  return (
    <Row gutter={[20, 20]} className="overflow bgc-smoke">
      {items.map((item) => {
        if (item.state === State.INSTORE) {
          return <Item />;
        }
      })}
    </Row>
  );
}

export default Store;
