import useRequest from './useRequest';

type PlayProps = {
  context?: string;
  tracks?: Array<string>;
  shuffle?: Boolean;
  offset?: {
    position: number;
  };
};

async function play({ context, tracks, shuffle, offset }: PlayProps) {
  await useRequest({
    endpoint: 'me/player',
  }).then((response) => {
    if (!response) {
      useRequest({
        endpoint: 'me/player/devices',
      })
        .then((response) => {
          if (response.devices.length) {
            const body = {
              device_ids: [response.devices[0].id],
            };

            useRequest({
              endpoint: 'me/player',
              method: 'put',
              body: JSON.stringify(body),
            });
          } else {
            alert('No devices found');
            return;
          }
        })
        .catch(() => {
          return;
        });
    }
  });

  if (shuffle !== undefined) {
    useRequest({
      endpoint: `me/player/shuffle?state=${shuffle}`,
      method: 'put',
    });
  }

  const body = {
    ...(context && { context_uri: context }),
    ...(tracks && { uris: tracks }),
    ...(offset && { offset: offset }),
  };

  useRequest({
    endpoint: 'me/player/play',
    method: 'put',
    body: JSON.stringify(body),
  });

  return;
}

export default play;
