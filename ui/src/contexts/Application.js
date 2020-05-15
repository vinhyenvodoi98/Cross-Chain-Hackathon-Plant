import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from 'store/actions';

import { activateWebSocket, deactivateWebSocket, doFetch } from 'utils/fetch-websocket';

function Application() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { active } = state;

  useEffect(() => {
    function walletGetPurses() {
      return doFetch({ type: 'walletGetPurses' }).then(dispatch(actions.messageHandler));
    }

    function walletGetOffers() {
      return doFetch({ type: 'walletSubscribeOffers', status: null });
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
          dispatch(actions.messageHandler(JSON.parse(message)));
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
            console.log('connected to API');
            doFetch({
              type: 'encouragement/getEncouragement',
            });
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
            console.log('disconnected from API');
            dispatch(actions.serverConnected(false));
          },
          onMessage(message) {
            dispatch(actions.apiMessageHandler(JSON.parse(message)));
          },
        },
        '/api'
      );
    } else {
      deactivateWebSocket('/api');
    }
  }, [active, dispatch]);

  return <></>;
}

export default Application;
