import React from 'react';
import { List } from '@material-ui/core';

import apiRequest from '@/utils/request';
import ItemList from '@/pages/components/ItemList';
import ListHeading from '@/pages/components/ListHeading';

type TopTracksProps = {
  tracks: Array<object>;
};

const TopTracks = ({ tracks }: TopTracksProps) => {

  const playTopTracks = (item: object) => {
    const trackUris = tracks.map(track => track.uri);
    const body = {
      'uris': trackUris,
      'offset': {
        'uri': item.uri,
      },
    };

    apiRequest({
      endpoint: '/me/player/shuffle?state=false',
      method: 'put',
    });

    apiRequest({
      endpoint: `/me/player/play`,
      method: 'put',
      body: JSON.stringify(body),
    });
  };

  return (
    <>
      <ListHeading heading='Top Tracks' />
      <List>
        {tracks && (tracks.map((track: object, index: number) => (
          <ItemList item={track} imageUrl={track.album.images[0].url} number={index + 1} action={playTopTracks} />
        )))}
      </List>
    </>
  );
};

export default TopTracks;