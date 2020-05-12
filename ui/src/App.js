import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./store/actions";

import {
  activateWebSocket,
  deactivateWebSocket,
  doFetch,
} from "./utils/fetch-websocket";

import { Layout } from "antd";
import Top from "./components/Top";
import Bottom from "./components/Bottom";
import Middle from "./components/Middle";
import dappConstants from "./conf/installationConstants";

import "./App.css";

const { INSTANCE_REG_KEY } = dappConstants;

const { Header, Footer, Content } = Layout;

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { active } = state;

  useEffect(() => {
    function messageHandler(message) {
      if (!message) return;
      const { type, data } = message;
      if (type === "walletUpdatePurses") {
        dispatch(actions.updatePurses(JSON.parse(data)));
      } else if (type === "walletOfferDescriptions") {
        // TODO what is walletOfferDescriptions do ?
        console.log(data);
        // dispatch(updateOffers(data));
      }
    }

    function walletGetPurses() {
      return doFetch({ type: "walletGetPurses" }).then(messageHandler);
    }

    function walletGetOffers() {
      return doFetch({ type: "walletSubscribeOffers", status: null });
    }

    if (active) {
      activateWebSocket({
        onConnect() {
          dispatch(actions.serverConnected(true));
          walletGetPurses();
          walletGetOffers();
        },
        onDisconnect() {
          dispatch(actions.serverConnected(false));
          // dispatch(deactivateConnection());
          // dispatch(resetState());
        },
        onMessage(message) {
          messageHandler(JSON.parse(message));
        },
      });
      return deactivateWebSocket;
    } else {
      deactivateWebSocket();
    }
  }, [active, dispatch]);

  useEffect(() => {
    if (active) {
      activateWebSocket(
        {
          onConnect() {
            console.log("connected to API");
            // doFetch(
            //   {
            //     type: 'encouragement/subscribeNotifications',
            //     data: {
            //       instanceId: INSTANCE_REG_KEY,
            //     },
            //   },
            //   '/api',
            // ).then(({ data }) => console.log('subscribed response', data));
          },
          onDisconnect() {
            console.log("disconnected from API");
          },
          // onMessage(message) {
          //   apiMessageHandler(JSON.parse(message));
          // },
        },
        "/api"
      );
    } else {
      deactivateWebSocket("/api");
    }
  }, [
    active,
    // apiMessageHandler
  ]);

  const onAddPlant = (id) => {
    return id;
  };

  return (
    <div className="bgc-dark">
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
    </div>
  );
}

export default App;
