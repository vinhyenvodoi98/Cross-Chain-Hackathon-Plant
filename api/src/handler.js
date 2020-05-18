// @ts-check
import harden from '@agoric/harden';
import { E } from '@agoric/eventual-send';

export default harden(({ publicAPI, http }, _inviteMaker) => {
  let notifier;

  // Here's how you could implement a notification-based
  // publish/subscribe.
  const subChannelHandles = new Set();

  const sendToSubscribers = obj => {
    E(http).send(obj, [...subChannelHandles.keys()])
      .catch(e => console.error('cannot send', e));
  };

  const fail = e => {
    const obj = {
      type: 'bonsai/encouragedError',
      data: (e && e.message) || e
    };
    sendToSubscribers(obj);
  };

  const doOneNotification = updateResponse => {
    // Publish to our subscribers.
    const obj = {
      type: 'bonsai/encouragedResponse',
      data: updateResponse.value,
    };
    sendToSubscribers(obj);

    // Wait until the next notification resolves.
    E(notifier)
      .getUpdateSince(updateResponse.updateHandle)
      .then(doOneNotification, fail);
  };

  return harden({
    getCommandHandler() {
      const handler = {
        onError(obj, _meta) {
          console.error('Have error', obj);
        },

        // The following is to manage the subscribers map.
        onOpen(_obj, { channelHandle }) {
          subChannelHandles.add(channelHandle);
        },
        onClose(_obj, { channelHandle }) {
          subChannelHandles.delete(channelHandle);
        },

        async onMessage(obj, { channelHandle }) {
          // These are messages we receive from either POST or WebSocket.
          switch (obj.type) {
            case 'bonsai/getAvalablePlant': {
              return harden({
                type: 'bonsai/getAvalablePlantResponse',
                data:  await E(publicAPI).getAvailablePlants(),
              });
            }

            default:
              return undefined;
          }
        },
      };
      return harden(handler);
    },
  });
});
