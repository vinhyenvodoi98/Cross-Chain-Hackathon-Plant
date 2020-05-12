import React from "react";
import shelfImg from "../../images/shelf_side_rotate.png";
import testPlant from "../../images/bellpeppers1_background.png";
import testPot from "../../images/pot_empty.png";
import "./Middle.css";

function Plant(props) {
  if (props.plant) {
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

class PlantArea extends React.Component {
  renderPlant(i) {
    return <Plant plant={this.props.plants[i]} />;
  }

  render() {
    return (
      <div className="plant-area">
        <div className="row" />
        <img className="shelf" src={shelfImg} alt="" />
        <div className="row">
          {this.renderPlant(8)}
          {this.renderPlant(9)}
          {this.renderPlant(10)}
          {this.renderPlant(11)}
        </div>
        <img className="shelf" src={shelfImg} alt="" />
        <div className="row">
          {this.renderPlant(4)}
          {this.renderPlant(5)}
          {this.renderPlant(6)}
          {this.renderPlant(7)}
        </div>
        <img className="shelf" src={shelfImg} alt="" />
        <div className="row">
          {this.renderPlant(0)}
          {this.renderPlant(1)}
          {this.renderPlant(2)}
          {this.renderPlant(3)}
        </div>
        <img className="shelf" src={shelfImg} alt="" />
      </div>
    );
  }
}

class Middle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      plants: Array(12).fill(null),
    };
    this.handleAddPlant = this.handleAddPlant.bind(this);
  }

  handleAddPlant(id) {
    var plants = this.state.plants;
    plants[id - 1] = 1;
    this.setState({
      plants: plants,
    });
  }

  render() {
    return (
      <div>
        <PlantArea plants={this.state.plants} />
        <button onClick={(id) => this.handleAddPlant(id)}>
          {this.state.count}
        </button>
      </div>
    );
  }
}

export default Middle;
