import React from "react";
import plantImg from "../../images/icn_plantlist.png";
import bstImg from "../../images/icn_boosters.png";
import { Modal } from "antd";
import PlantCollection from "../PlantCollection";
import "./bottom.css";

class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
    };
  }

  showModal = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  handleClickPlant = () => {
    this.setState({
      openModal: !this.state.openModal,
    });
  };

  handleClickStore = () => {};

  render() {
    return (
      <div>
        <div className="bot">
          <button className="plantLst bgc-w" onClick={this.showModal}>
            <img src={plantImg} alt="icon" />
          </button>
          <button className="bstLst bgc-w" onClick={this.handleClickStore}>
            <img src={bstImg} alt="icon" />
          </button>
        </div>
        <Modal
          title="Plant Collection"
          visible={this.state.openModal}
          onOk={this.handleClickPlant}
          onCancel={this.handleClickPlant}
        >
          <PlantCollection />
        </Modal>
      </div>
    );
  }
}

export default Bottom;
