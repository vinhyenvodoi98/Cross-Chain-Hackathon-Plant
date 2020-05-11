import React from "react";
import plantImg from "../../images/icn_plantlist.png";
import bstImg from "../../images/icn_boosters.png";
import { Modal } from "antd";
import PlantCollection from "../PlantCollection";
import Store from "../Store-Exchange";
import "./bottom.css";

class Bottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModalPlant: false,
      openModalStore: false,
    };
  }

  showModalPlant = () => {
    this.setState({
      openModalPlant: !this.state.openModalPlant,
    });
  };

  showModalStore = () => {
    this.setState({
      openModalStore: !this.state.openModalStore,
    });
  };

  handleClickPlant = () => {
    this.setState({
      openModalPlant: !this.state.openModalPlant,
    });
  };

  handleClickStore = () => {
    this.setState({
      openModalStore: !this.state.openModalStore,
    });
  };

  render() {
    return (
      <div>
        <div className="bot">
          <button className="plantLst bgc-w" onClick={this.showModalPlant}>
            <img src={plantImg} alt="icon" />
          </button>
          <button className="bstLst bgc-w" onClick={this.showModalStore}>
            <img src={bstImg} alt="icon" />
          </button>
        </div>
        <Modal
          title="Plant Collection"
          visible={this.state.openModalPlant}
          onOk={this.handleClickPlant}
          onCancel={this.handleClickPlant}
        >
          <PlantCollection />
        </Modal>

        <Modal
          title="Swap Plant"
          visible={this.state.openModalStore}
          onOk={this.handleClickStore}
          onCancel={this.handleClickStore}
        >
          <Store />
        </Modal>
      </div>
    );
  }
}

export default Bottom;
