import React from "react";
import "./App.css";

import { Layout } from "antd";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Middle from "./components/Middle";

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="App bg">
        <Header className="bgc-w h-50px p-10px r-bot-10px">
          <Top />
        </Header>
        <Content className="opa p-10px">
          <Middle />
        </Content>
        <Footer className="h-50px p-10px m-10px r-top-10px">
          <Bottom />
        </Footer>
      </Layout>
    );
  }
}

export default App;
